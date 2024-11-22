package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerDetail;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerStringDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SurveyAnswerDetailMapper {
    void insertSurveyAnswerDetail(SurveyAnswerDetail answerDetail);

    SurveyAnswerDetail findByAnswerAndQuestion(Integer answerId, Integer questionId);

    void updateSurveyAnswerDetail(SurveyAnswerDetail answerDetail);

    List<SurveyAnswerDetail> findByAnswerId(Integer answerId);

    void updateSurveyAnswerStringDetail(SurveyAnswerStringDetail answerStringDetail);

    void insertSurveyAnswerStringDetail(SurveyAnswerStringDetail answerStringDetail);

    SurveyAnswerStringDetail findStringByAnswerAndQuestion(Integer answerId, Integer questionId);

    Integer findOptionIdByTextAndQuestion(String optionText, Integer questionId, Integer surveyId);

    String findQuestionTypeById(Integer questionId);

    List<SurveyAnswerStringDetail> findSurveyAnswerDetails(Integer studentId, Integer surveyId);

}
