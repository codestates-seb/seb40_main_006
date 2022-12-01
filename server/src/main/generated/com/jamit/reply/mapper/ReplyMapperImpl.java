package com.jamit.reply.mapper;

import com.jamit.comment.entity.Comment;
import com.jamit.member.entity.Member;
import com.jamit.reply.dto.ResponseReplyDto;
import com.jamit.reply.entity.Reply;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-01T20:36:15+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class ReplyMapperImpl implements ReplyMapper {

    @Override
    public ResponseReplyDto replyToResponseReplyDto(Reply reply) {
        if ( reply == null ) {
            return null;
        }

        Long replyId = null;
        Long memberId = null;
        Long commentId = null;
        String nickname = null;
        String image = null;
        String content = null;
        LocalDateTime modifiedAt = null;

        replyId = reply.getId();
        memberId = replyMemberMemberId( reply );
        commentId = replyCommentId( reply );
        nickname = replyMemberNickname( reply );
        image = replyMemberProfileImage( reply );
        content = reply.getContent();
        modifiedAt = reply.getModifiedAt();

        LocalDateTime createAt = null;

        ResponseReplyDto responseReplyDto = new ResponseReplyDto( replyId, memberId, commentId, nickname, image, content, createAt, modifiedAt );

        return responseReplyDto;
    }

    private Long replyMemberMemberId(Reply reply) {
        if ( reply == null ) {
            return null;
        }
        Member member = reply.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }

    private Long replyCommentId(Reply reply) {
        if ( reply == null ) {
            return null;
        }
        Comment comment = reply.getComment();
        if ( comment == null ) {
            return null;
        }
        Long id = comment.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String replyMemberNickname(Reply reply) {
        if ( reply == null ) {
            return null;
        }
        Member member = reply.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }

    private String replyMemberProfileImage(Reply reply) {
        if ( reply == null ) {
            return null;
        }
        Member member = reply.getMember();
        if ( member == null ) {
            return null;
        }
        String profileImage = member.getProfileImage();
        if ( profileImage == null ) {
            return null;
        }
        return profileImage;
    }
}
