package com.jamit.auth.userdetails;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * 데이터베이스에서 사용자의 크리덴셜을 조회한 후, AuthenticationManager 에게 전달하는 역할
 */
@RequiredArgsConstructor
@Component
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    /**
     * request 로 들어온 이메일로 DB에 저장된 유저 찾기
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(
            ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

}
