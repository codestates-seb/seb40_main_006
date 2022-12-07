package com.jamit.auth.Controller;

import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Map;

@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    @GetMapping("/refresh")
    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> claims = verifyJws(request);
        String username = (String) claims.get("username");
        Optional<Member> findMember = memberRepository.findByEmail(username);
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String accessToken = delegateAccessToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);

        return ResponseEntity.ok(accessToken);
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(
            jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
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
}