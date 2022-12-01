package com.jamit.comment.mapper;

import com.jamit.comment.dto.ResponseCommentDto;
import com.jamit.comment.entity.Comment;
import com.jamit.jam.entity.Jam;
import com.jamit.member.entity.Member;
import com.jamit.reply.dto.ResponseReplyDto;
import com.jamit.reply.entity.Reply;
import com.jamit.reply.mapper.ReplyMapper;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-01T17:54:05+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Autowired
    private ReplyMapper replyMapper;

    @Override
    public ResponseCommentDto commentToResponseCommentDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        Long commentId = null;
        Long memberId = null;
        Long jamId = null;
        String image = null;
        String nickname = null;
        List<ResponseReplyDto> replyList = null;
        String content = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        commentId = comment.getId();
        memberId = commentMemberMemberId( comment );
        jamId = commentJamId( comment );
        image = commentMemberProfileImage( comment );
        nickname = commentMemberNickname( comment );
        replyList = replyListToResponseReplyDtoList( comment.getReplyList() );
        content = comment.getContent();
        createdAt = comment.getCreatedAt();
        modifiedAt = comment.getModifiedAt();

        ResponseCommentDto responseCommentDto = new ResponseCommentDto( commentId, memberId, jamId, nickname, image, content, replyList, createdAt, modifiedAt );

        return responseCommentDto;
    }

    private Long commentMemberMemberId(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Member member = comment.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }

    private Long commentJamId(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Jam jam = comment.getJam();
        if ( jam == null ) {
            return null;
        }
        Long id = jam.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String commentMemberProfileImage(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Member member = comment.getMember();
        if ( member == null ) {
            return null;
        }
        String profileImage = member.getProfileImage();
        if ( profileImage == null ) {
            return null;
        }
        return profileImage;
    }

    private String commentMemberNickname(Comment comment) {
        if ( comment == null ) {
            return null;
        }
        Member member = comment.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }

    protected List<ResponseReplyDto> replyListToResponseReplyDtoList(List<Reply> list) {
        if ( list == null ) {
            return null;
        }

        List<ResponseReplyDto> list1 = new ArrayList<ResponseReplyDto>( list.size() );
        for ( Reply reply : list ) {
            list1.add( replyMapper.replyToResponseReplyDto( reply ) );
        }

        return list1;
    }
}
