package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.StudentAcademicResponse;
import com.usyd.capstone.student_portal.service.StudentAcademicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/student/academic-info")
public class StudentAcademicController {
    @Autowired
    private StudentAcademicService studentAcademicService;

    @GetMapping("/{studentId}")
    public Result getStudentAcademicInfo(@PathVariable Integer studentId) {
        StudentAcademicResponse response = studentAcademicService.getStudentAcademicInfo(studentId);
        return Result.success(response);
    }
}
