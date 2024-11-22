package com.usyd.capstone.student_portal.pojo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InterestingHubPost {
    private Integer postId;
    private String title;
    private String context;
    private Integer foeId;
    private String foeName;
    private LocalDateTime createdAt;
    private Integer clickNum;
    private List<InterestingHubPostImage> images;
}
