package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Survey.Section0Question;
import com.usyd.capstone.student_portal.service.Section0QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class Section0QuestionController {

    @Autowired
    private Section0QuestionService section0QuestionService;

    @GetMapping("/section0")
    public Result listSection0Question(){
        log.info("query section0 questions");
        List<Section0Question> section0Questions= section0QuestionService.listSection0Question();
        return Result.success(section0Questions);
    }

}
