package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section1Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Section1AnswerMapper {
    void insertSection1Answer(Section1Answer section1Answer);

    void insertSurveyAnswerInfo(SurveyAnswerInfo surveyAnswerInfo);
}
