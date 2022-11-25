package com.santorini.santorini.services;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceEmailRedefinirSenha {
     public void enviarEmail(String email, String link) throws MessagingException {

          //gmail gerenciador: centrar.santorini@gmail.com 
          //senha: santor#2022

          //"santorini@santorinieducacionalsantorini.com";
          //Didake34#

          System.out.println("\n\n"+email+"\n\n");

          String gmail = "santorini@santorinieducacionalsantorini.com";
          String passwordEmail ="Didake34#";

          Properties props = System.getProperties();
          props.put("mail.smtp.auth", "true");
          props.put("mail.smtp.host", "smtp.titan.email");
          props.put("mail.smtp.port", "465");
          props.put("mail.smtp.ssl.enable", "true");
          props.put("mail.smtp.starttls.enable", "true");

          Session session = Session.getInstance(props, new javax.mail.Authenticator() {

               protected PasswordAuthentication getPasswordAuthentication() {

                    return new PasswordAuthentication(gmail, passwordEmail);

               }

          });

          session.setDebug(true);

          String css = "'border:2px solid white; border-radius:5px; padding: 10px 10px; background:#030c3a; color:white; text-decoration:none; font-weight:bold; box-shadow:0 5px 10px black;'";

          String informacoesInicioCompra = "<strong>Clique no botão disponível para redefinir sua senha:</strong><br><br>";
          String htmlBotao = "<a href=" + link + " style=" + css + ">REDEFINIR SENHA</a>";
          String informacoesFimCompra = "<br><br><strong>Você terá 30 minutos para redefinir senha, após isso será preciso enviar no seu e-mail nova solicitação de redefinição.</strong><br><br><strong>Att</strong>,<br><br><strong>Editora Santorini.</strong>";

          MimeMessage message = new MimeMessage(session);
          message.setFrom(new InternetAddress(gmail));
          message.setSubject("Redefinição de Senha");
          message.setText(informacoesInicioCompra);
          message.setContent(informacoesInicioCompra + htmlBotao + informacoesFimCompra,
                    "text/html; charset=\"UTF-8\"");

          message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

          Transport transport = session.getTransport("smtps");
          transport.connect("smtp.titan.email", 465, gmail, passwordEmail);
          transport.sendMessage(message, message.getAllRecipients());
          transport.close();

     }
}
