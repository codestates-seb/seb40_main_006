package com.jamit.oauth2.service;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.entity.Role;
import com.jamit.member.repository.MemberRepository;
import com.jamit.member.service.MemberService;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * OAuth2 로그인 성공 후 사용자 정보를 기반으로 가입 및 정보 수정, 세션 저장 등의 기능
 */
@RequiredArgsConstructor
@Service
public class Oauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private MemberRepository memberRepository;
    private MemberService memberService;
    private PasswordEncoder passwordEncoder;

    @SneakyThrows // 예외 처리 생략
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

//        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId(); //google
        String providerId = oAuth2User.getAttribute("sub"); // PK
        String email = oAuth2User.getAttribute("email"); // email
        String username = provider+"_"+providerId;
//        String uuid = UUID.randomUUID().toString().substring(0, 6);
        String password = "1234567890";
        Role roles = Role.USER;

//        Optional<Member> optionalMember = memberRepository.findByEmail(username);
//        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(
//            ExceptionCode.MEMBER_NOT_FOUND));

        if (memberService.findVerifiedMemberByEmail(email) == null) {
            Member member = new Member();
            member.setProvider(provider);
            member.setProviderId(providerId);
            member.setEmail(email);
            member.setNickname(username);
            member.setPassword(password);
            member.setRoles(roles);

//                Member createMember = Member.oauth2Register()
//                    .nickname(username).password(password)
//                    .email(email).role(roles)
//                    .provider(provider).providerId(providerId)
//                    .build();
                memberRepository.save(member);
        }

        Member member = memberService.findVerifiedMemberByEmail(email);

        return new MemberDetails(member, oAuth2User.getAttributes());
    }
}