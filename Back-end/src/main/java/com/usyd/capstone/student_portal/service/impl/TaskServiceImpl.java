package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.TaskMapper;
import com.usyd.capstone.student_portal.pojo.Task;
import com.usyd.capstone.student_portal.pojo.TaskResponse;
import com.usyd.capstone.student_portal.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskMapper taskMapper;
    @Autowired
    private CalendarSubscriptionService calendarSubscriptionService;

    @Override
    public List<Task> getAllTasks(int studentId) {
        return taskMapper.getAllTasks(studentId);
    }

    @Override
    public int addTask(Task task, int studentId) {
        return taskMapper.addTask(task);
    }

    @Override
    public int deleteTask(Task task, int studentId) {
        return taskMapper.deleteTask(task.getDate(), task.getName(), studentId);
    }

    @Override
    public int updateTask(Task task, int studentId) {
        // 实现更新任务的逻辑（调用数据库层面的更新操作）
        return taskMapper.updateTask(task.getDate(), task.getName(), task.getDescription(), task.getEventTime(), studentId);
    }

    @Override
    public TaskResponse getTaskSummary(String subscriptionName, int studentId) {
        List<LocalDate> dates = taskMapper.getDistinctDatesByStudentId(studentId);
        List<Task> tasks = taskMapper.getTasksBySubscription(subscriptionName, studentId);
        return new TaskResponse(tasks, dates);
    }


    @Override
    public List<Task> getTasksByDateAndSubscriptions(LocalDate date, List<String> subscriptionNames, int studentId) {
        return taskMapper.getTasksByDateAndSubscriptions(date, subscriptionNames, studentId);
    }

    @Override
    public Map<String, Object> getAllTasksAndDates(int studentId) {

        List<Map<String, Object>> taskList = taskMapper.getAllTasksAndDates(studentId);

        Map<String, List<Map<String, Object>>> subscriptionsMap = new HashMap<>();

        Set<String> datesSet = new HashSet<>();

        for (Map<String, Object> task : taskList) {
            String subscriptionName = (String) task.get("description");

            java.sql.Date sqlDate = (java.sql.Date) task.get("date");
            String date = sqlDate.toString(); // 将 java.sql.Date 转换为 String

            datesSet.add(date);

            subscriptionsMap.computeIfAbsent(subscriptionName, k -> new ArrayList<>()).add(task);
        }

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> subscriptions = new ArrayList<>();

        for (Map.Entry<String, List<Map<String, Object>>> entry : subscriptionsMap.entrySet()) {
            Map<String, Object> subscription = new HashMap<>();
            subscription.put("subscriptionName", entry.getKey());
            subscription.put("tasks", entry.getValue());
            subscriptions.add(subscription);
        }

        result.put("subscriptions", subscriptions);
        result.put("dates", new ArrayList<>(datesSet));

        return result;
    }




    @Override
    public String subscribeCalendar(String calendarUrl, String subscriptionName, int studentId) throws Exception {
        // 在调用CalendarSubscriptionService时传递studentId
        return calendarSubscriptionService.subscribeToCalendar(calendarUrl, subscriptionName, studentId);
    }


    @Override
    public String generateCalendar(int studentId) {
        LocalDate today = LocalDate.now();
        LocalDate firstOfMonth = today.withDayOfMonth(1);
        LocalDate lastOfMonth = today.withDayOfMonth(today.lengthOfMonth());
        List<Task> tasks = taskMapper.getAllTasks(studentId);

        StringBuilder calendar = new StringBuilder();
        calendar.append("Calendar for ").append(today.getMonth()).append(" ").append(today.getYear()).append(":\n");
        calendar.append("Su Mo Tu We Th Fr Sa\n");

        int dayOfWeekValue = firstOfMonth.getDayOfWeek().getValue();
        String leadingSpaces = "   ".repeat(dayOfWeekValue % 7);
        calendar.append(leadingSpaces);

        LocalDate current = firstOfMonth;
        while (!current.isAfter(lastOfMonth)) {
            calendar.append(String.format("%2d ", current.getDayOfMonth()));
            if (current.getDayOfWeek() == DayOfWeek.SATURDAY) {
                calendar.append("\n");
            }
            current = current.plusDays(1);
        }

        calendar.append("\n\nTasks:\n");
        for (Task task : tasks) {
            if (task.getDate().getMonth().equals(today.getMonth())) {
                calendar.append(task.getDate())
                        .append(" - ")
                        .append(task.getName())
                        .append(" - ")
                        .append(task.getDescription() != null ? task.getDescription() : "No description")
                        .append(" - ")
                        .append(task.getEventTime() != null ? task.getEventTime() : "No time")
                        .append("\n");
            }
        }

        return calendar.toString();
    }
    @Override
    public int deleteCalendarSubscription(String descriptionName, int studentId) {
        return taskMapper.deleteCalendarSubscription(descriptionName, studentId);
    }
}
