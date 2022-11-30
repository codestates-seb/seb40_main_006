package com.jamit.auth.userdetails;

import com.jamit.member.entity.Member;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Data
public class MemberDetails implements UserDetails, OAuth2User {

    private Member member;
    private Map<String, Object> attributes;

    // Local 로그인 사용
    public MemberDetails(Member member) {
        this.member = member;
    }

    // OAuth2 로그인 사용
    public MemberDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(
            new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return member.getRoles().getStatus();
                }
            }
        );
        return collection;
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    // OAuth2User 구현
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // OAuth2User 구현
    @Override
    public String getName() {
        String sub = attributes.get("sub").toString();
        return sub;
    }
}
