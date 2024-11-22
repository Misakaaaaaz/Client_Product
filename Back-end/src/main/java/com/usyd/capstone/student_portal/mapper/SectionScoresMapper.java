package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Survey.Section1Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section2Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section3Scores;
import com.usyd.capstone.student_portal.pojo.Survey.Section4Scores;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SectionScoresMapper {

    @Select("SELECT * FROM section1_scores WHERE student_id = #{studentId}")
    Section1Scores findSection1ScoresByStudentId(@Param("studentId") Integer studentId);

    @Select("SELECT * FROM section2_scores WHERE student_id = #{studentId}")
    Section2Scores findSection2ScoresByStudentId(@Param("studentId") Integer studentId);

    @Select("SELECT * FROM section3_scores WHERE student_id = #{studentId}")
    Section3Scores findSection3ScoresByStudentId(@Param("studentId") Integer studentId);

    @Select("SELECT * FROM section4_scores WHERE student_id = #{studentId}")
    Section4Scores findSection4ScoresByStudentId(@Param("studentId") Integer studentId);
}
