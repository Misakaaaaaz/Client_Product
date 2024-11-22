package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerDetail;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerStringRequest;

import java.util.List;
import java.util.Map;

public interface SurveyAnswerService {
    void saveSurveyAnswer(SurveyAnswerRequest surveyAnswerRequest);

    SurveyAnswerRequest getSurveyAnswersByUserAndSurvey(Integer userId, Integer surveyId);

    void saveSurveyAnswerText(SurveyAnswerStringRequest surveyAnswerStringRequest);

    SurveyAnswerStringRequest getSurveyAnswerDetails(Integer studentId, Integer surveyId);
}
