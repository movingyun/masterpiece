package com.ssafy.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.backend.dto.UserUpdateDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @Column(name = "walletAddress", length = 100, unique = true)
    private String walletAddress;

    @Column(name = "userNickname" )
    private String userNickname;

    @Column(name = "message" )
    private String message;

    @ApiModelProperty(value = "생성일시")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "joinDate", nullable = false, updatable=false, insertable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date joinDate;

    @Column(name = "profileImg")
    private String profileImg;

    @Column(name = "ticketCount", columnDefinition = "INT(11) DEFAULT 10")
    private Integer ticketCount;

    public void updateUser(UserUpdateDto dto){
        this.userNickname = dto.getNickname();
        this.message = dto.getMessage();
    }
}
