package com.jamit.comment.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.jamit.global.audit.Auditable;
import com.jamit.jam.entity.Jam;
import com.jamit.member.entity.Member;
import com.jamit.reply.entity.Reply;

@Entity
public class Comment extends Auditable {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@Column(nullable = false)
	private String content;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "jam_id")
	private Jam jam;

	@OneToMany(mappedBy = "comment", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private final List<Reply> replyList = new ArrayList<>();
}
