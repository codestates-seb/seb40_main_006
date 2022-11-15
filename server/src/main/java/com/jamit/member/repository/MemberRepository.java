package com.jamit.member.repository;

import com.jamit.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(Long memberId);

    Optional<Member> findByEmailAndPassword(String email, String password);

    Optional<Member> findByNickName(String nickName);

    Optional<Member> findByEmail(String email);

}
