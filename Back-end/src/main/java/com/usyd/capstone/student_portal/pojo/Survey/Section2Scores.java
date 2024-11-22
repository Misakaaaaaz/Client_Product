package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section2Scores {
    private Integer studentId;
    private Integer A;
    private Integer S;
    private Integer I;
    private Integer C;
    private Integer E;
    private Integer R;
    private Integer maxScore;
}
