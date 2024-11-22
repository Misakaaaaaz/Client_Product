package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HelpButton {
    private Integer helpId;
    private Integer studentId;
    private String studentPhone;
    private String studentEmail;
    private LocalDate applicationDate;

}
