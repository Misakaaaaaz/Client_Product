package com.usyd.capstone.student_portal.service.impl;

import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.data.ParserException;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.component.VEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class CalendarSubscriptionService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    // 订阅日历方法，传入订阅的日历URL、订阅名称和studentId
    public String subscribeToCalendar(String calendarUrl, String subscriptionName, int studentId) throws IOException, URISyntaxException, ParserException {
        // 检查订阅名称是否已存在（根据 studentId 进行过滤）
        String checkSubscriptionNameSql = "SELECT COUNT(*) FROM tasks WHERE description = ? AND student_id = ?";
        Integer subscriptionCount = jdbcTemplate.queryForObject(checkSubscriptionNameSql, Integer.class, subscriptionName, studentId);
        if (subscriptionCount != null && subscriptionCount > 0) {
            return "订阅名称已存在！";
        }

        // 获取iCalendar数据
        String icsData = restTemplate.getForObject(new URI(calendarUrl), String.class);
        if (icsData != null) {
            // 解析日历数据
            Calendar calendar = parseCalendar(icsData);
            // 处理日历事件
            processCalendarEvents(calendar, subscriptionName, studentId);
            return "订阅成功";
        }
        return "订阅失败：无法获取日历数据。";
    }

    // 解析iCalendar数据
    private Calendar parseCalendar(String icsData) throws IOException, ParserException {
        CalendarBuilder builder = new CalendarBuilder();
        return builder.build(new ByteArrayInputStream(icsData.getBytes()));
    }

    // 处理从iCalendar中提取的事件并存储到数据库中，增加studentId
    private void processCalendarEvents(Calendar calendar, String subscriptionName, int studentId) {
        // 获取所有的事件组件
        List<VEvent> events = calendar.getComponents(VEvent.VEVENT);
        for (VEvent event : events) {
            // 将事件日期和时间转换为本地日期和时间
            LocalDate eventDate = event.getStartDate().getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalTime eventTime = event.getStartDate().getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
            String eventName = event.getSummary().getValue();

            // 检查是否已经存在相同的事件
            String checkSql = "SELECT COUNT(*) FROM tasks WHERE date = ? AND name = ? AND description = ? AND student_id = ?";
            Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, eventDate, eventName, subscriptionName, studentId);
            if (count != null && count == 0) {
                // 插入新事件到数据库
                String sql = "INSERT INTO tasks (date, name, event_time, description, student_id) VALUES (?, ?, ?, ?, ?)";
                jdbcTemplate.update(sql, eventDate, eventName, eventTime.toString(), subscriptionName, studentId);  // 使用 eventTime.toString() 作为字符串存储
            }
        }
    }
}
