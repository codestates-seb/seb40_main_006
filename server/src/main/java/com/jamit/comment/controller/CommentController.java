package com.jamit.comment.controller;

import static com.jamit.global.utils.Check.checkAuthor;

import com.jamit.comment.dto.CommentPatchDto;
import com.jamit.comment.dto.CommentPostDto;
import com.jamit.comment.entity.Comment;
import com.jamit.comment.service.CommentService;
import com.jamit.jam.service.JamService;
import com.jamit.member.service.MemberService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
     * Authorized:
     */
    @PostMapping
    public ResponseEntity postComment(@Positive @PathVariable("jam_id") Long jamId,
        @Valid @RequestBody CommentPostDto commentPostDto, @AuthenticationPrincipal String email) {
        Comment comment = buildComment(
            jamId,
            email,
            commentPostDto.getContent()
        );

        commentService.createComment(comment);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * COMMENT-02: Comment 수정
     * Authorized:
     */
    @PatchMapping("/{comment_id}")
    public ResponseEntity patchComment(@Positive @PathVariable("comment_id") Long commentId,
        @Valid @RequestBody CommentPatchDto commentPatchDto,
        @AuthenticationPrincipal String email) {
        Comment comment = commentService.findVerifiedComment(commentId);

        checkAuthor(
            comment.getMember().getEmail(),
            email
        );

        comment.updateContent(commentPatchDto.getContent());

        commentService.updateComment(comment);

        return ResponseEntity.ok().build();
    }

    /**
     * COMMENT-03: Comment 삭제
     * Authorized:
     */
    @DeleteMapping("/{comment_id}")
    public ResponseEntity deleteComment(@Positive @PathVariable("comment_id") Long commentId,
        @AuthenticationPrincipal String email) {
        Comment comment = commentService.findVerifiedComment(commentId);

        checkAuthor(
            comment.getMember().getEmail(),
            email
        );

        commentService.deleteVerifiedComment(comment);

        return ResponseEntity.noContent().build();
    }

    private Comment buildComment(Long jamId, String email, String content) {
        Comment comment = Comment.builder()
            .content(content)
            .build();

        comment.setJam(jamService.findJam(jamId));
        comment.setMember(memberService.findVerifiedMemberEmail(email));

        return comment;
    }
}
