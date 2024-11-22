package com.usyd.capstone.student_portal.pojo.Survey;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Section0Option {
    private Integer optionId;
    private Integer questionId;
    private String optionText;
}
