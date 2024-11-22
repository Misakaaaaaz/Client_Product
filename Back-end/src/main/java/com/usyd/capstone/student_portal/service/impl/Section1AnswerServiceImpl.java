package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section1AnswerMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section1Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section1AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class Section1AnswerServiceImpl implements Section1AnswerService {
    @Autowired
    private Section1AnswerMapper section1AnswerMapper;

    @Autowired
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;

    @Override
    @Transactional
    public void saveSection1Answer(List<Section1Answer> section1Answers, SurveyAnswerInfo surveyAnswerInfo) {
// 设置创建时间和初始完成进度
        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());
//        surveyAnswerInfo.setCurrentSection(0); // 初始化值

        // 1. 插入 survey_answer_info 表，并获取生成的 answerId
        surveyAnswerInfoMapper.insertSurveyAnswerInfo(surveyAnswerInfo);
        Integer answerId = surveyAnswerInfo.getAnswerId(); // 获取新生成的 answerId

        // 2. 遍历插入 section1_answer 表，设置获取到的 answerId
        for (Section1Answer section1Answer : section1Answers) {
            section1Answer.setCreatedAt(LocalDateTime.now());
            section1Answer.setAnswerId(answerId); // 设置关联的 answerId
            section1AnswerMapper.insertSection1Answer(section1Answer);
        }

        // 3. 更新 survey_answer_info 的 completed_section 字段为 1，表示 section1 完成
//        surveyAnswerInfoMapper.updateCompletedSection(answerId, 1);
    }
}
