package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SectionAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section3AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class Section3AnswerController {
    @Autowired
    private Section3AnswerService section3AnswerService;

    @PostMapping("/section3_answer")
    public Result submitSection3Answer(
            @RequestBody SectionAnswerRequest<Section3Answer> request
    ) {
        // 从包装类中获取 section1Answer 和 surveyAnswerInfo
        List<Section3Answer> section3Answers = request.getSectionAnswers();
        SurveyAnswerInfo surveyAnswerInfo = request.getSurveyAnswerInfo();
        // 调用 Service 保存答案
        section3AnswerService.saveSection3Answer(section3Answers, surveyAnswerInfo);
        return Result.success();
    }
}
