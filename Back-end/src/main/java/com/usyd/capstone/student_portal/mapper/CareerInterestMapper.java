package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.CareerInterest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CareerInterestMapper {
    List<CareerInterest> selectCareerInterestByStudentId(Integer studentId);
}
