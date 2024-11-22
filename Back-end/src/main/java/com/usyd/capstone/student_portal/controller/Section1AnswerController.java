package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Survey.Section1Answer;
import com.usyd.capstone.student_portal.pojo.Survey.SectionAnswerRequest;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.service.Section1AnswerService;
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
public class Section1AnswerController {

    @Autowired
    private Section1AnswerService section1AnswerService;

    // 接收并处理用户的作答信息
    @PostMapping("/section1_answer")
    public Result submitSection1Answer(
            @RequestBody SectionAnswerRequest<Section1Answer> request
    ) {
        // 从包装类中获取 section1Answer 和 surveyAnswerInfo
        List<Section1Answer> section1Answers = request.getSectionAnswers();
        SurveyAnswerInfo surveyAnswerInfo = request.getSurveyAnswerInfo();
        // 调用 Service 保存答案
        section1AnswerService.saveSection1Answer(section1Answers, surveyAnswerInfo);
        return Result.success();
    }

}
