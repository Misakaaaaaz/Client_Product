package com.usyd.capstone.student_portal.service;

public interface EmailService {
    void sendVerificationCode(String email);
    boolean verifyCode(String email, String code);
    void removeCode(String email);
}
