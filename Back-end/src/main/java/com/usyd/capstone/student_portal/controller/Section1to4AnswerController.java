package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.pojo.Survey.Section1Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Scores;
import com.usyd.capstone.student_portal.service.Section1to4AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class Section1to4AnswerController {

    @Autowired
    private Section1to4AnswerService section1to4AnswerService;

    @GetMapping("/scores/{studentId}")
    public Result getScoresByStudentId(@PathVariable("studentId") Integer studentId) {

        Section1Scores section1 = section1to4AnswerService.getSection1ScoresByStudentId(studentId);
        Section2Scores section2 = section1to4AnswerService.getSection2ScoresByStudentId(studentId);
        Section3Scores section3 = section1to4AnswerService.getSection3ScoresByStudentId(studentId);
        Section4Scores section4 = section1to4AnswerService.getSection4ScoresByStudentId(studentId);


        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("section1", section1);
        resultMap.put("section2", section2);
        resultMap.put("section3", section3);
        resultMap.put("section4", section4);

        return Result.success(resultMap);
    }
}

