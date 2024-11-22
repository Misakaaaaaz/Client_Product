package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Question;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyInfo;

import java.util.List;

public interface Section1to4QuestionService {
    SurveyInfo listQuestionsOfSingleSection(Integer surveyId, Integer sectionId);

    List<Section1to4Question> listAll(Integer surveyId);
}
