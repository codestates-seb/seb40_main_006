//package com.jamit.auth.filter;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jamit.exception.BusinessLogicException;
//import com.jamit.response.ErrorResponse;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.security.SignatureException;
//import java.io.IOException;
//import java.util.Map;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Slf4j
//@Component
//public class ExceptionHandlerFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//        FilterChain filterChain) throws ServletException, IOException {
//        try {
//            filterChain.doFilter(request, response);
//        } catch (BusinessLogicException exception) {
//            System.out.println("인증, 인가 중 예외 발생");
//            setErrorResponse(exception, response);
//        }
//    }
//
//    private void setErrorResponse(BusinessLogicException exception, HttpServletResponse response) {
//        response.setStatus(exception.getExceptionCode().getStatus());
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        ErrorResponse errorResponse = ErrorResponse.of(exception.getExceptionCode());
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            String json = objectMapper.writeValueAsString(errorResponse);
//            response.getWriter().write(json);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//}
