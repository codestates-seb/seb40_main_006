package com.jamit.jam.mapper;

import com.jamit.comment.dto.ResponseCommentDto;
import com.jamit.comment.entity.Comment;
import com.jamit.comment.mapper.CommentMapper;
import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.ResponseAllJamsDto;
import com.jamit.jam.dto.ResponseParticipantDto;
import com.jamit.jam.dto.ResponseSpecificJamDto;
import com.jamit.jam.entity.Category;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.jam.status.CompleteStatus;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-01T20:36:15+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class JamMapperImpl implements JamMapper {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public Jam jamPostDtoToJam(JamPostDto jamPostDto) {
        if ( jamPostDto == null ) {
            return null;
        }

        Jam jam = new Jam();

        jam.setCategory( jamPostDto.getCategory() );
        jam.setTitle( jamPostDto.getTitle() );
        jam.setContent( jamPostDto.getContent() );
        jam.setImage( jamPostDto.getImage() );
        jam.setJamFrom( jamPostDto.getJamFrom() );
        jam.setJamTo( jamPostDto.getJamTo() );
        jam.setCapacity( jamPostDto.getCapacity() );
        jam.setRealTime( jamPostDto.isRealTime() );
        jam.setAddress( jamPostDto.getAddress() );
        jam.setLocation( jamPostDto.getLocation() );
        jam.setLatitude( jamPostDto.getLatitude() );
        jam.setLongitude( jamPostDto.getLongitude() );
        jam.setOpenChatLink( jamPostDto.getOpenChatLink() );

        return jam;
    }

    @Override
    public Jam jamPatchDtoToJam(JamPatchDto jamPatchDto) {
        if ( jamPatchDto == null ) {
            return null;
        }

        Jam jam = new Jam();

        jam.setId( jamPatchDto.getId() );
        jam.setCategory( jamPatchDto.getCategory() );
        jam.setTitle( jamPatchDto.getTitle() );
        jam.setContent( jamPatchDto.getContent() );
        jam.setImage( jamPatchDto.getImage() );
        jam.setJamFrom( jamPatchDto.getJamFrom() );
        jam.setJamTo( jamPatchDto.getJamTo() );
        jam.setCapacity( jamPatchDto.getCapacity() );
        jam.setRealTime( jamPatchDto.isRealTime() );
        jam.setAddress( jamPatchDto.getAddress() );
        jam.setLocation( jamPatchDto.getLocation() );
        jam.setLatitude( jamPatchDto.getLatitude() );
        jam.setLongitude( jamPatchDto.getLongitude() );
        jam.setOpenChatLink( jamPatchDto.getOpenChatLink() );
        jam.setCompleteStatus( jamPatchDto.getCompleteStatus() );

        return jam;
    }

    @Override
    public ResponseAllJamsDto jamToResponseAllJamsDto(Jam jam) {
        if ( jam == null ) {
            return null;
        }

        Long jamId = null;
        String nickname = null;
        String title = null;
        LocalDateTime jamFrom = null;
        LocalDateTime jamTo = null;
        Category category = null;
        int currentPpl = 0;
        int capacity = 0;
        boolean realTime = false;
        CompleteStatus completeStatus = null;
        String address = null;
        String location = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        jamId = jam.getId();
        nickname = jamMemberNickname( jam );
        title = jam.getTitle();
        jamFrom = jam.getJamFrom();
        jamTo = jam.getJamTo();
        category = jam.getCategory();
        if ( jam.getCurrentPpl() != null ) {
            currentPpl = jam.getCurrentPpl();
        }
        if ( jam.getCapacity() != null ) {
            capacity = jam.getCapacity();
        }
        if ( jam.getRealTime() != null ) {
            realTime = jam.getRealTime();
        }
        completeStatus = jam.getCompleteStatus();
        address = jam.getAddress();
        location = jam.getLocation();
        createdAt = jam.getCreatedAt();
        modifiedAt = jam.getModifiedAt();

        ResponseAllJamsDto responseAllJamsDto = new ResponseAllJamsDto( jamId, nickname, title, jamFrom, jamTo, category, currentPpl, capacity, realTime, completeStatus, address, location, createdAt, modifiedAt );

        responseAllJamsDto.setMember( jam.getMember() );

        return responseAllJamsDto;
    }

    @Override
    public ResponseAllJamsDto jamToResponseCategoryJamsDto(Jam jam) {
        if ( jam == null ) {
            return null;
        }

        Long jamId = null;
        String nickname = null;
        String title = null;
        LocalDateTime jamFrom = null;
        LocalDateTime jamTo = null;
        Category category = null;
        int currentPpl = 0;
        int capacity = 0;
        boolean realTime = false;
        CompleteStatus completeStatus = null;
        String address = null;
        String location = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        jamId = jam.getId();
        nickname = jamMemberNickname( jam );
        title = jam.getTitle();
        jamFrom = jam.getJamFrom();
        jamTo = jam.getJamTo();
        category = jam.getCategory();
        if ( jam.getCurrentPpl() != null ) {
            currentPpl = jam.getCurrentPpl();
        }
        if ( jam.getCapacity() != null ) {
            capacity = jam.getCapacity();
        }
        if ( jam.getRealTime() != null ) {
            realTime = jam.getRealTime();
        }
        completeStatus = jam.getCompleteStatus();
        address = jam.getAddress();
        location = jam.getLocation();
        createdAt = jam.getCreatedAt();
        modifiedAt = jam.getModifiedAt();

        ResponseAllJamsDto responseAllJamsDto = new ResponseAllJamsDto( jamId, nickname, title, jamFrom, jamTo, category, currentPpl, capacity, realTime, completeStatus, address, location, createdAt, modifiedAt );

        responseAllJamsDto.setMember( jam.getMember() );

        return responseAllJamsDto;
    }

    @Override
    public ResponseSpecificJamDto jamToResponseSpecificJamDto(Jam jam) {
        if ( jam == null ) {
            return null;
        }

        Long jamId = null;
        String nickname = null;
        List<ResponseParticipantDto> participantList = null;
        List<ResponseCommentDto> commentList = null;
        Category category = null;
        String title = null;
        String content = null;
        String image = null;
        LocalDateTime jamFrom = null;
        LocalDateTime jamTo = null;
        int currentPpl = 0;
        int capacity = 0;
        boolean realTime = false;
        CompleteStatus completeStatus = null;
        int views = 0;
        String address = null;
        String location = null;
        String latitude = null;
        String longitude = null;
        String openChatLink = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        jamId = jam.getId();
        nickname = jamMemberNickname( jam );
        participantList = jamParticipantListToResponseParticipantDtoList( jam.getParticipantList() );
        commentList = commentListToResponseCommentDtoList( jam.getCommentList() );
        category = jam.getCategory();
        title = jam.getTitle();
        content = jam.getContent();
        image = jam.getImage();
        jamFrom = jam.getJamFrom();
        jamTo = jam.getJamTo();
        if ( jam.getCurrentPpl() != null ) {
            currentPpl = jam.getCurrentPpl();
        }
        if ( jam.getCapacity() != null ) {
            capacity = jam.getCapacity();
        }
        if ( jam.getRealTime() != null ) {
            realTime = jam.getRealTime();
        }
        completeStatus = jam.getCompleteStatus();
        views = jam.getViews();
        address = jam.getAddress();
        location = jam.getLocation();
        latitude = jam.getLatitude();
        longitude = jam.getLongitude();
        openChatLink = jam.getOpenChatLink();
        createdAt = jam.getCreatedAt();
        modifiedAt = jam.getModifiedAt();

        ResponseSpecificJamDto responseSpecificJamDto = new ResponseSpecificJamDto( jamId, nickname, category, title, content, image, jamFrom, jamTo, currentPpl, capacity, realTime, completeStatus, views, address, location, latitude, longitude, openChatLink, participantList, commentList, createdAt, modifiedAt );

        responseSpecificJamDto.setMember( jam.getMember() );

        return responseSpecificJamDto;
    }

    @Override
    public ResponseParticipantDto participantToParticipantListDto(JamParticipant jamParticipant) {
        if ( jamParticipant == null ) {
            return null;
        }

        Long memberId = null;
        String nickname = null;
        String image = null;

        memberId = jamParticipantMemberMemberId( jamParticipant );
        nickname = jamParticipantMemberNickname( jamParticipant );
        image = jamParticipant.getImage();

        ResponseParticipantDto responseParticipantDto = new ResponseParticipantDto( memberId, nickname, image );

        return responseParticipantDto;
    }

    @Override
    public List<ResponseAllJamsDto> jamToResponseAllJamsDto(List<Jam> jams) {
        if ( jams == null ) {
            return null;
        }

        List<ResponseAllJamsDto> list = new ArrayList<ResponseAllJamsDto>( jams.size() );
        for ( Jam jam : jams ) {
            list.add( jamToResponseAllJamsDto( jam ) );
        }

        return list;
    }

    private String jamMemberNickname(Jam jam) {
        if ( jam == null ) {
            return null;
        }
        Member member = jam.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }

    protected List<ResponseParticipantDto> jamParticipantListToResponseParticipantDtoList(List<JamParticipant> list) {
        if ( list == null ) {
            return null;
        }

        List<ResponseParticipantDto> list1 = new ArrayList<ResponseParticipantDto>( list.size() );
        for ( JamParticipant jamParticipant : list ) {
            list1.add( participantToParticipantListDto( jamParticipant ) );
        }

        return list1;
    }

    protected List<ResponseCommentDto> commentListToResponseCommentDtoList(List<Comment> list) {
        if ( list == null ) {
            return null;
        }

        List<ResponseCommentDto> list1 = new ArrayList<ResponseCommentDto>( list.size() );
        for ( Comment comment : list ) {
            list1.add( commentMapper.commentToResponseCommentDto( comment ) );
        }

        return list1;
    }

    private Long jamParticipantMemberMemberId(JamParticipant jamParticipant) {
        if ( jamParticipant == null ) {
            return null;
        }
        Member member = jamParticipant.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }

    private String jamParticipantMemberNickname(JamParticipant jamParticipant) {
        if ( jamParticipant == null ) {
            return null;
        }
        Member member = jamParticipant.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }
}
