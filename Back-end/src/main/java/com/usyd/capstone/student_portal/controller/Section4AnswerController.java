package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SectionAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section4AnswerService;
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
public class Section4AnswerController {
    @Autowired
    private Section4AnswerService section4AnswerService;

    @PostMapping("/section4_answer")
    public Result submitSection3Answer(
            @RequestBody SectionAnswerRequest<Section4Answer> request
    ) {
        // 从包装类中获取 section1Answer 和 surveyAnswerInfo
        List<Section4Answer> section4Answers = request.getSectionAnswers();
        SurveyAnswerInfo surveyAnswerInfo = request.getSurveyAnswerInfo();
        // 调用 Service 保存答案
        section4AnswerService.saveSection4Answer(section4Answers, surveyAnswerInfo);
        return Result.success();
    }
}
