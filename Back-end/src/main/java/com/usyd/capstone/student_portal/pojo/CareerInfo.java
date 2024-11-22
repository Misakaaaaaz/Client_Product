package com.usyd.capstone.student_portal.pojo;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
        "career_1",
        "career_2",
        "career_3",
        "career_4",
        "career_5",
        "salary_min",
        "salary_q1",
        "salary_median",
        "salary_q3",
        "salary_max"
})
public class CareerInfo {
    private String career_1;
    private String career_2;
    private String career_3;
    private String career_4;
    private String career_5;
    private Integer salary_min;
    private Integer salary_q1;
    private Integer salary_median;
    private Integer salary_q3;
    private Integer salary_max;
}
