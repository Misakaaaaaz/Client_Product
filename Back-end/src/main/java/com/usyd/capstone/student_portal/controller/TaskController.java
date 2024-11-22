package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.pojo.Task;
import com.usyd.capstone.student_portal.pojo.TaskResponse;
import com.usyd.capstone.student_portal.service.TaskService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(TaskController.class);

    // 获取所有任务
    @GetMapping
    public Result getAllTasks(@RequestParam int studentId) {
        List<Task> tasks = taskService.getAllTasks(studentId);
        return Result.success(tasks);
    }

    @PostMapping
    public Result addTask(@RequestBody Task task, @RequestParam int studentId) {
        int result = taskService.addTask(task, studentId);
        if(result == 1){
            return Result.success("Task added successfully!");
        }else {
            return Result.error("Failed to add task.");
        }
    }

    @DeleteMapping("/{date}/{name}")
    public Result deleteTask(@PathVariable String date, @PathVariable String name, @RequestParam int studentId) {
        Task task = new Task(LocalDate.parse(date), name, null, null, studentId);
        int result = taskService.deleteTask(task, studentId);
        return result == 1 ?
                Result.success("Deleted successfully!") :
                Result.error("Failed to delete task.");
    }

    @PutMapping("/{date}")
    public Result updateTask(@PathVariable String date, @RequestBody Task task, @RequestParam int studentId) {
        task.setDate(LocalDate.parse(date));
        int result = taskService.updateTask(task, studentId);
        return result == 1 ?
                Result.success("Task updated successfully!") :
                Result.error("Failed to update task.");
    }

    @GetMapping("/calendar")
    public Result getCalendar(@RequestParam int studentId) {
        String calendar = taskService.generateCalendar(studentId);
        return Result.success(calendar);
    }
    //根据url订阅日历
    @PostMapping("/subscribe")
    public Result subscribe(
            @RequestParam String calendarUrl,
            @RequestParam String subscriptionName,
            @RequestParam int studentId) {
        try {
            String result = taskService.subscribeCalendar(calendarUrl, subscriptionName, studentId);
            if ("订阅成功".equals(result)) {
                return Result.success("Subscription Success!");
            } else {
                return Result.error(result);
            }
        } catch (Exception e) {
            logger.error("Subscription failed", e);
            return Result.error("Subscription Failure!");
        }
    }
    //获取特定名称日历的任务和时间
    @GetMapping("/tasksBySubscription")
    public ResponseEntity<?> getTasksBySubscription(@RequestParam(required = false) String subscriptionName, @RequestParam int studentId) {
        try {
            TaskResponse taskResponse = taskService.getTaskSummary(subscriptionName, studentId);
            return ResponseEntity.ok(taskResponse);
        } catch (Exception e) {
            logger.error("Failed to get tasks by subscription", e);
            return ResponseEntity.status(500).body("Error fetching tasks.");
        }
    }

    @GetMapping("/tasksByDate")
    public Result getTasksByDateAndSubscriptions(
            @RequestParam String date,
            @RequestParam List<String> subscriptionNames,
            @RequestParam int studentId) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Task> tasks = taskService.getTasksByDateAndSubscriptions(localDate, subscriptionNames, studentId);
            List<Task> firstSixTasks = tasks.stream().limit(6).toList();
            List<LocalDate> remainingDates = tasks.stream().skip(6).map(Task::getDate).toList();
            TaskResponse taskResponse = new TaskResponse(firstSixTasks, remainingDates);
            return Result.success(taskResponse);
        } catch (Exception e) {
            logger.error("Failed to get tasks by date and subscriptions", e);
            return Result.error("Error fetching tasks.");
        }
    }
    //输出所有的用户日历和日期
    @GetMapping("/tasksWithDatesAndSubscriptions")
    public Result getTasksWithDatesAndSubscriptions(@RequestParam int studentId) {
        try {
            Map<String, Object> result = taskService.getAllTasksAndDates(studentId);
            return Result.success(result);
        } catch (Exception e) {
            logger.error("Failed to get tasks with dates and subscriptions", e);
            return Result.error("Error fetching tasks.");
        }
    }
    //取消订阅
    @DeleteMapping("/unsubscribe")
    public Result deleteSubscription(@RequestParam String descriptionName, @RequestParam int studentId) {
        try {
            int result = taskService.deleteCalendarSubscription(descriptionName, studentId);
            if (result > 0) {
                return Result.success("Subscription deleted successfully!");
            } else {
                return Result.error("No matching subscription found.");
            }
        } catch (Exception e) {
            logger.error("Failed to delete subscription", e);
            return Result.error("Failed to delete subscription.");
        }
    }
}
