package com.jamit.location.mapper;

import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-16T14:05:35+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class LocationMapperImpl implements LocationMapper {

    @Override
    public List<JamResponseDto> jamsToJamResponseDto(List<Jam> jams) {
        if ( jams == null ) {
            return null;
        }

        List<JamResponseDto> list = new ArrayList<JamResponseDto>( jams.size() );
        for ( Jam jam : jams ) {
            list.add( jamToJamResponseDto( jam ) );
        }

        return list;
    }

    protected JamResponseDto jamToJamResponseDto(Jam jam) {
        if ( jam == null ) {
            return null;
        }

        JamResponseDto jamResponseDto = new JamResponseDto();

        return jamResponseDto;
    }
}
