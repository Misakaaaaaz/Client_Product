package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SurveyAnswerInfoMapper {
    void insertSurveyAnswerInfo(SurveyAnswerInfo surveyAnswerInfo);

    void updateCompletedSection(Integer answerId, Integer completedSection);

    // 根据 studentId 和 surveyId 查找 answerId
    Integer findAnswerIdByStudentAndSurvey(@Param("studentId") Integer studentId, @Param("surveyId") Integer surveyId);

    void updateCurrentProgress(Integer answerId, int currentSection, int currentNumOfQuestion);

    SurveyAnswerInfo findByStudentAndSurvey(Integer studentId, Integer surveyId);

    void updateSurveyAnswerInfo(SurveyAnswerInfo surveyAnswerInfo);

    SurveyAnswerInfo findSurveyAnswerInfo(Integer studentId, Integer surveyId);

    int getTotalSection(Integer surveyId);

    int getCurrentSectionTotalQuestions(Integer currentSection);

    List<Integer> getAllSectionNums(Integer surveyId);
}
