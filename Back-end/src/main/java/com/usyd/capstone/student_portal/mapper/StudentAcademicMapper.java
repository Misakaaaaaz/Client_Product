package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.AcademicCountry;
import com.usyd.capstone.student_portal.pojo.StudentAcademicInfo;
import com.usyd.capstone.student_portal.pojo.StudentAcademicPerformance;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StudentAcademicMapper {
    public StudentAcademicInfo selectStudentInfo(Integer studentId);

    public AcademicCountry selectAcademicCountry(Integer academicCountryId);

    public List<StudentAcademicPerformance> selectStudentPerformances(Integer studentId);

//    String selectStudentEmail(Integer studentId);
}
