package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.CareerInterestMapper;
import com.usyd.capstone.student_portal.pojo.CareerInterest;
import com.usyd.capstone.student_portal.service.CareerInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerInterestServiceImpl implements CareerInterestService {

    @Autowired
    private CareerInterestMapper careerInterestMapper;
    @Override
    public List<CareerInterest> selectCareerInterestByStudentId(Integer studentId) {
        return careerInterestMapper.selectCareerInterestByStudentId(studentId);
    }
}
