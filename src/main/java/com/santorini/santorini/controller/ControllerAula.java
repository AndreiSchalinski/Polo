package com.santorini.santorini.controller;

import java.util.List;



import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.services.ServiceArquivosCurso;
import com.santorini.santorini.services.ServiceCrudDiretorios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/aula")
public class ControllerAula {

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private ServiceArquivosCurso serviceArquivosCurso;

     @Autowired
     private ServiceCrudDiretorios crudDiretorios;

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
     public ResponseEntity<?> cadastrarAula(@RequestBody Aula aula) {
          try {

               aulaDAO.save(aula);

               serviceArquivosCurso.criarPastaAula(aula);

               return ResponseEntity.ok().body(true);

          } catch (Exception e) {
               return ResponseEntity.ok().body(false);
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/{id}")
     public ResponseEntity<?> buscarTodasAulas(@PathVariable("id") Long id_modulo) {
          
          try {

               List<Aula> listaAulas = aulaDAO.buscarTodasAsAulasPorModuloPai(id_modulo);

               if (listaAulas.isEmpty()) {
                    return ResponseEntity.ok().body(listaAulas.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaAulas);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
     public ResponseEntity<?> atualizar(@RequestBody Aula aula) {

          Aula aulaBuscado = aulaDAO.buscarAulaPorId(aula.getId());

          if (aulaBuscado != null) {
               boolean confirm = crudDiretorios.atualizarDiretorioAula(aula);

               if (confirm) {
                    return aulaDAO.findById(aula.getId()).map(aulaFiltrado -> {
                         aulaFiltrado.setNome(aula.getNome());
                         aulaFiltrado.setResumo(aula.getResumo());
                         Aula aulaNovo = aulaDAO.save(aulaFiltrado);
                         return ResponseEntity.ok()
                                   .body("Cadastro da aula " + aulaNovo.getNome() + " editado com sucesso.");
                    }).orElse(ResponseEntity.ok().body("Erro ao tentar editar cadastro de aula solicitado!"));
               } else {
                    return ResponseEntity.ok().body("Erro ao atualizar nome de aula selecionada.");
               }
          } else {
               return ResponseEntity.ok().body("Aula não existe mais na base.");
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/{id}")
     public ResponseEntity<?> buscarPorID(@PathVariable("id") Long id) {

          if (aulaDAO.findById(id).isEmpty()) {
               return ResponseEntity.ok().body(aulaDAO.findById(id).isEmpty());
          } else {
               return ResponseEntity.ok().body(aulaDAO.findById(id));
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{id}")
     public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

          Aula aula = aulaDAO.buscarAulaPorId(id);

          if (aula != null) {
               boolean confirm = crudDiretorios.excluirDiretorioAula(aula);

               if (confirm) {
                    return aulaDAO.findById(aula.getId()).map(aulaFiltrado -> {
                         aulaDAO.delete(aulaFiltrado);
                         return ResponseEntity.ok().body("Aula excluída com sucesso!");
                    }).orElse(ResponseEntity.ok().body("Aula não encontrada na base."));
               } else {
                    return ResponseEntity.ok().body("Erro ao excluir aula selecionada.");
               }
          } else {
               return ResponseEntity.ok().body("Aula não existe mais armazenada na base!");
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.PUT, value = "/editar/status", consumes = "application/json")
     public ResponseEntity<?> atualizarStatus(@RequestBody Aula aula) {

          try {

               if (aulaDAO.findById(aula.getId()).isEmpty()) {
                    return ResponseEntity.ok().body(
                              "<p style='font-size:15px;'>Cadastro de aula não existe, <strong>verificar com editora</strong>.</p>");
               } else {
                    return aulaDAO.findById(aula.getId()).map(aulaListado -> {
                         aulaListado.setId(aulaListado.getId());
                         aulaListado.setNome(aulaListado.getNome());
                         aulaListado.setResumo(aulaListado.getResumo());
                         aulaListado.setId_modulo(aulaListado.getId_modulo());
                         aulaListado.setId_curso(aulaListado.getId_curso());
                         aulaListado.setStatus(aula.getStatus());
                         Aula aulaAtualizado = aulaDAO.save(aulaListado);
                         return ResponseEntity.ok().body("<p style='font-size:15px;'>Status do curso <strong>"
                                   + aulaAtualizado.getNome() + "</strong> atualizado com sucesso.</p>");
                    }).orElse(ResponseEntity.ok().body("Erro ao alterar status do módulo."));
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

}
