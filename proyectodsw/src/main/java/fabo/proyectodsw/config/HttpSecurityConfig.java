package fabo.proyectodsw.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import fabo.proyectodsw.util.Permission;

@Component
@EnableWebSecurity
@EnableMethodSecurity
public class HttpSecurityConfig {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authConfig -> {
                    authConfig.requestMatchers(HttpMethod.POST, "/auth/login").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/auth/public-access").permitAll();
                    authConfig.requestMatchers( "/message/**").permitAll();
                    authConfig.requestMatchers( "/uemail/**").permitAll();
                    authConfig.requestMatchers("/error").permitAll();
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/user/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/user/**").hasAuthority(Permission.READ_ALL_USERS.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/user/save").hasAuthority(Permission.READ_ALL_USERS.name());
                    authConfig.requestMatchers(HttpMethod.GET, "/api/product/**").hasAuthority(Permission.READ_ALL_PRODUCTS.name());
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/product/update").hasAuthority(Permission.UPDATE_ONE_PRODUCT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/product/saveorupdate").hasAuthority(Permission.SAVE_ONE_PRODUCT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/inputs/save").hasAuthority(Permission.SAVE_INPUT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/inputDetail/save").hasAuthority(Permission.SAVE_INPUT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/outputs/save").hasAuthority(Permission.SAVE_OUTPUT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/outputDetail/save").hasAuthority(Permission.SAVE_OUTPUT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/product/stockOutput").hasAuthority(Permission.SAVE_OUTPUT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/employee/save").hasAuthority(Permission.SAVE_EMPLOYEE.name());
                    authConfig.requestMatchers(HttpMethod.GET, "/api/employee/**").hasAuthority(Permission.READ_ALL_EMPLOYEES.name());
                    authConfig.requestMatchers(HttpMethod.GET, "/api/provider/**").hasAuthority(Permission.READ_ALL_PROVIDERS.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/provider/**").hasAuthority(Permission.READ_ALL_PROVIDERS.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/providerProduct/**").hasAuthority(Permission.READ_ALL_PROVIDERS.name());
                });
        return http.build();
    }

}
