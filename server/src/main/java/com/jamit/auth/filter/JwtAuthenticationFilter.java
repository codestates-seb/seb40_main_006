package com.jamit.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jamit.auth.dto.LoginDto;
import com.jamit.auth.dto.LoginResponseDto;
import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.member.entity.Member;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * 클라이언트의 로그인 인증 정보를 수신하는 엔트리포인트
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // 로그인 인증 정보를 전달 받아 UserDetailsService 와 인터렉션 후 인증 여부 판단
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    /**
     * HttpServletRequest 에서 받은 로그인 정보를 인터셉트해서 AuthenticationManager 에게 넘겨준다.
     */
    @SneakyThrows // 예외 처리 생략
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper(); // 인증 정보를 DTO 클래스로 역직렬화하기 위한 인스턴스
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(),
            LoginDto.class); // request 를 LoginDto 로 역직렬화

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            loginDto.getUsername(),
            loginDto.getPassword()); // 인증 정보로 UsernamePasswordAuthenticationToken 생성

        return authenticationManager.authenticate(
            authenticationToken); // AuthenticationManager 에게 인증 처리 위임. authenticate() 가 실행되면 loadUserByUserName 메서드가 실행됨
    }

    /**
     * 클라이언트의 인증 정보가 인증에 성공할 경우 호출되어 토큰을 발급하는 메서드
     */
    protected void successfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain, Authentication authResult)
        throws ServletException, IOException {
        MemberDetails memberDetails = (MemberDetails) authResult.getPrincipal();
        Member member = memberDetails.getMember();

        String accessToken = delegateAccessToken(member); // Access Token 생성
        String refreshToken = delegateRefreshToken(member); // Refresh Token 생성

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        LoginResponseDto memberInfo = new LoginResponseDto();
        memberInfo.setMemberId(member.getMemberId());
        memberInfo.setNickname(member.getNickname());
        memberInfo.setProfileImage(member.getProfileImage());

        ObjectMapper objectMapper = new ObjectMapper(); // 인증 정보를 DTO 클래스로 역직렬화하기 위한 인스턴스
        String result = objectMapper.writeValueAsString(memberInfo);

        response.getWriter().write(result);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    /**
     * Access Token 생성 메서드
     */
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(
            jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(
            jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
            base64EncodedSecretKey);

        return accessToken;
    }

    /**
     * Refresh Token 생성 메서드
     */
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(
            jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(
            jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
            base64EncodedSecretKey);

        return refreshToken;
    }

}
