//package com.jamit.auth.userdetails;
//
//import com.jamit.auth.utils.CustomAuthorityUtils;
//import com.jamit.member.entity.Member;
//import java.util.Collection;
//import java.util.List;
//import java.util.Map;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//
//@Getter
//@Setter
//public class MemberDetails extends User {
//
//    private final CustomAuthorityUtils authorityUtils;
//
//    private Member member;
//
//    private Map<String, Object> attributes;
//
//    public MemberDetails(Member member, Map<String, Object> attributes) {
//        this.member = member;
//        this.attributes = attributes;
//    }
//
//    @Override
//    public String getUsername() {
//        return member.getEmail();
//    }
//
//    @Override
//    public String getPassword() {
//        return member.getPassword();
//    }
//
//    @Override
//    public List<String> getRoles() {
//        return member.getRoles();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return CustomAuthorityUtils.createAuthorities(this.getRoles());
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
