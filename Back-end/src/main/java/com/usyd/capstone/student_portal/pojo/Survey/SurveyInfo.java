package com.usyd.capstone.student_portal.pojo.Survey;

import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Info;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyInfo {
    private Integer surveyId;
    private String surveyName;
    private String surveyDescription;
    private LocalDateTime createdAt;
//    embed single section of questions,
//    otherwise we need array
    private Section1to4Info singleSection;
}
