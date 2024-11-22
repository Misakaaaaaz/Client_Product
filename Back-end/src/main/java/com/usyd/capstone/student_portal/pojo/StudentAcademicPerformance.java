package com.usyd.capstone.student_portal.pojo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicPerformance {
    private Integer studentScoreId;     // 学生成绩 ID
    private Integer studentId;          // 学生 ID
    private Integer academicCountryId;  // 学术国家 ID
    private String subjectName;         // 科目名称
    private Float scoreObtained;        // 获得的分数
    private Float scoreTotal;           // 总分
    private Float scoreMedian;
}
