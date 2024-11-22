package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.*;

import java.util.List;


public interface StudentInfoService {
    void registerStudent(Student student);
    boolean isEmailRegistered(String email);
    boolean validateLogin(String email, String password);
    Student getStudentByEmail(String email);
    void updatePassword(String email, String newPassword);
    List<FoeNameInfo> getCareerInfoByStudentId(Integer studentId);
    CareerInfo getCareersByUserIdAndFoeCode(Integer studentId, String foeCode);
    List<UniversityInfo> getUniversityAndCourseByStudentIdAndFoeCode(Integer studentId, String foeCode);

    StudentInfo getStudentInfoById(Integer studentId);
}
