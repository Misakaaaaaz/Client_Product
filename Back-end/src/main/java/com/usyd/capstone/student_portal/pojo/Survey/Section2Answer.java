package com.usyd.capstone.student_portal.pojo.Survey;

import com.usyd.capstone.student_portal.pojo.Survey.BaseSectionAnswer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section2Answer extends BaseSectionAnswer {
    private Integer section2AnswerId;
//    private Integer answerId;
//    private Integer questionId;
    private Integer optionId;
    private Integer rankingPosition;
//    private LocalDateTime createdAt;
}
