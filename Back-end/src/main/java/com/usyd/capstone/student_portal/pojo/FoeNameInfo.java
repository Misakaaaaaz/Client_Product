package com.usyd.capstone.student_portal.pojo;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
        "foe_code",
        "foe_name",
        "ranking",
        "salary_median"
})
public class FoeNameInfo {
    private String foe_code;
    private String foe_name;
    private Integer ranking;
    private Integer salary_median;
}

