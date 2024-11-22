package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.DailyMood;

import java.util.List;

public interface DailyMoodService {
    void addMood(DailyMood dailyMood);

    List<DailyMood> selectWeekMood(Integer studentId);
}
