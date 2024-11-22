package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section0Answer;

public interface Section0AnswerService {
    void recordSection0Answer(Section0Answer section0Answer);

    Section0Answer getSection0AnswerById(Integer studentId);
}
