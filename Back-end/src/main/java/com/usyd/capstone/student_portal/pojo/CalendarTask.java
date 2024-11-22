package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarTask {
    private LocalDate calendarDate;
    private String calendarName;
    private String calendarDescription;
    private LocalTime eventTime;
    private Integer studentId;
}
