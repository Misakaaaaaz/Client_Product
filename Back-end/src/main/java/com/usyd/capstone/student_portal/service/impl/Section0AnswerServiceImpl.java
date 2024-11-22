package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.Section0AnswerMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section0Answer;
import com.usyd.capstone.student_portal.service.Section0AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Section0AnswerServiceImpl implements Section0AnswerService {

    @Autowired
    private Section0AnswerMapper section0AnswerMapper;
    @Override
    public void recordSection0Answer(Section0Answer section0Answer) {
        section0AnswerMapper.recordSection0Answer(section0Answer);
    }

    @Override
    public Section0Answer getSection0AnswerById(Integer studentId) {
        return section0AnswerMapper.selectSection0AnswerById(studentId);
    }
}
