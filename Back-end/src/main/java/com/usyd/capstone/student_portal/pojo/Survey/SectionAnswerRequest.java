package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionAnswerRequest<T extends BaseSectionAnswer>{
    private List<T> sectionAnswers;
    private SurveyAnswerInfo surveyAnswerInfo;

}
