package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterestingHubPostOperation {
    private Integer studentId;            // 学生 ID
    private Integer postId;               // 帖子 ID
    private Integer viewDuration;         // 浏览时长
    private LocalDateTime createAt;    // 操作时间1
}
