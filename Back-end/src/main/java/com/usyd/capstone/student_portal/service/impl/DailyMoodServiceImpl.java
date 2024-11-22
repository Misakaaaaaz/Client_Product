package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.DailyMoodMapper;
import com.usyd.capstone.student_portal.pojo.DailyMood;
import com.usyd.capstone.student_portal.service.DailyMoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyMoodServiceImpl implements DailyMoodService {

    @Autowired
    private DailyMoodMapper dailyMoodMapper;
    @Override
    public void addMood(DailyMood dailyMood) {
        // 检查是否已经存在记录
        int count = dailyMoodMapper.countMoodByStudentAndDate(dailyMood.getStudentId(), dailyMood.getMoodDate());

        if (count > 0) {
            // 如果存在，更新记录
            dailyMoodMapper.updateMood(dailyMood);
        } else {
            dailyMoodMapper.addMood(dailyMood);
        }
    }

    @Override
    public List<DailyMood> selectWeekMood(Integer studentId) {
        return dailyMoodMapper.selectWeekMood(studentId);
    }
}
