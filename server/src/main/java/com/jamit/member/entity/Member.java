package com.jamit.member.entity;

import com.jamit.comment.entity.Comment;
import com.jamit.global.audit.Auditable;

import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.reply.entity.Reply;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Email
    @Column(unique = true, updatable = false, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Column
    private String profileImage;

    @Column
    private int grade;

    @Column
    private String refreshToken;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Role roles;

    @OneToMany(mappedBy = "member")
    private List<Jam> jamList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<JamParticipant> jamParticipantList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Reply> replyList = new ArrayList<>();

    public enum Role {
        USER("ROLE_USER"),
        ADMIN("ROLE_ADMIN");

        @Getter
        private String status;

        Role(String status) {
            this.status = status;
        }
    }

    public void addJam(Jam jam) {
        jamList.add(jam);
    }

    public void addComment(Comment comment) {
        commentList.add(comment);
    }

    public void addReply(Reply reply) {
        replyList.add(reply);
    }
}