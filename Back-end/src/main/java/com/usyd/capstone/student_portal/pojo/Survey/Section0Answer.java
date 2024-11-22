package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section0Answer {
    private Integer section0AnswerId;
    private Integer studentId;
    private char surnameInitial;
    private Integer age;
    private String firstLanguage;
    private String otherLanguage;
    private String countryBorn;
    private String currentCountry;
    private String currentCity;
    private String typeOfSchool;
    private String secondaryQualification;
    private String workExperience;
    private String dreamCareer;
}
