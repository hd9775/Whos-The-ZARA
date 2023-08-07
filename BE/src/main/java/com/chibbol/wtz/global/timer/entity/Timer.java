package com.chibbol.wtz.global.timer.entity;

import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Timer {
    private int remainingTime;
    private int turn;
    private String timerType;
    private LocalDateTime startAt;
    private Set<Long> timerEndUserSeqs;

    @Builder
    public Timer(int remainingTime, int turn, String timerType) {
        this.remainingTime = remainingTime;
        this.turn = turn;
        this.timerType = timerType;
        this.startAt = LocalDateTime.now();
        this.timerEndUserSeqs = new HashSet<>();
    }

    public Timer update(Timer timer) {
        if(timer.remainingTime != 0)
            this.remainingTime = timer.remainingTime;
        if(timer.turn != 0)
            this.turn = timer.turn;
        if(timer.timerType != null)
            this.timerType = timer.timerType;
        if(timer.startAt != null)
            this.startAt = timer.startAt;
        if(timer.timerEndUserSeqs != null)
            this.timerEndUserSeqs = timer.timerEndUserSeqs;
        return this;
    }
}
