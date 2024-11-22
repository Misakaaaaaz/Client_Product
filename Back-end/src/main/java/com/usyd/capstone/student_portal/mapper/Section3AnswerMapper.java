package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section3Answer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Section3AnswerMapper {
    void insertSection3Answer(Section3Answer section3Answer);
}
