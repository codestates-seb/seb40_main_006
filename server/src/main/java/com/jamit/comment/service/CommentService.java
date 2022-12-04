package com.jamit.comment.service;

import com.jamit.comment.entity.Comment;
import com.jamit.comment.repository.CommentRepository;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public void createComment(Comment comment) {

        commentRepository.save(comment);
    }

    public void updateComment(Comment comment) {
        Comment verifiedComment = findVerifiedComment(comment.getId());
        verifiedComment.updateContent(comment.getContent());

        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> getComment = commentRepository.findById(commentId);

        return getComment.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public Comment updateVerifiedComment(Comment comment) {

        return commentRepository.save(comment);
    }

    public void deleteVerifiedComment(Comment comment) {

        commentRepository.delete(comment);
    }
}
