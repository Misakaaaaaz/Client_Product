package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.StudentAcademicMapper;
import com.usyd.capstone.student_portal.pojo.AcademicCountry;
import com.usyd.capstone.student_portal.pojo.StudentAcademicInfo;
import com.usyd.capstone.student_portal.pojo.StudentAcademicPerformance;
import com.usyd.capstone.student_portal.pojo.StudentAcademicResponse;
import com.usyd.capstone.student_portal.service.StudentAcademicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentAcademicServiceImpl implements StudentAcademicService {

    @Autowired
    private StudentAcademicMapper studentAcademicMapper;

    @Override
    public StudentAcademicResponse getStudentAcademicInfo(Integer studentId) {
        // 查询学生的基本信息
        StudentAcademicInfo studentInfo = studentAcademicMapper.selectStudentInfo(studentId);
        if (studentInfo == null) {
            return null;
        }

        // 查询学生所属国家的学术信息
        AcademicCountry country = studentAcademicMapper.selectAcademicCountry(studentInfo.getAcademicCountryId());

        // 查询学生的学术成绩列表
        List<StudentAcademicPerformance> performances = studentAcademicMapper.selectStudentPerformances(studentId);

        // 组合响应
        return new StudentAcademicResponse(studentInfo, country, performances);
    }
}
