package com.ssafy.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 게임로그 테이블
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Gamelog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @ManyToOne //객체관계 생성 -> 한명의 유저는 여러개의 게임 결과에 들어갈 수 있음.
    @JoinColumn(name="userId")
    private User user;

    @Column(name = "questionOption" )
    private String questionOption;

    @Column(name = "questionAnswer" )
    private String questionAnswer;

    @Column(name = "userSelect" )
    private String userSelect;

    @Column(name = "earnedTicket", columnDefinition = "INT(11)")
    private Integer earnedTicket;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date date;

}