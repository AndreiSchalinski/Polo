package com.santorini.santorini.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso_has_Aluno;
import com.santorini.santorini.entidades.Progresso_Aula;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceLiberaCurso;
import com.santorini.santorini.interfacesJPAdao.InterfaceProgressoAula;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/progresso")
public class ControllerAndamentoProgressoAula {

     private File urlAbsolute = new File(UrlCaminhoPaths.urlAbsolutoMaquina());

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @Autowired
     private InterfaceProgressoAula aulaProgressoDAO;

     @Autowired
     private InterfaceLiberaCurso curso_has_usuarioDAO;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/curso/salvar/{idaula}")
     public ResponseEntity<?> salvarProgressoAula(@PathVariable("idaula") Long idaula, HttpSession session){
          try {
               
               Aula aula = aulaDAO.buscarAulaPorId(idaula);

               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               double totalAulas = aulaProgressoDAO.buscarTotalCursosIniciado(aula.getId_curso(), usuario.getId());

               double aulasConcluidas = aulaProgressoDAO.buscarTotalCursosFinalizados(aula.getId_curso(), usuario.getId());

               double resultado = ((aulasConcluidas/totalAulas)*100);

               return ResponseEntity.ok().body(Math.round(resultado));

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/cursos/carregar/cursos/concluidos")
     public ResponseEntity<?> buscarCursosConcluidosPorUsuario(HttpSession session){
          try {
               
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Progresso_Aula> listaCursosConcluidos = aulaProgressoDAO.buscarTodosOsCursosConcluidos(usuario.getId());

               List<Curso_has_Aluno> listaCursos = curso_has_usuarioDAO.buscarCursosLiberadosPorIDAluno(usuario.getId());

               if (listaCursosConcluidos.isEmpty()) {
                    return ResponseEntity.ok().body(listaCursosConcluidos.isEmpty());
               } else {

                    JsonObject json = new JsonObject();
                    List<String> listJson = new ArrayList<>();

                    for (int i = 0; i < listaCursos.size(); i++) {

                         for (int j = 0; j < listaCursosConcluidos.size(); j++) {
                          
                              if (listaCursos.get(i).getId_curso() == listaCursosConcluidos.get(j).getIdCurso()) {
                                   
                                   File imagem = new File(urlAbsolute + "/"+ listaCursos.get(i).getId_curso() + "/imagem_capa_curso/");
     
                                   json.addProperty("id", listaCursos.get(i).getId_curso());
                                   json.addProperty("nome", listaCursos.get(i).getNomeCurso());
                                   json.addProperty("arquivo", imagem.listFiles()[0].getName());
     
                                   listJson.add(json.toString());
                                   
                              }

                         }
                    }
                    return ResponseEntity.ok().body(listJson);
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/cursos/carregar/cursos/fazendo")
     public ResponseEntity<?> buscarCursosEmAndamentoPorUsuario(HttpSession session){

          Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Progresso_Aula> listaCursosEmAndamento = aulaProgressoDAO.buscarTodosOsCursosConcluidos(usuario.getId());

               List<Curso_has_Aluno> listaCursos = curso_has_usuarioDAO.buscarCursosLiberadosPorIDAluno(usuario.getId());

               
          
               if (listaCursosEmAndamento.isEmpty()) {
                    
                    return ResponseEntity.ok().body(listaCursosEmAndamento.isEmpty());
               } else {
                    
                    JsonObject json = new JsonObject();
                    List<String> listJson = new ArrayList<>();

                    for (int i = 0; i < listaCursos.size(); i++) {

                         for (int j = 0; j < listaCursosEmAndamento.size(); j++) {
                          
                              if (listaCursos.get(i).getId_curso() == listaCursosEmAndamento.get(j).getIdCurso()) {
                                   
                                   File imagem = new File(urlAbsolute+ "/"+ listaCursos.get(i).getId_curso() + "/imagem_capa_curso/");
     
                                   json.addProperty("id", listaCursos.get(i).getId_curso());
                                   json.addProperty("nome", listaCursos.get(i).getNomeCurso());
                                   json.addProperty("arquivo", imagem.listFiles()[0].getName());
     
                                   listJson.add(json.toString());
                                   
                              }

                         }
                    }
                    return ResponseEntity.ok().body(listJson);
               }
          
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/curso/buscar/progresso/{idcurso}")
     public ResponseEntity<?> salvarProgressoCurso(@PathVariable("idcurso") Long idcurso, HttpSession session){
          try {
          
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               double totalAulas = aulaProgressoDAO.buscarTotalCursosIniciado(idcurso, usuario.getId());

               double aulasConcluidas = aulaProgressoDAO.buscarTotalCursosFinalizados(idcurso, usuario.getId());

               double resultado = ((aulasConcluidas/totalAulas)*100);

               return ResponseEntity.ok().body(Math.round(resultado));

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

}
