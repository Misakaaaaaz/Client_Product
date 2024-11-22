package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section1Scores {
    private Integer studentId;
    private Integer H;
    private Integer P;
    private Integer A;
    private Integer L;
    private Integer F;
    private Integer S;
    private Integer maxScore;
}
