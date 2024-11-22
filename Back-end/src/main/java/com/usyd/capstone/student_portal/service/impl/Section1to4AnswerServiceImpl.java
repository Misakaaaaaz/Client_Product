package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.SectionScoresMapper;
import com.usyd.capstone.student_portal.pojo.Survey.Section1Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Scores;
import com.usyd.capstone.student_portal.service.Section1to4AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Section1to4AnswerServiceImpl implements Section1to4AnswerService {

    @Autowired
    private SectionScoresMapper sectionScoresMapper;

    @Override
    public Section1Scores getSection1ScoresByStudentId(Integer studentId) {
        return sectionScoresMapper.findSection1ScoresByStudentId(studentId);
    }

    @Override
    public Section2Scores getSection2ScoresByStudentId(Integer studentId) {
        return sectionScoresMapper.findSection2ScoresByStudentId(studentId);
    }

    @Override
    public Section3Scores getSection3ScoresByStudentId(Integer studentId) {
        return sectionScoresMapper.findSection3ScoresByStudentId(studentId);
    }

    @Override
    public Section4Scores getSection4ScoresByStudentId(Integer studentId) {
        return sectionScoresMapper.findSection4ScoresByStudentId(studentId);
    }
}