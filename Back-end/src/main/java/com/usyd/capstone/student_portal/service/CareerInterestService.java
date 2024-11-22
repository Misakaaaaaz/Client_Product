package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.CareerInterest;

import java.util.List;

public interface CareerInterestService {
    List<CareerInterest> selectCareerInterestByStudentId(Integer studentId);
}
