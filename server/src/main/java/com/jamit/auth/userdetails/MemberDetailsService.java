package com.jamit.auth.userdetails;

import com.jamit.auth.utils.CustomAuthorityUtils;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import java.util.Collection;
import java.util.Optional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
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

    private final CustomAuthorityUtils authorityUtils;
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

//    public class MemberDetails extends Member implements UserDetails {
//
//        MemberDetails(Member member) {
//            setMemberId(member.getMemberId());
//            setEmail(member.getEmail());
//            setPassword(member.getPassword());
//            setRoles(member.getRoles());
//        }
//
//        @Override
//        public Collection<? extends GrantedAuthority> getAuthorities() {
//            return authorityUtils.createAuthorities(this.getRoles());
//        }
//
//        @Override
//        public String getUsername() {
//            return getEmail();
//        }
//
//        @Override
//        public boolean isAccountNonExpired() {
//            return true;
//        }
//
//        @Override
//        public boolean isAccountNonLocked() {
//            return true;
//        }
//
//        @Override
//        public boolean isCredentialsNonExpired() {
//            return true;
//        }
//
//        @Override
//        public boolean isEnabled() {
//            return true;
//        }
//    }
}
