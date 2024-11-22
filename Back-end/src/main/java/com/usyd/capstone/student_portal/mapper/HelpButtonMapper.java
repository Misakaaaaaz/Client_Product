package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.HelpButton;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HelpButtonMapper {

    @Insert("insert into " +
            "need_help(student_id, student_phone, student_email, application_date) " +
            "values(#{studentId}, #{studentPhone}, #{studentEmail}, #{applicationDate})")
    void applyHelp(HelpButton helpButton);
}
