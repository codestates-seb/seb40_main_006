package com.jamit.comment.controller;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.comment.dto.CommentPatchDto;
import com.jamit.comment.dto.CommentPostDto;
import com.jamit.comment.entity.Comment;
import com.jamit.comment.service.CommentService;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.jam.service.JamService;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
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
@RequestMapping("/jams/{jam_id}/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final JamService jamService;
    private final MemberService memberService;

    /**
     * COMMENT-01: Comment 작성
     * Authorized: USER
     */
    @PostMapping
    public ResponseEntity postComment(@Positive @PathVariable("jam_id") Long jamId,
        @Valid @RequestBody CommentPostDto commentPostDto, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        } else {
            Comment comment = buildComment(
                jamId,
                member.getEmail(),
                commentPostDto.getContent()
            );
            commentService.createComment(comment);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
    }

    /**
     * COMMENT-02: Comment 수정
     * Authorized: USER(Writer)
     */
    @PatchMapping("/{comment_id}")
    public ResponseEntity patchComment(@Positive @PathVariable("comment_id") Long commentId,
        @Valid @RequestBody CommentPatchDto commentPatchDto, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();
        Comment comment = commentService.findVerifiedComment(commentId);

        if (member.getEmail().equals(comment.getMember().getEmail())) {
            comment.updateContent(commentPatchDto.getContent());
            commentService.updateComment(comment);

            return ResponseEntity.ok().build();
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }

    }

    /**
     * COMMENT-03: Comment 삭제
     * Authorized: USER(Writer)
     */
    @DeleteMapping("/{comment_id}")
    public ResponseEntity deleteComment(@Positive @PathVariable("comment_id") Long commentId,
        Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();
        Comment comment = commentService.findVerifiedComment(commentId);

        if (member.getEmail().equals(comment.getMember().getEmail())) {
            commentService.deleteVerifiedComment(comment);

            return ResponseEntity.ok().build();
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    private Comment buildComment(Long jamId, String email, String content) {
        Comment comment = Comment.builder()
            .content(content)
            .build();

        comment.setJam(jamService.findJam(jamId));
        comment.setMember(memberService.findVerifiedMemberByEmail(email));

        return comment;
    }
}
