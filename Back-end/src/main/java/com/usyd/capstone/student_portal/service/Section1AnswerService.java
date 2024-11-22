package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section1Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;

import java.util.List;

public interface Section1AnswerService {
    void saveSection1Answer(List<Section1Answer> section1Answers, SurveyAnswerInfo surveyAnswerInfo);
}
