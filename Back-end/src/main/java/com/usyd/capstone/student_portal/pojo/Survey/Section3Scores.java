package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section3Scores {
    private Integer studentId;
    private Integer E;
    private Integer I;
    private Integer S;
    private Integer N;
    private Integer T;
    private Integer F;
    private Integer J;
    private Integer P;
    private String type;
}
