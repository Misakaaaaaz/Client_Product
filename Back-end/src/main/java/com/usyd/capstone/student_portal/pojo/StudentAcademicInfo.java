package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicInfo {
    private Integer studentId;         // 学生 ID
    private String studentName;        // 学生姓名
    private Integer academicCountryId; // 学术国家 ID
    private Float percentile;          // 百分位
}
