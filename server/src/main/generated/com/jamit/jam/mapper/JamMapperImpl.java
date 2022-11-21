package com.jamit.jam.mapper;

import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.ResponseAllJamsDto;
import com.jamit.jam.dto.ResponseParticipantDto;
import com.jamit.jam.dto.ResponseSpecificJamDto;
import com.jamit.jam.entity.Category;
import com.jamit.jam.entity.Jam;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-21T14:19:05+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class JamMapperImpl implements JamMapper {

    @Override
    public Jam jamPostDtoToJam(JamPostDto jamPostDto) {
        if ( jamPostDto == null ) {
            return null;
        }

        Jam jam = new Jam();

        jam.setMember( jamPostDto.getMember() );
        jam.setCategory( jamPostDto.getCategory() );
        jam.setTitle( jamPostDto.getTitle() );
        jam.setContent( jamPostDto.getContent() );
        jam.setJamFrom( jamPostDto.getJamFrom() );
        jam.setJamTo( jamPostDto.getJamTo() );
        if ( jamPostDto.getMaximum() != null ) {
            jam.setMaximum( jamPostDto.getMaximum() );
        }
        jam.setRealTime( jamPostDto.isRealTime() );

        return jam;
    }

    @Override
    public Jam jamPatchDtoToJam(JamPatchDto jamPatchDto) {
        if ( jamPatchDto == null ) {
            return null;
        }

        Jam jam = new Jam();

        jam.setCategory( jamPatchDto.getCategory() );
        jam.setTitle( jamPatchDto.getTitle() );
        jam.setContent( jamPatchDto.getContent() );
        jam.setJamFrom( jamPatchDto.getJamFrom() );
        jam.setJamTo( jamPatchDto.getJamTo() );
        if ( jamPatchDto.getMaximum() != null ) {
            jam.setMaximum( jamPatchDto.getMaximum() );
        }
        jam.setRealTime( jamPatchDto.isRealTime() );

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
        boolean complete = false;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        jamId = jam.getId();
        nickname = jamMemberNickname( jam );
        title = jam.getTitle();
        jamFrom = jam.getJamFrom();
        jamTo = jam.getJamTo();
        category = jam.getCategory();
        currentPpl = jam.getCurrentPpl();
        capacity = jam.getCapacity();
        realTime = jam.isRealTime();
        complete = jam.isComplete();
        createdAt = jam.getCreatedAt();
        modifiedAt = jam.getModifiedAt();

        ResponseAllJamsDto responseAllJamsDto = new ResponseAllJamsDto( jamId, nickname, title, jamFrom, jamTo, category, currentPpl, capacity, realTime, complete, createdAt, modifiedAt );

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
        String title = null;
        String content = null;
        LocalDateTime jamFrom = null;
        LocalDateTime jamTo = null;
        Category category = null;
        int currentPpl = 0;
        int capacity = 0;
        boolean realTime = false;
        boolean complete = false;
        int views = 0;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        jamId = jam.getId();
        nickname = jamMemberNickname( jam );
        title = jam.getTitle();
        content = jam.getContent();
        jamFrom = jam.getJamFrom();
        jamTo = jam.getJamTo();
        category = jam.getCategory();
        currentPpl = jam.getCurrentPpl();
        capacity = jam.getCapacity();
        realTime = jam.isRealTime();
        complete = jam.isComplete();
        views = jam.getViews();
        createdAt = jam.getCreatedAt();
        modifiedAt = jam.getModifiedAt();

        List<ResponseParticipantDto> participantList = null;

        ResponseSpecificJamDto responseSpecificJamDto = new ResponseSpecificJamDto( jamId, nickname, title, content, jamFrom, jamTo, category, currentPpl, capacity, realTime, complete, views, participantList, createdAt, modifiedAt );

        responseSpecificJamDto.setMember( jam.getMember() );

        return responseSpecificJamDto;
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
}
