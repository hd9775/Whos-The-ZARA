package com.chibbol.wtz.domain.chat.repository;

import com.chibbol.wtz.domain.chat.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<List<Room>> findAllByEndAtIsNullOrderByStartAt();

    Room findByCode(String code);

    Room findByRoomSeq(Long roomSeq);
}