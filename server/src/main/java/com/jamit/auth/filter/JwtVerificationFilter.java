package com.jamit.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import com.jamit.response.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JWT 검증을 위한 request 당 한번만 실행되는 Security Filter
 */
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public JwtVerificationFilter(
        JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    /**
     * JWT 를 검증하는 메서드
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse errorResponse = new ErrorResponse(403, "Signature unauthorized");
            new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        } catch (ExpiredJwtException ee) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse errorResponse = new ErrorResponse(401, "Expired JWT");
            new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse errorResponse = new ErrorResponse(400, "Bad request");
            new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        }

        filterChain.doFilter(request, response); // 서명 검증에 성공하면 다음 필터 호출
    }

    /**
     * Authorization header 값이 null 이거나 Bearer 로 시작하지 않는다면 다음 Filter 호출 즉, JWT 자격증명이 필요하지 않은 리소스에 대한
     * 요청이라고 판단
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    /**
     * request header 에서 JWT 를 얻는 메서드 Bearer 를 제거한 claims 리턴
     */
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(
            jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    /**
     * Authentication 객체를 SecurityContext 에 저장하는 메서드
     */
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");

        Member member = null;

        member = memberRepository.findByEmail(username).orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );

        MemberDetails memberDetails = new MemberDetails(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(memberDetails,
            memberDetails.getPassword(), memberDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
