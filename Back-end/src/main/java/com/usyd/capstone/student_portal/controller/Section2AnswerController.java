package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SectionAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section2AnswerService;
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
public class Section2AnswerController {
    @Autowired
    private Section2AnswerService section2AnswerService;

    @PostMapping("/section2_answer")
    public Result submitSection2Answer(
            @RequestBody SectionAnswerRequest<Section2Answer> request
    ) {
        // 从包装类中获取 section1Answer 和 surveyAnswerInfo
        List<Section2Answer> section2Answers = request.getSectionAnswers();
        SurveyAnswerInfo surveyAnswerInfo = request.getSurveyAnswerInfo();
        // 调用 Service 保存答案
        section2AnswerService.saveSection2Answer(section2Answers, surveyAnswerInfo);
        return Result.success();
    }

}
