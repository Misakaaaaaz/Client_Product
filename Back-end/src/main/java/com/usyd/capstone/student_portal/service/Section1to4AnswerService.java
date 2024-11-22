package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Survey.Section1Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Scores;

public interface Section1to4AnswerService {
    Section1Scores getSection1ScoresByStudentId(Integer studentId);
    Section2Scores getSection2ScoresByStudentId(Integer studentId);
    Section3Scores getSection3ScoresByStudentId(Integer studentId);
    Section4Scores getSection4ScoresByStudentId(Integer studentId);
}