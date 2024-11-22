package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyAnswerInfo {
    private Integer answerId;
    private Integer studentId;
    private Integer surveyId;
    private LocalDateTime createdAt;
    private Integer currentSection;
    private Integer currentNumOfQuestion;
    private List<Integer> totalSections;
    private Integer currentSectionTotalQuestions;

}
