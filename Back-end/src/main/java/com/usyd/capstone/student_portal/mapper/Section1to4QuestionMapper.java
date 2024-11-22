package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Question;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Section1to4QuestionMapper {
    SurveyInfo listQuestionsOfSingleSection(Integer surveyId, Integer sectionId);

    //List<Section1to4Info> listAllQuestions(@Param("surveyId") Integer surveyId, @Param("sectionId") Integer sectionId);

    List<Section1to4Question> listAllQuestions(@Param("surveyId") Integer surveyId);
    SurveyInfo getBasicSurveyInfo(Integer surveyId);
}
