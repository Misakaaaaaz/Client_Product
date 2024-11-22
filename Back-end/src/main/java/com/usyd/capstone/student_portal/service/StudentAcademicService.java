package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.StudentAcademicResponse;

public interface StudentAcademicService {

    StudentAcademicResponse getStudentAcademicInfo(Integer studentId);
}
