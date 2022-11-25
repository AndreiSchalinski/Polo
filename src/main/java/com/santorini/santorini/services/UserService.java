package com.santorini.santorini.services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
     
     private static final long EXPIRE_TOKEN_AFTER_MINUTES = 30;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     public String forgotPassword(String email){

          Optional<Usuario> userOptional = Optional.ofNullable(usuarioDAO.buscarUsuarioPorEmail(email));

          if (!userOptional.isPresent()) {
               return "E-mail inválido, não consta na base.";
          }

          Usuario usuario = userOptional.get();
          usuario.setToken(generateToken());
          usuario.setTokenCreationDate(LocalDateTime.now());

          usuario = usuarioDAO.save(usuario);

          return usuario.getToken();
     }

     public String resetPassword(String token, String password){
          Optional<Usuario> usuarioOptional = Optional
          .ofNullable(usuarioDAO.buscarUsuarioPorToke(token));

          if (!usuarioOptional.isPresent()) {
               return "Token de usuário é inválido.";
          }

          LocalDateTime tokeCreationDate = usuarioOptional.get().getTokenCreationDate();

          if (isTokenExpired(tokeCreationDate)) {
               return "Token expirado.";
          }

          Usuario usuario = usuarioOptional.get();

          usuario.setPassword(password);
          usuario.setToken(null);
          usuario.setTokenCreationDate(null);

          usuarioDAO.save(usuario);

          return "Sua senha foi redefina com sucesso.";

     }

     private String generateToken(){

          StringBuilder token = new StringBuilder();

          return token.append(UUID.randomUUID().toString()).append(UUID.randomUUID().toString()).toString();
     }

     private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

		LocalDateTime now = LocalDateTime.now();
		Duration diff = Duration.between(tokenCreationDate, now);

		return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
	}

}
