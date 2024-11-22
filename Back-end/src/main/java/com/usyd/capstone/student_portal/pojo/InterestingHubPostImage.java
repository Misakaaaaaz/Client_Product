package com.usyd.capstone.student_portal.pojo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InterestingHubPostImage {
    private Integer imageId;
    private Integer postId;
    private String imgUrl;
}
