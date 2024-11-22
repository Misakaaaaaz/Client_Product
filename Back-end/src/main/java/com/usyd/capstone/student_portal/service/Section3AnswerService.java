package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section3Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;

import java.util.List;

public interface Section3AnswerService {
    void saveSection3Answer(List<Section3Answer> section3Answers, SurveyAnswerInfo surveyAnswerInfo);
}
