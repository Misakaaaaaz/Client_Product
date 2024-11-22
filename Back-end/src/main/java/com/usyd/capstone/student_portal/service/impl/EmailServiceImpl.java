package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.pojo.VerificationCode;
import com.usyd.capstone.student_portal.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // 用于存储验证码信息
    private Map<String, VerificationCode> verificationCodes = new HashMap<>();

    // 生成验证码
    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);  // 生成 6 位数字验证码
        return String.valueOf(code);
    }

    // 发送验证码邮件
    @Override
    public void sendVerificationCode(String email) {
        String code = generateVerificationCode();
        VerificationCode verificationCode = new VerificationCode(email, code, LocalDateTime.now());
        verificationCodes.put(email, verificationCode);  // 存储验证码

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Email Verification Code");
        message.setText("Your verification code is: " + code + "\nThe verification code is valid for 5 minutes.");

        try {
            mailSender.send(message);
            System.out.println("Verification code sent to: " + email);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }


    // 验证验证码
    @Override
    public boolean verifyCode(String email, String code) {
        VerificationCode storedCode = verificationCodes.get(email);
        if (storedCode == null) {
            return false; // 没有找到验证码
        }
        // 检查验证码是否匹配和是否在有效期内（5分钟）
        return storedCode.getCode().equals(code) &&
                storedCode.getGeneratedTime().isAfter(LocalDateTime.now().minusMinutes(5));
    }

    // 删除已验证的验证码
    @Override
    public void removeCode(String email) {
        verificationCodes.remove(email);
    }
}
