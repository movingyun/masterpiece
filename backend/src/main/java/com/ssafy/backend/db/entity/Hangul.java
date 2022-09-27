package com.ssafy.backend.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * 자/모음 테이블
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Hangul {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @ApiModelProperty(value = "초성 여부")
    @Column(name = "isFirst", columnDefinition = "boolean DEFAULT false")
    private boolean isFirst;

    @ApiModelProperty(value = "중성 여부")
    @Column(name = "isMiddle", columnDefinition = "boolean DEFAULT false")
    private boolean isMiddle;

    @ApiModelProperty(value = "종성 여부")
    @Column(name = "isLast", columnDefinition = "boolean DEFAULT false")
    private boolean isLast;

    @Column(name = "description" )
    private String description;

    @Column(name = "title" )
    private String title;

    @Column(name = "letter", length = 10)
    private String letter;
}
