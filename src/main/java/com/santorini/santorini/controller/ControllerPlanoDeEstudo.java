package com.santorini.santorini.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.santorini.santorini.entidades.Plano_De_Estudo;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfacePlanoDeEstudo;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/plano")
public class ControllerPlanoDeEstudo {

     @Autowired
     private InterfacePlanoDeEstudo planoDeEstudoDAO;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
     public ResponseEntity<?> cadastrarPlano(@RequestBody Plano_De_Estudo planoDeEstudo, HttpSession session) {
          try {
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               planoDeEstudo.setIdUsuario(usuario.getId());

               planoDeEstudoDAO.save(planoDeEstudo);

               return ResponseEntity.ok().body("Plano cadastrado com sucesso.");
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar")
     public ResponseEntity<?> carregarPlanoDeEstudo(HttpSession session) {
          try {
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Plano_De_Estudo> listaPlanos = planoDeEstudoDAO.buscarTodosOsPlanoDeEstudosIdUsuario(usuario.getId());

               if (listaPlanos.isEmpty()) {
                    return ResponseEntity.ok().body(listaPlanos.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaPlanos);
               }

               
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{idplano}/{idaluno}")
     public ResponseEntity<?> deletarPlano(@PathVariable("idplano") Long idplano,
               @PathVariable("idaluno") Long idaluno) {
          try {

               Plano_De_Estudo plano = planoDeEstudoDAO.buscarPlanoPorIdplanoIdAluno(idplano, idaluno);

               if (plano == null) {
                    return ResponseEntity.ok().body("Plano não consta mais na base.");
               } else {
                    return planoDeEstudoDAO.findById(plano.getId()).map(planoFiltrado -> {
                         planoDeEstudoDAO.delete(planoFiltrado);
                         return ResponseEntity.ok().body("Plano " + plano.getNome() + " excluido com sucesso.");
                    }).orElse(ResponseEntity.badRequest().build());
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/{idplano}/{idaluno}")
     public ResponseEntity<?> buscarPorIdPlano(@PathVariable("idplano") Long idplano,
               @PathVariable("idaluno") Long idaluno) {
          try {

               Plano_De_Estudo plano = planoDeEstudoDAO.buscarPlanoPorIdplanoIdAluno(idplano, idaluno);

               return ResponseEntity.ok().body(plano);
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
     public ResponseEntity<?> deletarPlano(@RequestBody Plano_De_Estudo planoDeEstudo) {
          try {

               Plano_De_Estudo plano = planoDeEstudoDAO.buscarPlanoPorIdplanoIdAluno(planoDeEstudo.getId(),
                         planoDeEstudo.getIdUsuario());

               if (plano == null) {
                    return ResponseEntity.ok().body("Plano não existe mais na base.");
               } else {
                    return planoDeEstudoDAO.findById(plano.getId()).map(planoFiltrado -> {
                         planoFiltrado.setIdUsuario(plano.getIdUsuario());
                         planoFiltrado.setNome(planoDeEstudo.getNome());
                         planoFiltrado.setDescricao(planoDeEstudo.getDescricao());
                         Plano_De_Estudo planoAtualizado = planoDeEstudoDAO.save(planoFiltrado);
                         return ResponseEntity.ok()
                                   .body("Plano " + planoAtualizado.getNome() + " editado com sucesso.");
                    }).orElse(ResponseEntity.badRequest().build());
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

}
