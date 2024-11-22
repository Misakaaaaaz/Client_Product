package com.usyd.capstone.student_portal.pojo.Survey;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SurveyAnswerRequest {
    private SurveyAnswerInfo surveyAnswerInfo;
    private List<SurveyAnswerDetail> answerDetails;
}
