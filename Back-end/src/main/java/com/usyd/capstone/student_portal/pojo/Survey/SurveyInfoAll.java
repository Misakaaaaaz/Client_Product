package com.usyd.capstone.student_portal.pojo.Survey;

import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyInfoAll {
    private Integer surveyId;
    private String surveyName;
    private String surveyDescription;
    private LocalDateTime createdAt;
    private List<Section1to4Question> allSections;
}
