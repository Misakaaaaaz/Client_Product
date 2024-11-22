package com.usyd.capstone.student_portal.pojo.Survey;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Section0Question {
    private Integer questionId;
    private String questionText;
    private String questionType;
    private Boolean isRequired;
    private String comments;
    private List<Section0Option> options;

}
