package com.chibbol.wtz.global.stomp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class DataDTO {
    String type;
    Long roomSeq;
    Object data;

    @Builder
    public DataDTO(String type, Long roomSeq, Object data){
        this.type = type;
        this.roomSeq = roomSeq;
        this.data = data;
    }

}