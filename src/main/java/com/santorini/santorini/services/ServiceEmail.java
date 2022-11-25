package com.santorini.santorini.services;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.santorini.santorini.entidades.Cliente;
import com.santorini.santorini.entidades.EmailMensageria;

import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceEmail {

     public void enviarEmail(Cliente cliente) throws MessagingException {

          //gmail gerenciador: centrar.santorini@gmail.com 
          //senha: santor#2022

          //"santorini@santorinieducacionalsantorini.com";
          //Didake34#

          String gmail = "santorini@santorinieducacionalsantorini.com";
          String passwordEmail ="Didake34#";
          //String gmailReceptorParaVendas = "santorini.educacional@gmail.com";
          String gmailReceptorParaVendas = EmailMensageria.emailMensagensSantorini();

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

               String informacoesCompra = "DADOS DO CLIENTE:\n\n";

               informacoesCompra += "NOME COMPLETO: "+cliente.getNomeCompleto()+".\n"+
               "CPF: "+cliente.getCpf()+".\nENDEREÇO: "+cliente.getEndereco()+".\nE-MAIL: "+cliente.getEmail()+".\nTELEFONE: "+cliente.getTelefone()+".\n\nSOLICITAÇÃO DO CLIENTE: \n\n"+cliente.getTexto()+".";

               MimeMessage message = new MimeMessage(session);
               message.setFrom(new InternetAddress(gmail));
               message.setSubject("Soliciatação de Compra do Curso para "+cliente.getNomeCompleto());
               message.setText(informacoesCompra);
               message.addRecipient(Message.RecipientType.TO, new InternetAddress(gmailReceptorParaVendas));

               Transport transport = session.getTransport("smtps");
               transport.connect("smtp.titan.email", 465, gmail, passwordEmail);
               transport.sendMessage(message, message.getAllRecipients());
               transport.close();

     }

}
