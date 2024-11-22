package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyAnswerStringDetail {
    private Integer answerStringDetailId;
    private Integer answerId;
    private Integer questionId;
    private List<String> answerText;
    private LocalDateTime createdAt;
    private String finalAnswerText;

}
