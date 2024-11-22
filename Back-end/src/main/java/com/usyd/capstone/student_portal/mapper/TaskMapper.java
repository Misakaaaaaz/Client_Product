package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Task;
import org.apache.ibatis.annotations.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface TaskMapper {

    // 获取所有任务
    @Select("SELECT * FROM tasks WHERE student_id = #{studentId} ORDER BY date")
    List<Task> getAllTasks(int studentId);

    // 添加任务
    @Insert("INSERT INTO tasks (date, name, description, event_time, student_id) " +
            "VALUES (#{date}, #{name}, #{description}, #{eventTime}, #{studentId})")
    int addTask(Task task);

    // 删除任务
    @Delete("DELETE FROM tasks WHERE date = #{date} AND name = #{name} AND student_id = #{studentId}")
    int deleteTask(@Param("date") LocalDate date, @Param("name") String name, @Param("studentId") int studentId);

    // 更新任务
    @Update("UPDATE tasks SET description = #{description}, event_time = #{eventTime} " +
            "WHERE date = #{date} AND name = #{name} AND student_id = #{studentId}")
    int updateTask(@Param("date") LocalDate date,
                   @Param("name") String name,
                   @Param("description") String description,
                   @Param("eventTime") LocalTime eventTime,
                   @Param("studentId") int studentId);


    // 获取特定订阅的任务
    @Select("SELECT * FROM tasks WHERE description = #{subscriptionName} AND student_id = #{studentId} ORDER BY date, event_time")
    List<Task> getTasksBySubscription(@Param("subscriptionName") String subscriptionName, @Param("studentId") int studentId);

    // 根据日期和订阅名称列表获取任务
    @Select({
            "<script>",
            "SELECT * FROM tasks WHERE date = #{date} AND student_id = #{studentId} AND description IN",
            "<foreach item='subscriptionName' collection='subscriptionNames' open='(' separator=',' close=')'>",
            "#{subscriptionName}",
            "</foreach>",
            "ORDER BY date, event_time",
            "</script>"
    })
    List<Task> getTasksByDateAndSubscriptions(@Param("date") LocalDate date,
                                              @Param("subscriptionNames") List<String> subscriptionNames,
                                              @Param("studentId") int studentId);

    // 获取学生所有任务的日期和订阅信息
    @Select("SELECT DISTINCT date FROM tasks WHERE student_id = #{studentId} ORDER BY date")
    List<LocalDate> getDistinctDatesByStudentId(int studentId);

    @Select("SELECT DISTINCT description FROM tasks WHERE student_id = #{studentId} ORDER BY description")
    List<String> getDistinctSubscriptionsByStudentId(int studentId);

    // 获取所有任务及日期
    @Select("SELECT * FROM tasks WHERE student_id = #{studentId} ORDER BY date, event_time")
    List<Map<String, Object>> getAllTasksAndDates(int studentId);

    // 删除某个订阅
    @Delete("DELETE FROM tasks WHERE description = #{descriptionName} AND student_id = #{studentId}")
    int deleteCalendarSubscription(@Param("descriptionName") String descriptionName, @Param("studentId") int studentId);
}
