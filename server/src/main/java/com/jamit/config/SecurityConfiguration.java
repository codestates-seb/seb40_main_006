package com.jamit.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.jamit.auth.filter.JwtAuthenticationFilter;
import com.jamit.auth.filter.JwtVerificationFilter;
import com.jamit.auth.handler.MemberAccessDeniedHandler;
import com.jamit.auth.handler.MemberAuthenticationEntryPoint;
import com.jamit.auth.handler.MemberAuthenticationFailureHandler;
import com.jamit.auth.handler.MemberAuthenticationSuccessHandler;
import com.jamit.auth.jwt.JwtTokenizer;
import com.jamit.auth.utils.CustomAuthorityUtils;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers().frameOptions().sameOrigin()
            .and()
            .csrf().disable()
            .cors(withDefaults())
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 무상태
            .and()
            .formLogin().disable()
            .httpBasic().disable()
            .exceptionHandling() // 예외 처리 지정
            .authenticationEntryPoint(new MemberAuthenticationEntryPoint()) // 401 unauthorized error
            .accessDeniedHandler(new MemberAccessDeniedHandler()) // 403 Forbidden error
            .and()
            .apply(new CustomFilterConfigurer()) // Custom Configurer 추가
            .and()
            .authorizeHttpRequests(authorize -> authorize
                .antMatchers(HttpMethod.POST, "/*/user/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/*/user/login").permitAll()
                .antMatchers(HttpMethod.POST, "/*/user/**").hasRole("USER")
//                .antMatchers("/**").authenticated()
                .anyRequest().permitAll()
            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Custom JwtAuthenticationFilter 를 등록하는 Custom Configurer
     */
    public class CustomFilterConfigurer extends
        AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // AuthenticationManager 객체를 얻음
            AuthenticationManager authenticationManager = builder.getSharedObject(
                AuthenticationManager.class);

            // JwtAuthenticationFilter 를 생성하며 필요한 AuthenticationManager 와 jwtTokenizer 를 DI
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(
                authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login"); // default URL 지정
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,
                authorityUtils);

            builder // Security Filter Chain 에 추가
                .addFilter(jwtAuthenticationFilter) // JWT 인증 필터
                .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); // JWT 검증 필터
        }
    }

}