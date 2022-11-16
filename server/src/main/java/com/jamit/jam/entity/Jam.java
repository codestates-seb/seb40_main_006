package com.jamit.jam.entity;

import static javax.persistence.FetchType.LAZY;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.jamit.comment.entity.Comment;
import com.jamit.global.audit.Auditable;
import com.jamit.member.entity.Member;
import com.jamit.reply.entity.Reply;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Jam extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jam_id")
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime jamFrom;

    @Column(nullable = false)
    private LocalDateTime jamTo;

    private int currentPpl = 1;

    @Column(nullable = false)
    private int maximum;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private boolean realTime;

    @Column(nullable = false)
    private boolean complete = false;

    private int views = 0;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "jam", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private final List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "jam", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private final List<Reply> replyList = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

    public void addComment(Comment comment) {
        commentList.add(comment);
    }

    public void addReply(Reply reply) {
        replyList.add(reply);
    }
}
