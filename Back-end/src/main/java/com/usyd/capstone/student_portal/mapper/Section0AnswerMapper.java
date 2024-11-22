package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section0Answer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Section0AnswerMapper {
    void recordSection0Answer(Section0Answer section0Answer);

    Section0Answer selectSection0AnswerById(Integer studentId);
}
