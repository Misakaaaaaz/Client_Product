package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section2Answer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Section2AnswerMapper {
    void insertSection2Answer(Section2Answer section2Answer);


}
