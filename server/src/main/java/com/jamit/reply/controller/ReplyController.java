package com.jamit.reply.controller;

import static com.jamit.global.utils.Check.checkAuthor;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.comment.service.CommentService;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
import com.jamit.reply.dto.ReplyPatchDto;
import com.jamit.reply.dto.ReplyPostDto;
import com.jamit.reply.entity.Reply;
import com.jamit.reply.mapper.ReplyMapper;
import com.jamit.reply.service.ReplyService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jams/{jam_id}/comments/{comment_id}/replies")
@RequiredArgsConstructor
@Validated
public class ReplyController {

    private final ReplyService replyService;
    private final CommentService commentService;
    private final MemberService memberService;

    /**
     * REPLY-01: Reply 작성
     * Authorized: USER
     */
    @PostMapping
    public ResponseEntity postReply(@Positive @PathVariable("comment_id") Long commentId,
        @Valid @RequestBody ReplyPostDto replyPostDto, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        } else {
            Reply reply = buildReply(
                commentId,
                member.getEmail(),
                replyPostDto.getContent()
            );
            replyService.createReply(reply);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * REPLY-02: Reply 수정
     * Authorized: USER(Writer)
     */
    @PatchMapping("/{reply_id}")
    public ResponseEntity patchReply(@Positive @PathVariable(name = "reply_id") Long replyId,
        @Valid @RequestBody ReplyPatchDto replyPatchDto, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        Reply reply = replyService.findVerifiedReply(replyId);

        if (member.getEmail().equals(reply.getMember().getEmail())) {
            reply.updateContent(replyPatchDto.getContent());
            replyService.updateReply(reply);

            return ResponseEntity.ok().build();
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    /**
     * REPLY-03: Reply 삭제
     * Authorized: USER(Writer)
     */
    @DeleteMapping("/{reply_id}")
    public ResponseEntity deleteReply(@Positive @PathVariable(name = "reply_id") Long replyId,
        Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        Reply reply = replyService.findVerifiedReply(replyId);

        if (member.getEmail().equals(reply.getMember().getEmail())) {
            replyService.deleteVerifiedReply(reply);

            return ResponseEntity.noContent().build();
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    private Reply buildReply(Long commentId, String email, String content) {
        Reply reply = Reply.builder()
            .content(content)
            .build();

        reply.setComment(commentService.findVerifiedComment(commentId));
        reply.setMember(memberService.findVerifiedMemberByEmail(email));

        return reply;
    }
}