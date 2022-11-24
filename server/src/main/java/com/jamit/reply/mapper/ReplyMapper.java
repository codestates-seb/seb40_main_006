package com.jamit.reply.mapper;

import com.jamit.reply.dto.ReplyResponseDto;
import com.jamit.reply.dto.ResponseReplyDto;
import com.jamit.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReplyMapper {

    @Mapping(source = "id", target = "replyId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "comment.id", target = "commentId")
    @Mapping(source = "member.nickname", target = "nickname")
    @Mapping(source = "member.profileImage", target = "image")
    ResponseReplyDto replyToResponseReplyDto(Reply reply);

    ReplyResponseDto replyToReplyResponseDto(Reply reply);
}
