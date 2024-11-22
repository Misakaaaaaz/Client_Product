package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section4AnswerMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section4AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class Section4AnswerServiceImpl implements Section4AnswerService {
    @Autowired
    private Section4AnswerMapper section4AnswerMapper;

    @Autowired
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;

    @Override
    public void saveSection4Answer(List<Section4Answer> section4Answers, SurveyAnswerInfo surveyAnswerInfo) {
        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());

        Integer answerId = surveyAnswerInfoMapper.findAnswerIdByStudentAndSurvey(
                surveyAnswerInfo.getStudentId(), surveyAnswerInfo.getSurveyId());

        if (answerId == null) {
            throw new IllegalArgumentException("No survey_answer_info found for the given studentId and surveyId");
        }

        for (Section4Answer section4Answer : section4Answers) {
            section4Answer.setCreatedAt(LocalDateTime.now());
            section4Answer.setAnswerId(answerId);
            section4AnswerMapper.insertSection4Answer(section4Answer);
        }

//        surveyAnswerInfoMapper.updateCompletedSection(answerId, 4); // section2 完成

    }
}
