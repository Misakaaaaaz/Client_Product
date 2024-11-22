package com.usyd.capstone.student_portal.pojo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VerificationCode {
    private String email;
    private String code;
    private LocalDateTime generatedTime;

    public VerificationCode(String email, String code, LocalDateTime generatedTime) {
        this.email = email;
        this.code = code;
        this.generatedTime = generatedTime;
    }

    public boolean isExpired() {
        return this.generatedTime.isBefore(LocalDateTime.now().minusMinutes(5)); // 5 分钟有效期
    }
}
