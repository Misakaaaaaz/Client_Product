package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicCountry {
    private Integer countryId;          // 国家 ID
    private String countryName;         // 国家名称
    private String educationSystem;     // 教育系统
}
