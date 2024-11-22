package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Survey.Section1to4Question;
import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyInfo;
import com.usyd.capstone.student_portal.service.Section1to4QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class Section1to4QuestionController {

    @Autowired
    private Section1to4QuestionService section1to4QuestionService;

    @GetMapping("/survey/{surveyId}/section/{sectionId}")
    public Result listQuestionsOfSingleSection(@PathVariable Integer surveyId, @PathVariable Integer sectionId){
        log.info("query questions of single section, parameter:{},{}",surveyId, sectionId);
        SurveyInfo questionsOfSingleSection
                = section1to4QuestionService.listQuestionsOfSingleSection(surveyId, sectionId);
        return Result.success(questionsOfSingleSection);
    }

    @GetMapping("/survey/{surveyId}/all")
    public Result listAllQuestion(@PathVariable Integer surveyId){
        List<Section1to4Question> sections = section1to4QuestionService.listAll(surveyId);
        return  Result.success(sections);
    }

}