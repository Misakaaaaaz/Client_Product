package com.usyd.capstone.student_portal.pojo.Survey;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SurveyAnswerDetail {
        private Integer answerDetailId;
        private Integer answerId;
        private Integer questionId;
        private String answerText;
        private Integer selectedOptionId;
        private String rankOrder;
        private LocalDateTime createdAt;
}
