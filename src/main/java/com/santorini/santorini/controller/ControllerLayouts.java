package com.santorini.santorini.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.santorini.santorini.entidades.UserToken;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;
import com.santorini.santorini.services.ServiceEmailRedefinirSenha;
import com.santorini.santorini.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerLayouts {

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @Autowired
     private UserService usuarioServico;

     @Autowired
     private ServiceEmailRedefinirSenha serviceRedefinirSenhaEmail;

     @RequestMapping("/login")
     public String login() {

          return "login";
     }

     @RequestMapping("/")
     public String index() {
          return "index";
     }

     @RequestMapping("/admin")
     public String admin() {
          return "admin";
     }

     @RequestMapping("/desativado")
     public String liberarAcesso() {
          return "usuarioDesativado";
     }

     @RequestMapping("/login-error")
     public String loginError(Model model, HttpServletRequest request) {
          request.getSession().invalidate();
          model.addAttribute("usuarioDesativado", "USUÁRIO DESATIVADO");
          return "login";
     }

     @RequestMapping("/success")
     public void loginPageRedirect(HttpServletRequest request, HttpServletResponse response, Authentication authResult,
               HttpSession session)
               throws IOException, ServletException {

          String role = authResult.getAuthorities().toString();

          Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(authResult.getName());

          if (authResult.getName().equals("santor") && role.contains("ADMIN")) {
               response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/admin"));
               session.setAttribute("nome", authResult.getName());
          } else {
               if (role.contains("ADMIN") && !authResult.getName().equals("santor") && usuario.getStatus() != 0) {
                    response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/admin"));
                    session.setAttribute("nome", authResult.getName());
               } else if (role.contains("USER") && !authResult.getName().equals("santor") && usuario.getStatus() != 0) {
                    response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/"));
                    session.setAttribute("nome", authResult.getName());
               }

               if (usuario.getStatus() == 0) {
                    response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/login-error"));
               }
          }
     }

     @RequestMapping("/lembrarSenha")
     public String lembrarSenha() {
          return "lembrarSenha";
     }

     @RequestMapping("/novaSenha")
     public String novaSenha() {
          return "novaSenha";
     }

     @ResponseBody
     @PostMapping("/lembrarme/{email}")
     public ResponseEntity<?> forgotPassword(@PathVariable("email") String emailuser) {

          String response = usuarioServico.forgotPassword(emailuser);

          Usuario usuario = usuarioDAO.buscarUsuarioPorEmail(emailuser);

          if (usuario != null) {
               if (!response.startsWith("Invalid")) {
                    response = "http://santorinicursosonline.com:8080/polo/novaSenha?token=" + response;
               }
     
               try {
                    serviceRedefinirSenhaEmail.enviarEmail(emailuser, response);
                    return ResponseEntity.ok().body("Um e-mail com link para redefinir sua senha foi enviado para você, verificar na caixa de entrada ou lixo eletrônico.");
               } catch (Exception e) {
                    return ResponseEntity.badRequest().build();
               } 
          } else {
               return ResponseEntity.ok().body("Usuário com este e-mail não tem cadastro na plataforma.");
          }

          

          

     }

     @ResponseBody
     @PostMapping("/newpas")
     public ResponseEntity<?> resetPassword(@RequestBody UserToken user) {

          BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

          String mensagem = usuarioServico.resetPassword(user.getToken(), encoder.encode(user.getInfo2()));

          return ResponseEntity.ok().body(mensagem);
     }

}
