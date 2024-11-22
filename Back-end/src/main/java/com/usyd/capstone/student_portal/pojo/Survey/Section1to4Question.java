package com.usyd.capstone.student_portal.pojo.Survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section1to4Question {
    private String questionId;
    private Integer questionNumOfSection;
    private String questionName;
    private String questionText;
    private String questionDescription;
    private String questionInstruction;
    private String questionType;
    private String imgUrl;
    private String sectionId;
    private List<Section1to4Option> options;
}
