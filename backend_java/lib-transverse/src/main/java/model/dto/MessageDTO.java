package model.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class MessageDTO {
    private Long id;
    private Date date;
    private Integer userId;
    private String room;
    private String message;
}
