package com.usyd.capstone.student_portal.filter;

import com.usyd.capstone.student_portal.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt = null;


//        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
//            sendErrorResponse(response, HttpServletResponse.SC_BAD_REQUEST, "Authorization header is missing or incorrect");
//            return;
//        }
//
//        jwt = authorizationHeader.substring(7).trim();  // 去掉 Bearer 后的空白字符
//
//        if (jwt.isEmpty()) {
//            sendErrorResponse(response, HttpServletResponse.SC_BAD_REQUEST, "Token is missing");
//            return;
//        }

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                email = JwtUtil.extractEmail(jwt); // 从JWT中提取email
            } catch (ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token has expired");
                return;
            } catch (SecurityException | IllegalArgumentException e) { // 使用 SecurityException 替换 SignatureException
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token");
                return;
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Authentication error: " + e.getMessage());
                return;
            }
        }
        // 验证 JWT 并设置到 Spring Security 上下文
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (!JwtUtil.isTokenExpired(jwt)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        email, null, null);
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token has expired");
                return;
            }
        }

        // 继续处理下一个过滤器
        filterChain.doFilter(request, response);
    }

    // 自定义错误响应，返回 JSON 格式
    private void sendErrorResponse(HttpServletResponse response, int statusCode, String message) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 构造 JSON 错误消息
        String jsonResponse = String.format("{\"code\": %d, \"message\": \"%s\"}", statusCode, message);
        response.getWriter().write(jsonResponse);
    }
}
