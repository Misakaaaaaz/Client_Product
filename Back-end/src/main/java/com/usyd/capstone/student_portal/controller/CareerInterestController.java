package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.CareerInterest;
import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.service.CareerInterestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student/career-interest")
public class CareerInterestController {
    @Autowired
    private CareerInterestService careerInterestService;


    @GetMapping("/{studentId}")
    public Result getCareerInterestByStudentId(@PathVariable Integer studentId) {
        List<CareerInterest> careerInterestList =
                careerInterestService.selectCareerInterestByStudentId(studentId);
        return Result.success(careerInterestList);
    }
}
