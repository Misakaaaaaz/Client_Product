package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.DailyMood;
import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.service.DailyMoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class DailyMoodController {

    @Autowired
    private DailyMoodService dailyMoodService;

    @PostMapping("/daily-mood")
    public Result addMood(@RequestBody DailyMood dailyMood){
        log.info("Insert student's daily mood to DB", dailyMood);
        dailyMoodService.addMood(dailyMood);
        return Result.success();
    }

    @GetMapping("/week-mood/{studentId}")
    public Result selectWeekMood(@PathVariable Integer studentId){
        log.info("Query student's recent week mood", studentId);
        List<DailyMood> weekMoodList = dailyMoodService.selectWeekMood(studentId);
        return Result.success(weekMoodList);
    }
}
