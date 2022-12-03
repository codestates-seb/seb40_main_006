package com.jamit.comment.mapper;

import com.jamit.comment.dto.ResponseCommentDto;
import com.jamit.comment.entity.Comment;
import com.jamit.reply.mapper.ReplyMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = ReplyMapper.class,
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    @Mapping(source = "id", target = "commentId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "jam.id", target = "jamId")
    @Mapping(source = "member.profileImage", target = "image")
    @Mapping(source = "member.nickname", target = "nickname")
    ResponseCommentDto commentToResponseCommentDto(Comment comment);
}