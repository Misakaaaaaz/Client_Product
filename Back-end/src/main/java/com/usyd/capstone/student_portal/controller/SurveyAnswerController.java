package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerDetail;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerStringRequest;
import com.usyd.capstone.student_portal.service.SurveyAnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class SurveyAnswerController {
    @Autowired
    private SurveyAnswerService surveyAnswerService;

    @PostMapping("/answer")
    public Result submitSurveyAnswer(@RequestBody SurveyAnswerRequest surveyAnswerRequest) {

        surveyAnswerService.saveSurveyAnswer(surveyAnswerRequest);
        return Result.success();
    }
    @PostMapping("/answer/text")
    public Result submitSurveyAnswerText(@RequestBody SurveyAnswerStringRequest surveyAnswerStringRequest) {

        surveyAnswerService.saveSurveyAnswerText(surveyAnswerStringRequest);
        return Result.success();
    }

    @GetMapping("/answers/{userId}/{surveyId}")
    public Result getSurveyAnswers(
            @PathVariable("userId") Integer userId,
            @PathVariable("surveyId") Integer surveyId) {
        SurveyAnswerRequest answers = surveyAnswerService.getSurveyAnswersByUserAndSurvey(userId, surveyId);
        return Result.success(answers);
    }

    @GetMapping("/answers")
    public Result getFormalSurveyAnswers(
            @RequestParam Integer studentId,
            @RequestParam Integer surveyId) {
        SurveyAnswerStringRequest response = surveyAnswerService.getSurveyAnswerDetails(studentId, surveyId);
        return Result.success(response);
    }

}
