package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section2Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;

import java.util.List;

public interface Section2AnswerService {
    void saveSection2Answer(List<Section2Answer> section2Answers, SurveyAnswerInfo surveyAnswerInfo);
}
