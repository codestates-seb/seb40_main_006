package com.jamit.reply.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.reply.entity.Reply;
import com.jamit.reply.repository.ReplyRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReplyService {

    private final ReplyRepository replyRepository;

    public void createReply(Reply reply) {

        replyRepository.save(reply);
    }

    public void updateReply(Reply reply) {
        Reply verifiedReply = findVerifiedReply(reply.getId());
        verifiedReply.updateContent(reply.getContent());

        replyRepository.save(verifiedReply);
    }

    public void deleteReply(Long replyId) {
        Reply findReply = findVerifiedReply(replyId);

        replyRepository.delete(findReply);
    }

    public Reply findVerifiedReply(Long replyId) {
        Optional<Reply> getReply = replyRepository.findById(replyId);

        return getReply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }

    public Reply updateVerifiedReply(Reply reply) {

        return replyRepository.save(reply);
    }

    public void deleteVerifiedReply(Reply reply) {

        replyRepository.delete(reply);
    }
}