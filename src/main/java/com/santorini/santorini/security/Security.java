package com.santorini.santorini.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

     @Bean
     public BCryptPasswordEncoder passwordEncoder() {
          return new BCryptPasswordEncoder();
     }

     @Autowired
     private DataSource dataSource;

     @Override
     protected void configure(HttpSecurity http) throws Exception {
          http
                    .authorizeRequests()
                    .antMatchers("/").hasAuthority("USER")
                    .antMatchers("/admin").hasAuthority("ADMIN")
                    .antMatchers("/lembrarSenha").permitAll()
                    .antMatchers("/novaSenha").permitAll()
                    .antMatchers("/lembrarme/{email}").permitAll()
                    .antMatchers("/newpas").permitAll()
                    .antMatchers("/estilizacao/**", "/script/**", "/script_restfull/**", "/imagens/**",
                              "/modal_telas/**", "/cursos_em_andamento/**","/script-carregar-cursos/**")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                    .and()
                    .formLogin().loginPage("/login").permitAll()
                    .defaultSuccessUrl("/success", true)
                    .and()
                    .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/login")
                    .permitAll();

                    http.csrf().disable();
                    http.headers().frameOptions().disable();

     }

     @Override
     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
          /*
          auth.inMemoryAuthentication()
                    .withUser("andrei").password(passwordEncoder().encode("123")).authorities("ADMIN")
                    .and()
                    .withUser("user").password(passwordEncoder().encode("123")).authorities("USER");
         */
        
                    auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(new BCryptPasswordEncoder()).usersByUsernameQuery("select username,password,'true' as enabled from usuario where username = ? ")
                    .authoritiesByUsernameQuery("select username,authority "
                            + " from autoridade "
                            + "where username = ? ");
          
                    auth.inMemoryAuthentication().withUser("santor").password(passwordEncoder().encode("santor")).authorities("ADMIN");
           
     }

     

}
