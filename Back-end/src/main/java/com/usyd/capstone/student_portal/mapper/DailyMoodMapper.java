package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.DailyMood;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface DailyMoodMapper {
    @Insert("insert into daily_mood(student_id, mood_date, mood_score) " +
            "values (#{studentId}, #{moodDate}, #{moodScore})")
    void addMood(DailyMood dailyMood);

    List<DailyMood> selectWeekMood(Integer studentId);

    int countMoodByStudentAndDate(Integer studentId, LocalDate moodDate);

    void updateMood(DailyMood dailyMood);
}
