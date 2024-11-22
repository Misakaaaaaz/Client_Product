package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.Task;
import com.usyd.capstone.student_portal.pojo.TaskResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface TaskService {

    // 获取所有任务
    List<Task> getAllTasks(int studentId);

    // 添加任务
    int addTask(Task task, int studentId);

    // 删除任务
    int deleteTask(Task task, int studentId);

    // 更新任务（你需要添加的部分）
    int updateTask(Task task, int studentId);

    // 获取任务摘要（根据订阅名获取前limit个任务）
    TaskResponse getTaskSummary(String subscriptionName,int studentId);

    // 根据日期和订阅名列表获取任务
    List<Task> getTasksByDateAndSubscriptions(LocalDate date, List<String> subscriptionNames, int studentId);

    // 获取所有任务及日期信息
    Map<String, Object> getAllTasksAndDates(int studentId);

    // 订阅日历并保存到数据库
    String subscribeCalendar(String calendarUrl, String subscriptionName, int studentId) throws Exception;

    // 生成日历
    String generateCalendar(int studentId);

    // 取消订阅
    int deleteCalendarSubscription(String descriptionName, int studentId);
}
