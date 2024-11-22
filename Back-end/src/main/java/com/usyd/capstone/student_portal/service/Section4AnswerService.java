package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section4Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;

import java.util.List;

public interface Section4AnswerService {
    void saveSection4Answer(List<Section4Answer> section4Answers, SurveyAnswerInfo surveyAnswerInfo);
}
