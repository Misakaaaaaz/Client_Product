package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section3AnswerMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section3AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class Section3AnswerServiceImpl implements Section3AnswerService {

    @Autowired
    private Section3AnswerMapper section3AnswerMapper;

    @Autowired
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;
    @Override
    public void saveSection3Answer(List<Section3Answer> section3Answers, SurveyAnswerInfo surveyAnswerInfo) {
        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());

        Integer answerId = surveyAnswerInfoMapper.findAnswerIdByStudentAndSurvey(
                surveyAnswerInfo.getStudentId(), surveyAnswerInfo.getSurveyId());

        if (answerId == null) {
            throw new IllegalArgumentException("No survey_answer_info found for the given studentId and surveyId");
        }

        for (Section3Answer section3Answer : section3Answers) {
            section3Answer.setCreatedAt(LocalDateTime.now());
            section3Answer.setAnswerId(answerId);
            section3AnswerMapper.insertSection3Answer(section3Answer);
        }

//        surveyAnswerInfoMapper.updateCompletedSection(answerId, 3); // section2 完成
    }
}
