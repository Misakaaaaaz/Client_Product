package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyMood {
    private Integer moodId;
    private Integer studentId;
    private LocalDate moodDate;
    private Integer moodScore;
}
