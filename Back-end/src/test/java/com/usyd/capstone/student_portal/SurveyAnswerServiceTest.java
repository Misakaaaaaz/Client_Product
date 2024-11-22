package com.usyd.capstone.student_portal;

import com.usyd.capstone.student_portal.mapper.SurveyAnswerDetailMapper;
import com.usyd.capstone.student_portal.mapper.SurveyAnswerInfoMapper;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerInfo;
import com.usyd.capstone.student_portal.pojo.Survey.SurveyAnswerStringRequest;
import com.usyd.capstone.student_portal.service.impl.SurveyAnswerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SurveyAnswerServiceTest {

    @Mock
    private SurveyAnswerInfoMapper surveyAnswerInfoMapper;

    @Mock
    private SurveyAnswerDetailMapper surveyAnswerDetailMapper;  // 确保所有依赖都被模拟

    @InjectMocks
    private SurveyAnswerServiceImpl surveyAnswerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // 初始化 @Mock 对象
    }

    @Test
    public void testGetSurveyAnswerDetails() {
        // 假设的数据
        Integer studentId = 1032;
        Integer surveyId = 1;

        // 模拟返回的 SurveyAnswerInfo 数据
        SurveyAnswerInfo mockInfo = mockSurveyAnswerInfo();
        when(surveyAnswerInfoMapper.findSurveyAnswerInfo(studentId, surveyId)).thenReturn(mockInfo);

        // 调用被测试的方法
        SurveyAnswerStringRequest response = surveyAnswerService.getSurveyAnswerDetails(studentId, surveyId);

        // 验证结果
        assertNotNull(response);
        assertEquals(1032, response.getSurveyAnswerInfo().getStudentId());
        assertEquals(1, response.getSurveyAnswerInfo().getSurveyId());

        // 验证 Mock 行为
        verify(surveyAnswerInfoMapper, times(1)).findSurveyAnswerInfo(studentId, surveyId);
    }

    private SurveyAnswerInfo mockSurveyAnswerInfo() {
        SurveyAnswerInfo info = new SurveyAnswerInfo();
        info.setAnswerId(30);
        info.setStudentId(1032);
        info.setSurveyId(1);
        info.setCurrentSection(2);
        info.setCurrentNumOfQuestion(2);
        return info;
    }
}