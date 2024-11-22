package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CareerInterest {
    private Integer studentFoeId;
    private Integer studentId;
    private Integer foeCodeId;
    private Integer ranking;
    private String foeCode;
    private String foeName;
}
