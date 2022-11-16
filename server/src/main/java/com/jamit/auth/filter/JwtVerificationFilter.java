package com.jamit.auth.filter;

import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JWT 검증을 위한 request 당 한번만 실행되는 Security Filter
 */
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    /**
     * JWT 를 검증하는 메서드
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) { //exception catch 되면 HttpServletRequest 의 Attribute 로 추가
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response); // 서명 검증에 성공하면 다음 필터 호출
    }

    /**
     * Authorization header 값이 null 이거나 Bearer 로 시작하지 않는다면 다음 Filter 호출
     * 즉, JWT 자격증명이 필요하지 않은 리소스에 대한 요청이라고 판단
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    /**
     * request header 에서 JWT 를 얻는 메서드
     * Bearer 를 제거한 claims 리턴
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
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(
            (List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
            authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
