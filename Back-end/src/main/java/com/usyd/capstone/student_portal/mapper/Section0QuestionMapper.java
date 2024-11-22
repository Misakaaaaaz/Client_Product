package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section0Question;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Section0QuestionMapper {
    List<Section0Question> listSection0Question();
}
