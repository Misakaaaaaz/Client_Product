package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section1to4QuestionMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Question;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyInfo;
import com.usyd.capstone.student_portal.service.Section1to4QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Section1to4QuestionServiceImpl implements Section1to4QuestionService {
    @Autowired
    private Section1to4QuestionMapper section1to4QuestionMapper;
    @Override
    public SurveyInfo listQuestionsOfSingleSection(Integer surveyId, Integer sectionId) {
        return section1to4QuestionMapper.listQuestionsOfSingleSection(surveyId, sectionId);
    }

    @Override
    public List<Section1to4Question> listAll(Integer surveyId) {
//        SurveyInfoAll all = new SurveyInfoAll();
//        // 假设有一个查询 Survey 基本信息的方法
//        SurveyInfo basicSurveyInfo = section1to4QuestionMapper.getBasicSurveyInfo(surveyId);
//
//        if (basicSurveyInfo != null) {
//            all.setSurveyId(basicSurveyInfo.getSurveyId());
//            all.setSurveyName(basicSurveyInfo.getSurveyName());
//            all.setSurveyDescription(basicSurveyInfo.getSurveyDescription());
//            all.setCreatedAt(basicSurveyInfo.getCreatedAt());
//        }
//        List<Section1to4Info> sections = new ArrayList<>();
////         循环获取每个section的问题并添加到列表中
//        for (int sectionId = 1; sectionId <= 4; sectionId++) {
//            List<Section1to4Info> sectionList = section1to4QuestionMapper.listAllQuestions(surveyId, sectionId);
//            sections.addAll(sectionList);
//        }
//
//        all.setAllSections(sections);
//        SurveyInfoAll all = new SurveyInfoAll();
        List<Section1to4Question> sections = section1to4QuestionMapper.listAllQuestions(surveyId);
//        all.setAllSections(sections);
//        return all;
        return(sections);
    }
}
