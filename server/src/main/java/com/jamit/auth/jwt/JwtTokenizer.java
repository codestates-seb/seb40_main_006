package com.jamit.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 로그인 인증에 성공한 클라이언트에게 JWT 를 생성 및 발급하고 요청이 들어올 때 마다 전달된 JWT 를 검증하는 역할
 */
@Component
public class JwtTokenizer {

//    @Getter
//    @Value("${jwt.secret-key}")
//    private String secretKey;
//
//    @Getter
//    @Value("${jwt.access-token-expiration-minutes}")
//    private int accessTokenExpirationMinutes;
//
//    @Getter
//    @Value("${jwt.refresh-token-expiration-minutes}")
//    private int refreshTokenExpirationMinutes;

    @Getter
    private String secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Getter
    private int accessTokenExpirationMinutes = 60 * 60;

    @Getter
    private int refreshTokenExpirationMinutes = 60 * 60 * 24 * 30;

    /**
     * plain secretKey 를 BASE64로 인코딩
     */
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * JWT 최초 발급 메서드
     */
    public String generateAccessToken(Map<String, Object> claims, String subject, Date expiration,
        String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(Calendar.getInstance().getTime())
            .setExpiration(expiration)
            .signWith(key)
            .compact();
    }

    /**
     * Refresh Token 생성 메서드
     */
    public String generateRefreshToken(String subject, Date expiration,
        String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
            .setSubject(subject)
            .setIssuedAt(Calendar.getInstance().getTime())
            .setExpiration(expiration)
            .signWith(key)
            .compact();
    }

    /**
     * JWT 검증 후, Claims 를 반환하는 메서드
     */
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
            .setSigningKey(key) // 서명에 사용된 Secret Key 설정
            .build()
            .parseClaimsJws(jws); // JWT 를 파싱하여 Claims 를 얻음
        return claims;
    }

    /**
     * JWT 검증 메서드
     */
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(jws);
    }

    /**
     * JWT 생성 시 만료 일시를 지정하는 메서드
     */
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    /**
     * JWT 서명에 사용할 Secret Key 생성 메서드 Base64 로 인코딩 된 Secret Key 를 디코딩한 후, byte array 로 반환
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}
