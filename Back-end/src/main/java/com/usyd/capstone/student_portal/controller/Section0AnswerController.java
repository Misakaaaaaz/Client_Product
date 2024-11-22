package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Survey.Section0Answer;
import com.usyd.capstone.student_portal.service.Section0AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class Section0AnswerController {

    @Autowired
    private Section0AnswerService section0AnswerService;

    @PostMapping("/section0answer")
    public Result recordSection0Answer(@RequestBody Section0Answer section0Answer){
        log.info("Insert student's SECTION0 Answer to DB", section0Answer);
        section0AnswerService.recordSection0Answer(section0Answer);
        return Result.success();
    }

    @GetMapping("/section0answer/{studentId}")
    public Result getSection0Answer(@PathVariable Integer studentId){
        Section0Answer  section0Answer = section0AnswerService.getSection0AnswerById(studentId);
        return Result.success(section0Answer);
    }

}
