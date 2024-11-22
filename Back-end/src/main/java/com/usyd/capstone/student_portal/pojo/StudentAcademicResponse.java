package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicResponse {
    private StudentAcademicInfo studentInfo;          // 学生信息
    private AcademicCountry country;                  // 学术国家信息
    private List<StudentAcademicPerformance> performances;   // 学生成绩列表
}
