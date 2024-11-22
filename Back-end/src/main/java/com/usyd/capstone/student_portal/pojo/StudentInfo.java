package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentInfo {
    private Long studentId;
    private String studentEmail;
    private String surnameInitial;
    private String firstName;
    private String middleName;
    private String lastName;
    private Integer age;
    private String countryBorn;
    private String currentCountry;
    private String currentCity;
}
