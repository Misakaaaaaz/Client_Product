package com.usyd.capstone.student_portal.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 使用 Keys.secretKeyFor() 方法生成一个安全的密钥
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 生成JWT令牌
    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10小时过期
                .signWith(SECRET_KEY) // 使用生成的安全密钥
                .compact();
    }

    // 验证和解析JWT
    public static Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // 使用生成的安全密钥验证
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 从JWT中提取用户名（邮箱）
    public static String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // 检查JWT是否过期
    public static boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
