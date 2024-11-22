package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section1to4Info {
    private Integer sectionId;
    private Integer sectionNumOfSurvey;
    private String sectionName;
    private Integer surveyId;
    private List<Section1to4Question> questionsOfSingleSection;
}
