package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerDetailMapper;
import com.usyd.capstone.student_portal.pojo.Survey.*;
import com.usyd.capstone.student_portal.service.SurveyAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SurveyAnswerServiceImpl implements SurveyAnswerService {
    @Autowired
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;

    @Autowired
    private SurveyAnswerDetailMapper surveyAnswerDetailMapper;

    @Override
    public void saveSurveyAnswer(SurveyAnswerRequest surveyAnswerRequest) {
        // 1. 获取 SurveyAnswerInfo 对象
        SurveyAnswerInfo surveyAnswerInfo = surveyAnswerRequest.getSurveyAnswerInfo();

        // 2. 检查是否已有对应的 survey_answer_info 记录
        SurveyAnswerInfo existingInfo = surveyAnswerInfoMapper.findByStudentAndSurvey(
                surveyAnswerInfo.getStudentId(), surveyAnswerInfo.getSurveyId()
        );

        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());
        if (existingInfo != null) {
            // 有记录则更新
            surveyAnswerInfo.setAnswerId(existingInfo.getAnswerId()); // 使用现有的 answerId
            surveyAnswerInfoMapper.updateSurveyAnswerInfo(surveyAnswerInfo);
        } else {
            // 无记录则插入
            surveyAnswerInfoMapper.insertSurveyAnswerInfo(surveyAnswerInfo);
        }

        // 获取生成的 answerId
        Integer answerId = surveyAnswerInfo.getAnswerId();

        // 3. 遍历插入 survey_answer_detail 表
        List<SurveyAnswerDetail> answerDetails = surveyAnswerRequest.getAnswerDetails();
        for (SurveyAnswerDetail answerDetail : answerDetails) {
            answerDetail.setAnswerId(answerId); // 设置 answerId
            answerDetail.setCreatedAt(LocalDateTime.now());
            // 检查是否已存在相同的 answerId 和 questionId
            SurveyAnswerDetail existingDetail = surveyAnswerDetailMapper.findByAnswerAndQuestion(
                    answerDetail.getAnswerId(), answerDetail.getQuestionId()
            );

            if (existingDetail != null) {
                // 更新操作
                surveyAnswerDetailMapper.updateSurveyAnswerDetail(answerDetail);
            } else {
                // 插入操作
                surveyAnswerDetailMapper.insertSurveyAnswerDetail(answerDetail);
            }
        }
    }

    @Override
    public SurveyAnswerRequest getSurveyAnswersByUserAndSurvey(Integer studentId, Integer surveyId) {
        SurveyAnswerInfo answerInfo = surveyAnswerInfoMapper.findByStudentAndSurvey(studentId, surveyId);
        if (answerInfo == null) {
            throw new RuntimeException("No survey answers found for this student and survey.");
        }

        // 查询survey_answer_detail表
        List<SurveyAnswerDetail> answerDetails = surveyAnswerDetailMapper.findByAnswerId(answerInfo.getAnswerId());

        // 封装结果
        SurveyAnswerRequest response = new SurveyAnswerRequest();
        response.setSurveyAnswerInfo(answerInfo);
        response.setAnswerDetails(answerDetails);

        return response;
    }

    @Override
    public void saveSurveyAnswerText(SurveyAnswerStringRequest surveyAnswerStringRequest) {
        // 1. 获取 SurveyAnswerInfo 对象
        SurveyAnswerInfo surveyAnswerInfo = surveyAnswerStringRequest.getSurveyAnswerInfo();

        // 2. 检查是否已有对应的 survey_answer_info 记录
        SurveyAnswerInfo existingInfo = surveyAnswerInfoMapper.findByStudentAndSurvey(
                surveyAnswerInfo.getStudentId(), surveyAnswerInfo.getSurveyId()
        );

        surveyAnswerInfo.setCreatedAt(LocalDateTime.now());
        if (existingInfo != null) {
            // 有记录则更新
            surveyAnswerInfo.setAnswerId(existingInfo.getAnswerId()); // 使用现有的 answerId
            surveyAnswerInfoMapper.updateSurveyAnswerInfo(surveyAnswerInfo);
        } else {
            // 无记录则插入
            surveyAnswerInfoMapper.insertSurveyAnswerInfo(surveyAnswerInfo);
        }

        // 获取生成的 answerId
        Integer answerId = surveyAnswerInfo.getAnswerId();

        List<SurveyAnswerStringDetail> answerStringDetails = surveyAnswerStringRequest.getAnswerStringDetails();
        for (SurveyAnswerStringDetail answerStringDetail : answerStringDetails) {
            // 获取 question_id 对应的 question_type
            String questionType = surveyAnswerDetailMapper.findQuestionTypeById(answerStringDetail.getQuestionId());

            List<String> answerTextArray = answerStringDetail.getAnswerText();
            // Skip if answerText is null, empty, or contains only empty strings
            if (answerTextArray == null || answerTextArray.isEmpty() ||
                    answerTextArray.stream().allMatch(String::isBlank)) {
                continue; // Skip to the next iteration
            }

            String finalAnswerText = "";

            switch (questionType) {
                case "short_answer":
                    // 简答题，直接拼接成字符串
                    finalAnswerText = String.join(",", answerTextArray);
                    break;

                case "single_choice":
                case "ranking":
                    // 选择题和排序题，需要根据 option_text 找到对应的 option_id
                    List<String> optionIdList = new ArrayList<>();
                    for (String optionText : answerTextArray) {
                        Integer optionId = surveyAnswerDetailMapper.findOptionIdByTextAndQuestion(
                                optionText, answerStringDetail.getQuestionId(), surveyAnswerInfo.getSurveyId()
                        );
                        if (optionId != null) {
                            optionIdList.add(optionId.toString());
                        } else {
                            // 处理找不到 optionId 的情况
                            System.out.println("Option not found for: " + optionText);
                        }
                    }
                    finalAnswerText = String.join(",", optionIdList);
                    break;

                default:
                    throw new IllegalArgumentException("Unsupported question type: " + questionType);
            }

            // 创建新的 SurveyAnswerStringDetail 对象
            SurveyAnswerStringDetail newDetail = new SurveyAnswerStringDetail();
            newDetail.setAnswerId(answerId); // 设置 answerId
            newDetail.setQuestionId(answerStringDetail.getQuestionId()); // 设置 questionId
            newDetail.setFinalAnswerText(finalAnswerText); // 设置合并后的字符串
            newDetail.setCreatedAt(LocalDateTime.now());

            // 检查是否已存在相同的 answerId 和 questionId
            SurveyAnswerStringDetail existingDetail = surveyAnswerDetailMapper.findStringByAnswerAndQuestion(
                    newDetail.getAnswerId(), newDetail.getQuestionId()
            );

            if (existingDetail != null) {
                // 更新操作
                surveyAnswerDetailMapper.updateSurveyAnswerStringDetail(newDetail);
            } else {
                // 插入操作
                surveyAnswerDetailMapper.insertSurveyAnswerStringDetail(newDetail);
            }
        }
    }

    @Override
    public SurveyAnswerStringRequest getSurveyAnswerDetails(Integer studentId, Integer surveyId) {
        // 1. 查询SurveyAnswerInfo
        SurveyAnswerInfo surveyAnswerInfo = surveyAnswerInfoMapper.findSurveyAnswerInfo(studentId, surveyId);

        // 2. 查询SurveyAnswerStringDetail列表
        List<SurveyAnswerStringDetail> answerDetails = surveyAnswerDetailMapper.findSurveyAnswerDetails(studentId, surveyId);


        // 构建SurveyAnswerStringRequest对象
        SurveyAnswerStringRequest surveyAnswerStringRequest = new SurveyAnswerStringRequest();
        surveyAnswerStringRequest.setSurveyAnswerInfo(surveyAnswerInfo);
        surveyAnswerStringRequest.setAnswerStringDetails(answerDetails);

        List<Integer> totalSections = surveyAnswerInfoMapper.getAllSectionNums(surveyId);
        surveyAnswerInfo.setTotalSections(totalSections);
//        List<Integer> totalSection = surveyAnswerInfoMapper.getTotalSection(surveyId);
        int currentSectionTotalQuestions = surveyAnswerInfoMapper.getCurrentSectionTotalQuestions(surveyAnswerInfo.getCurrentSection());

//        surveyAnswerInfo.setTotalSection(totalSection);
        surveyAnswerInfo.setCurrentSectionTotalQuestions(currentSectionTotalQuestions);

        return surveyAnswerStringRequest;

    }
}
