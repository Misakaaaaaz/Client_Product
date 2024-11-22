package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section4Scores {
    private Integer studentId;
    private Integer Q1;
    private Integer Q2;
    private Integer Q3;
    private Integer total;
}
