package com.santorini.santorini.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceVideoAula;
import com.santorini.santorini.services.ServiceArquivosCurso;
import com.santorini.santorini.services.ServiceCrudDiretorios;

@Controller()
@RequestMapping("/modulo")
public class ControllerModulo {

     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private InterfaceModuloJPA moduloDAO;

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private InterfaceVideoAula videoAulaDAO;

     @Autowired
     private ServiceArquivosCurso serviceArquivosCurso;

     @Autowired
     private ServiceCrudDiretorios crudDiretorios;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar_cursos")
     public ResponseEntity<?> carregarCursos() {

          try {
               List<Curso> listaCurso = cursoDAO.findAll();
               if (listaCurso.isEmpty()) {
                    return ResponseEntity.ok().body(listaCurso.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaCurso);
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar")
     public ResponseEntity<?> carregarModulos() {

          try {
               List<Modulo> listaModulos = moduloDAO.findAll();
               if (listaModulos.isEmpty()) {
                    return ResponseEntity.ok().body(listaModulos.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaModulos);
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
     public ResponseEntity<?> cadastrarModulo(@RequestBody Modulo modulo) {
          try {
               moduloDAO.save(modulo);
               Modulo moduloCriado = moduloDAO.buscarModuloPorNome(modulo.getNome());
               
               boolean confirm = serviceArquivosCurso.criarPastaModulo(moduloCriado);

               if (confirm) {
                    return ResponseEntity.ok().body("Módulo " + modulo.getNome() + " cadastrado com sucesso!");
               } else {
                    return ResponseEntity.ok().body("Erro ao criar arquitetura de pasta para módulo o"
                              + modulo.getNome() + ", contatar suporte!");
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/arquivos/cadastrar")
     public ResponseEntity<?> salvarArquivosModulo(Long idCursoPai, Long idModulo, String tituloVideoAula,
               @RequestParam("videoAula") MultipartFile videoAula,
               @RequestParam("materiaisAula") MultipartFile materiaisAula[]) {

          try {

               String mensagem = "";

               Curso curso = cursoDAO.buscarCursoPorID(idCursoPai);

               Modulo modulo = moduloDAO.buscarModuloPorID(idModulo);

               Aula aula = aulaDAO.buscarAulaPorNome(tituloVideoAula);

               if (curso != null && modulo != null && aula != null) {
                    boolean cadastroModulo = serviceArquivosCurso.salvarArquivosModulo(curso, modulo, aula,
                              videoAula, materiaisAula);

                    if (cadastroModulo) {
                         return ResponseEntity.ok().body("Arquivos inseridos com sucesso!");
                    } else {
                         return ResponseEntity.ok()
                                   .body("Erro ao salvar arquivo na aula de " + tituloVideoAula + ".");
                    }
               } else {
                    mensagem = "Curso, módulo ou aula não existe mais na base.";
                    return ResponseEntity.ok()
                              .body(mensagem);
               }

          } catch (Exception e) {
               System.out.println(e.getLocalizedMessage());
               return ResponseEntity.badRequest().build();
          }

     }
     
     @ResponseBody
     @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
     public ResponseEntity<?> atualizar(@RequestBody Modulo modulo) {

          Modulo moduloBuscado = moduloDAO.buscarModuloPorID(modulo.getIdModulo());

          if (moduloBuscado != null) {
               boolean confirm = crudDiretorios.atualizarDiretorioModulo(modulo);

               if (confirm) {
                    return moduloDAO.findById(modulo.getIdModulo()).map(moduloFiltrado -> {
                         moduloFiltrado.setNome(modulo.getNome());
                         Modulo moduloNovo = moduloDAO.save(moduloFiltrado);
                         return ResponseEntity.ok()
                                   .body("Cadastro do módulo " + moduloNovo.getNome() + " editado com sucesso.");
                    }).orElse(ResponseEntity.ok().body("Erro ao tentar editar cadastro de módulo solicitado!"));
               } else {
                    return ResponseEntity.ok().body("Erro ao atualizar nome de diretório do módulo selecionado.");
               }
          } else {
               return ResponseEntity.ok().body("Módulo não existe mais na base.");
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{id}")
     public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

          Modulo modulo = moduloDAO.buscarModuloPorID(id);

          if (modulo != null) {
               boolean confirm = crudDiretorios.excluirDiretorioModulo(modulo);

               if (confirm) {
                    return moduloDAO.findById(modulo.getIdModulo()).map(moduloFiltrado -> {
                         moduloDAO.delete(moduloFiltrado);
                         return ResponseEntity.ok().body("Módulo excluído com sucesso!");
                    }).orElse(ResponseEntity.ok().body("Módulo não encontrado na base."));
               } else {
                    return ResponseEntity.ok().body("Erro ao excluir módulo selecionado.");
               }
          } else {
               return ResponseEntity.ok().body("Módulo não existe mais armazenado na base!");
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/{id}")
     public ResponseEntity<?> buscarPorID(@PathVariable("id") Long id) {

          if (moduloDAO.findById(id).isEmpty()) {
               return ResponseEntity.ok().body(moduloDAO.findById(id).isEmpty());
          } else {
               return ResponseEntity.ok().body(moduloDAO.findById(id));
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.PUT, value = "/editar/status", consumes = "application/json")
     public ResponseEntity<?> atualizarStatus(@RequestBody Modulo modulo) {

          try {

               if (moduloDAO.findById(modulo.getIdModulo()).isEmpty()) {
                    return ResponseEntity.ok().body(
                              "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
               } else {
                    return moduloDAO.findById(modulo.getIdModulo()).map(moduloListado -> {
                         moduloListado.setIdModulo(moduloListado.getIdModulo());
                         moduloListado.setNome(moduloListado.getNome());
                         moduloListado.setId_curso(moduloListado.getId_curso());
                         moduloListado.setStatus(modulo.getStatus());
                         Modulo moduloAtualizado = moduloDAO.save(moduloListado);
                         return ResponseEntity.ok().body("<p style='font-size:15px;'>Status do curso <strong>"
                                   + moduloAtualizado.getNome() + "</strong> atualizado com sucesso.</p>");
                    }).orElse(ResponseEntity.ok().body("Erro ao alterar status do módulo."));
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/curso/{id}")
     public ResponseEntity<?> buscarPorIDCursoPai(@PathVariable("id") Long id) {

          if (moduloDAO.buscarModulosPorIDCursoPai(id).isEmpty()) {
               return ResponseEntity.ok().body(moduloDAO.buscarModulosPorIDCursoPai(id).isEmpty());
          } else {
               return ResponseEntity.ok().body(moduloDAO.buscarModulosPorIDCursoPai(id));
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/coletar/{nome}")
     public ResponseEntity<?> buscarPorID(@PathVariable("nome") String nome) {

          List<Modulo> listaModulo = moduloDAO.buscarModuloPorFragmento(nome);

          if (listaModulo.isEmpty()) {
               return ResponseEntity.ok().body(listaModulo.isEmpty());
          } else {
               return ResponseEntity.ok().body(listaModulo);
          }

     }

}
