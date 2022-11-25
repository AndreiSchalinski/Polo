package com.santorini.santorini.controller;

import com.santorini.santorini.entidades.Cliente;
import com.santorini.santorini.services.ServiceEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/email")
public class ControllerClienteCompra {

     @Autowired
     private ServiceEmail emailCurso;
     
     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/enviar/solicitar/curso", consumes = "application/json")
     public ResponseEntity<?> enviarEmailSantorini(@RequestBody Cliente cliente){
          try {

               emailCurso.enviarEmail(cliente);

               return ResponseEntity.ok().body("Seu e-mail foi enviado com sucesso, a editora receberá sua solicitação e entrará em contato, obrigado.");
          } catch (Exception e) {
               
               return ResponseEntity.badRequest().build();
          }
     }

}
