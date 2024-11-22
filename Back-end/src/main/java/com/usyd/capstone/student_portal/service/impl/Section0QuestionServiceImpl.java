package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section0QuestionMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section0Question;
import com.usyd.capstone.student_portal.service.Section0QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Section0QuestionServiceImpl implements Section0QuestionService {

    @Autowired
    private Section0QuestionMapper section0QuestionMapper;

    @Override
    public List<Section0Question> listSection0Question() {
        return section0QuestionMapper.listSection0Question();
    }
}
