package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.*;
import com.usyd.capstone.student_portal.service.EmailService;
import com.usyd.capstone.student_portal.service.StudentInfoService;
import com.usyd.capstone.student_portal.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/student")
public class StudentInfoController {

    @Autowired
    private StudentInfoService studentInfoService;

    @Autowired
    private EmailService emailService;

    // 登录接口
    @PostMapping("/login")
    public Result login(@RequestBody Student student) {
        if (!studentInfoService.validateLogin(student.getStudentEmail(), student.getStudentPassword())) {
            return Result.error("Invalid email or password");
        }

        Student dbStudent = studentInfoService.getStudentByEmail(student.getStudentEmail());
        if (dbStudent == null) {
            return Result.error("User not found");
        }

        String token = JwtUtil.generateToken(dbStudent.getStudentEmail());
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("token", token);
        responseData.put("student_id", dbStudent.getStudentId());

        return Result.success(responseData);
    }

    // 发送验证码到邮箱
    @PostMapping("/send-code")
    public Result sendVerificationCode(@RequestBody Map<String, String> request) {
        String email = request.get("studentEmail");

        if (isEmailInvalid(email)) {
            return Result.error("Email is required");
        }

        if (studentInfoService.isEmailRegistered(email)) {
            return Result.error("Email is already registered");
        }

        emailService.sendVerificationCode(email); // 发送验证码
        return Result.success("Verification code sent to " + email);
    }

    // 注册时验证验证码
    @PostMapping("/register")
    public Result register(@RequestBody Map<String, String> request) {
        String email = request.get("studentEmail");
        String code = request.get("code");
        String password = request.get("studentPassword");

        if (isRegistrationInputInvalid(email, password, code)) {
            return Result.error("Email, password, and code are required");
        }

        if (!emailService.verifyCode(email, code)) {
            return Result.error("Invalid or expired verification code");
        }

        Student student = new Student();
        student.setStudentEmail(email);
        student.setStudentPassword(password);

        studentInfoService.registerStudent(student);
        emailService.removeCode(email); // 删除已使用的验证码
        return Result.success("Registration successful");
    }

    // 发送重置密码验证码到邮箱
    @PostMapping("/forgotpassword/sendcode")
    public Result sendResetPasswordCode(@RequestBody Map<String, String> request) {
        String email = request.get("studentEmail");

        if (isEmailInvalid(email)) {
            return Result.error("Email is required");
        }

        if (!studentInfoService.isEmailRegistered(email)) {
            return Result.error("Email not registered");
        }

        emailService.sendVerificationCode(email); // 发送验证码
        return Result.success("Verification code sent to email");
    }

    // 验证验证码并重置密码
    @PostMapping("/forgotpassword/reset")
    public Result verifyAndResetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("studentEmail");
        String code = request.get("code");
        String newPassword = request.get("newPassword");

        if (isPasswordResetInputInvalid(email, code, newPassword)) {
            return Result.error("Email, code, and new password are required");
        }

        if (!emailService.verifyCode(email, code)) {
            return Result.error("Invalid or expired verification code");
        }

        studentInfoService.updatePassword(email, newPassword); // 更新密码
        emailService.removeCode(email); // 删除验证码
        return Result.success("Password reset successfully");
    }

    //检查邮箱是否有效
    private boolean isEmailInvalid(String email) {
        return email == null || email.isEmpty();
    }

    //检查注册输入是否有效
    private boolean isRegistrationInputInvalid(String email, String password, String code) {
        return isEmailInvalid(email) || password == null || password.isEmpty() || code == null || code.isEmpty();
    }

    //检查重置密码输入是否有效
    private boolean isPasswordResetInputInvalid(String email, String code, String newPassword) {
        return isEmailInvalid(email) || code == null || code.isEmpty() || newPassword == null || newPassword.isEmpty();
    }

    @PostMapping("/foe-name")
    public Result getCareerInfoByStudentId(@RequestBody Map<String, Object> request) {
        Integer studentId = Integer.parseInt((String) request.get("student_id"));
        List<FoeNameInfo> careerInfo = studentInfoService.getCareerInfoByStudentId(studentId);

        if (careerInfo.isEmpty()) {
            return Result.error("No career information found for student_id: " + studentId);
        }
        return Result.success(careerInfo);
    }


    @PostMapping("/career-info")
    public Result getCareersByUserIdAndFoeCode(@RequestBody Map<String, Object> request) {
        Integer studentId = Integer.parseInt((String) request.get("student_id"));
        String foeCode = (String) request.get("foe_code");

        CareerInfo careers = studentInfoService.getCareersByUserIdAndFoeCode(studentId, foeCode);

        if (careers == null) {
            return Result.error("No career information found for the provided user_id and foe_code");
        }
        return Result.success(careers);
    }


    @PostMapping("/university-info")
    public Result getUniversityAndCourseByStudentIdAndFoeCode(@RequestBody Map<String, Object> request) {
        Integer studentId = Integer.parseInt((String) request.get("student_id"));
        String foeCode = (String) request.get("foe_code");

        List<UniversityInfo> universityInfo = studentInfoService.getUniversityAndCourseByStudentIdAndFoeCode(studentId, foeCode);
        if (universityInfo == null || universityInfo.isEmpty()) {
            return Result.error("No university and course information found for the provided student_id and foe_code");
        }
        return Result.success(universityInfo);
    }

    @GetMapping("/personal-info/{studentId}")
    public Result getStudentPersonalInfo(@PathVariable Integer studentId){
        StudentInfo studentInfo = studentInfoService.getStudentInfoById(studentId);
        if (studentInfo != null) {
            return Result.success(studentInfo);
        } else {
            return Result.error("No such student!");
        }
    }


}
