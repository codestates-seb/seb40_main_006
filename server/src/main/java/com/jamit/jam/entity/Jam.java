package com.jamit.jam.entity;

import static javax.persistence.FetchType.LAZY;

import com.jamit.jam.status.CompleteStatus;
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
import org.locationtech.jts.geom.Point;

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

	private String image;

	private LocalDateTime jamFrom;

	private LocalDateTime jamTo;

	private Integer currentPpl = 1;

	@Column(nullable = false)
	private Integer capacity;

	@Column(nullable = false)
	private Boolean realTime;

	private int views = 0;

	@Column(nullable = false)
	private String address;

	@Column(nullable = false)
	private String location;

	@Column(length = 1000)
	private Point point;

	@Column(nullable = false)
	private String latitude;

	@Column(nullable = false)
	private String longitude;

	@Column
	private String openChatLink;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CompleteStatus completeStatus = CompleteStatus.FALSE;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "jam", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private final List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "jam", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private final List<Reply> replyList = new ArrayList<>();

	@OneToMany(mappedBy = "jam", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private final List<JamParticipant> participantList = new ArrayList<>();

	public void setMember(Member member) {
		this.member = member;
	}

	public void addComment(Comment comment) {
		commentList.add(comment);
	}

	public void addReply(Reply reply) {
		replyList.add(reply);
	}

	public void addCurrentPpl(int change) {
		this.currentPpl += change;
	}

	public void addParticipant(JamParticipant participant) {
		this.participantList.add(participant);
	}
}