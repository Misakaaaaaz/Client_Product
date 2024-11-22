package com.usyd.capstone.student_portal.pojo;

import com.usyd.capstone.student_portal.pojo.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class TaskResponse {
    private List<Task> tasks;
    private List<LocalDate> dates;
}
