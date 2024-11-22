package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section2AnswerMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section2AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class Section2AnswerServiceImpl implements Section2AnswerService {
    @Autowired
    private Section2AnswerMapper section2AnswerMapper;

    @Autowired
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;
    @Override
    @Transactional
    public void saveSection2Answer(List<Section2Answer> section2Answers, SurveyAnswerInfo surveyAnswerInfo) {
        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());

        Integer answerId = surveyAnswerInfoMapper.findAnswerIdByStudentAndSurvey(
                surveyAnswerInfo.getStudentId(), surveyAnswerInfo.getSurveyId());

        if (answerId == null) {
            throw new IllegalArgumentException("No survey_answer_info found for the given studentId and surveyId");
        }

        for (Section2Answer section2Answer : section2Answers) {
            section2Answer.setCreatedAt(LocalDateTime.now());
            section2Answer.setAnswerId(answerId);
            section2AnswerMapper.insertSection2Answer(section2Answer);
        }

//        surveyAnswerInfoMapper.updateCompletedSection(answerId, 2); // section2 完成
    }
}
