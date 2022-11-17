package com.jamit.location.mapper;

import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface LocationMapper {

default List<JamResponseDto> jamsToJamResponseDto(List<Jam> jams){
    return jams.stream().map(jam -> JamResponseDto
                    .builder()
                    .id(jam.getId())
                    .title(jam.getTitle())
                    .userId(jam.getMember().getMemberId())
                    .nickname(jam.getMember().getNickname())
                    .content(jam.getContent())
                    .category(jam.getCategory().category)
                    .jamFrom(jam.getJamFrom())
                    .jamTo(jam.getJamTo())
                    .currentPpl(jam.getCurrentPpl())
                    .maximum(jam.getMaximum())
                    .capacity(jam.getCapacity())
                    .realTime(jam.isRealTime())
                    .complete(jam.isComplete())
                    .views(jam.getViews())
                    .latitude(jam.getPoint().getY())
                    .longitude(jam.getPoint().getX())
                    .build())
            .collect(Collectors.toList());
}

}
