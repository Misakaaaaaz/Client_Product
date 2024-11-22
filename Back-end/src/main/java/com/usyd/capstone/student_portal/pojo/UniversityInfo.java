package com.usyd.capstone.student_portal.pojo;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
        "university",
        "course",
        "durationWeeks",
        "courseCost",
        "atarMinNonAdj",
        "atarMedNonAdj",
        "atarGuaranteed",
        "admissionCenter",
        "admissionCenterCode",
        "targetOrReach"
})
public class UniversityInfo {
    private String university;
    private String course;
    private Integer durationWeeks;
    private Double courseCost;
    private Double atarMinNonAdj;
    private Double atarMedMonAdj;
    private Double atarGuaranteed;
    private String admissionCenter;
    private String admissionCenterCode;
    private String targetOrReach;
}
