package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.StudentInfoMapper;
import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.service.StudentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class StudentInfoServiceImpl implements StudentInfoService {

    @Autowired
    private StudentInfoMapper studentInfoMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void registerStudent(Student student) {
        // 在注册时，对密码进行加密
        student.setStudentPassword(passwordEncoder.encode(student.getStudentPassword()));
        studentInfoMapper.registerStudent(student);
    }

    @Override
    public boolean isEmailRegistered(String email) {
        return studentInfoMapper.findStudentByEmail(email) != null;
    }

    @Override
    public boolean validateLogin(String email, String password) {
        Student student = studentInfoMapper.findStudentByEmail(email);
        // 使用 BCryptPasswordEncoder 验证密码是否匹配
        return student != null && passwordEncoder.matches(password, student.getStudentPassword());
    }

    @Override
    public Student getStudentByEmail(String email) {
        return studentInfoMapper.findStudentByEmail(email);
    }

    @Override
    public void updatePassword(String email, String newPassword) {
        // 对新密码进行加密
        String encodedPassword = passwordEncoder.encode(newPassword);
        // 更新密码到数据库
        studentInfoMapper.updatePassword(email, encodedPassword);
    }

    @Override
    public List<FoeNameInfo> getCareerInfoByStudentId(Integer studentId) {
        List<Map<String, Object>> careerData = studentInfoMapper.findCareerInfoByStudentId(studentId);

        List<FoeNameInfo> careerInfoList = new ArrayList<>();
        for (Map<String, Object> data : careerData) {
            FoeNameInfo foeNameInfo = new FoeNameInfo();
            foeNameInfo.setFoe_code((String) data.get("foe_code"));
            foeNameInfo.setFoe_name((String) data.get("foe_name"));
            foeNameInfo.setRanking((Integer) data.get("ranking"));
            foeNameInfo.setSalary_median((Integer) data.get("salary_median"));
            careerInfoList.add(foeNameInfo);
        }
        return careerInfoList;
    }



    @Override
    public CareerInfo getCareersByUserIdAndFoeCode(Integer studentId, String foeCode) {
        Map<String, Object> careers = studentInfoMapper.findCareersByUserIdAndFoeCode(studentId, foeCode);

        if (careers == null || careers.isEmpty()) {
            return null;
        }

        CareerInfo careerInfo = new CareerInfo();
        careerInfo.setSalary_min((Integer) careers.get("salary_min"));
        careerInfo.setSalary_q1((Integer) careers.get("salary_q1"));
        careerInfo.setSalary_median((Integer) careers.get("salary_median"));
        careerInfo.setSalary_q3((Integer) careers.get("salary_q3"));
        careerInfo.setSalary_max((Integer) careers.get("salary_max"));
        careerInfo.setCareer_1((String) careers.get("career_1"));
        careerInfo.setCareer_2((String) careers.get("career_2"));
        careerInfo.setCareer_3((String) careers.get("career_3"));
        careerInfo.setCareer_4((String) careers.get("career_4"));
        careerInfo.setCareer_5((String) careers.get("career_5"));

        return careerInfo;
    }


    @Override
    public List<UniversityInfo> getUniversityAndCourseByStudentIdAndFoeCode(Integer studentId, String foeCode) {
        List<Map<String, Object>> universityData = studentInfoMapper.findUniversityAndCourseByStudentIdAndFoeCode(studentId, foeCode);

        List<UniversityInfo> universityInfoList = new ArrayList<>();
        for (Map<String, Object> data : universityData) {
            UniversityInfo universityInfo = new UniversityInfo();
            universityInfo.setUniversity((String) data.get("university"));
            universityInfo.setCourse((String) data.get("course"));
            universityInfo.setDurationWeeks((Integer) data.get("duration_weeks"));
            universityInfo.setCourseCost((Double) data.get("course_cost"));
            universityInfo.setAtarMinNonAdj((Double) data.get("atar_min_non_adj"));
            universityInfo.setAtarMedMonAdj((Double) data.get("atar_med_non_adj"));
            universityInfo.setAtarGuaranteed((Double) data.get("atar_guaranteed"));
            universityInfo.setAdmissionCenter((String) data.get("admission_center"));
            universityInfo.setAdmissionCenterCode((String) data.get("admission_center_code"));
            universityInfo.setTargetOrReach((String) data.get("target_or_reach"));

            universityInfoList.add(universityInfo);
        }
        return universityInfoList;
    }

    @Override
    public StudentInfo getStudentInfoById(Integer studentId) {
        return studentInfoMapper.findStudentInfoById(studentId);
    }

}
