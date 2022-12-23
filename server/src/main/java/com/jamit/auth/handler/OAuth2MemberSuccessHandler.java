package com.jamit.auth.handler;

import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.entity.Role;
import com.jamit.member.repository.MemberRepository;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String providerId = oAuth2User.getAttribute("sub"); // PK
        String nickname = email + "_" + providerId;
        String password = "temppassword" + providerId;

        // 이미 존재하는 회원이면 토큰만 발급
        if (memberRepository.existsByEmail(email)) {
            Optional<Member> optionalMember = memberRepository.findByEmail(email);
            Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(
                ExceptionCode.MEMBER_NOT_FOUND));

            String accessToken = delegateAccessToken(member); // Access Token 생성
            String refreshToken = delegateRefreshToken(member); // Refresh Token 생성
            member.setRefreshToken(refreshToken);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);

            redirect(request, response, accessToken, refreshToken);

        } else {
            Member member = new Member();
            member.setEmail(email);
            member.setNickname(nickname);
            member.setPassword(password);
            member.setRoles(Role.USER);

            memberRepository.save(member);

            String accessToken = delegateAccessToken(member); // Access Token 생성
            String refreshToken = delegateRefreshToken(member); // Refresh Token 생성
            member.setRefreshToken(refreshToken);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);

            redirect(request, response, accessToken, refreshToken);

        }

    }

    private void redirect(HttpServletRequest request, HttpServletResponse response,
        String accessToken, String refreshToken)
        throws IOException {

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

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

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", "Bearer" + accessToken);
        queryParams.add("Refresh", refreshToken);

        return UriComponentsBuilder
            .newInstance()
            .scheme("https")
            .host("api.jamit.click")
//                .port(80)
            .path("/receive-token.html")
            .queryParams(queryParams)
            .build()
            .toUri();
    }
}