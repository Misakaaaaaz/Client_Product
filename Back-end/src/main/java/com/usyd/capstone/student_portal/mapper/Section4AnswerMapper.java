package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section4Answer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Section4AnswerMapper {
    void insertSection4Answer(Section4Answer section4Answer);
}
