package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyAnswerStringRequest {
    private SurveyAnswerInfo surveyAnswerInfo;
    private List<SurveyAnswerStringDetail> answerStringDetails;
}
