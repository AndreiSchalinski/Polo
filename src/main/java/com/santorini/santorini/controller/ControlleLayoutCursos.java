package com.santorini.santorini.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.JsonObject;
import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Categoria;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Curso_has_Aluno;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCategoriaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceLiberaCurso;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;

@Controller
@RequestMapping("/cursos")
public class ControlleLayoutCursos {

     private File urlAbsolute = new File(UrlCaminhoPaths.urlAbsolutoMaquina());

     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private InterfaceModuloJPA moduloDAO;

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private InterfaceLiberaCurso curso_has_usuarioDAO;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @Autowired
     private InterfaceCategoriaJPA categoriaDAO;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/cursos")
     public ResponseEntity<?> carregarCursosLayout() {
          try {
               List<Curso> listaCursos = cursoDAO.findAll();

               if (listaCursos.isEmpty()) {
                    return ResponseEntity.ok().body(listaCursos.isEmpty());
               } else {

                    JsonObject json = new JsonObject();
                    List<String> listJson = new ArrayList<>();

                    for (int i = 0; i < listaCursos.size(); i++) {

                         if (listaCursos.get(i).getStatus() == 1) {

                              File imagem = new File(urlAbsolute.getAbsolutePath() + "/" + listaCursos.get(i).getId()
                                        + "/imagem_capa_curso/");

                              json.addProperty("id", listaCursos.get(i).getId());
                              json.addProperty("nome", listaCursos.get(i).getTituloCurso());
                              json.addProperty("arquivo", imagem.listFiles()[0].getName());

                              listJson.add(json.toString());
                         }

                    }
                    return ResponseEntity.ok().body(listJson);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/informacoes/para/compra/{idcurso}")
     public ResponseEntity<?> carregarCursoLayoutCompra(@PathVariable("idcurso") Long idCurso) {
          try {

               Curso curso = cursoDAO.buscarCursoPorID(idCurso);

               if (curso == null) {
                    return ResponseEntity.ok().body("true");
               } else {

                    JsonObject json = new JsonObject();
                    List<String> listJson = new ArrayList<>();

                    if (curso.getStatus() == 1) {
                         File imagem = new File(
                                   urlAbsolute.getAbsolutePath() + "/" + curso.getId() + "/imagem_capa_curso/");

                         json.addProperty("id", curso.getId());
                         json.addProperty("nome", curso.getTituloCurso());
                         json.addProperty("arquivo", imagem.listFiles()[0].getName());
                         json.addProperty("hora", curso.getCargaHoraria());
                         json.addProperty("preco", curso.getPreco());

                         listJson.add(json.toString());
                    }

                    return ResponseEntity.ok().body(listJson);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/cursos/carousell/{idCategoria}")
     public ResponseEntity<?> carregarCursosLayoutCarousel(@PathVariable("idCategoria") Long idCategoria) {
          try {
               List<Curso> listaCursos = cursoDAO.buscarCursosPorCategoriaIdCategoria(idCategoria);

               int index = 0;

               for (int i = 0; i < listaCursos.size(); i++) {
                    if (listaCursos.get(i).getStatus() == 0) {
                         index = index + 1;
                    }
               }

               if (index == listaCursos.size()) {
                    return ResponseEntity.ok().body("true");
               } else {
                    if (listaCursos.isEmpty()) {
                         return ResponseEntity.ok().body(listaCursos.isEmpty());
                    } else {

                         JsonObject json = new JsonObject();
                         List<String> listJson = new ArrayList<>();

                         for (int i = 0; i < listaCursos.size(); i++) {

                              if (listaCursos.get(i).getStatus() == 1) {
                                   File imagem = new File(urlAbsolute.getAbsolutePath() + "/"
                                             + listaCursos.get(i).getId() + "/imagem_capa_curso/");

                                   json.addProperty("id", listaCursos.get(i).getId());
                                   json.addProperty("nome", listaCursos.get(i).getTituloCurso());
                                   json.addProperty("arquivo", imagem.listFiles()[0].getName());
                                   json.addProperty("idCategoria", listaCursos.get(i).getCategoria());
                                   json.addProperty("status", listaCursos.get(i).getStatus());

                                   listJson.add(json.toString());
                              }

                         }

                         return ResponseEntity.ok().body(listJson);
                    }
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/cursos/categorias")
     public ResponseEntity<?> carregarCursosLayoutCategorias() {
          try {

               List<Categoria> listaCategoria = categoriaDAO.buscarCategoriasPorOrdemAlfabetica();

               if (listaCategoria.isEmpty()) {
                    return ResponseEntity.ok().body(listaCategoria.isEmpty());
               } else {

                    JsonObject json = new JsonObject();
                    List<String> listJson = new ArrayList<>();

                    for (int i = 0; i < listaCategoria.size(); i++) {
                         if (listaCategoria.get(i).getStatus() == 1) {

                              json.addProperty("id", listaCategoria.get(i).getId());
                              json.addProperty("nome", listaCategoria.get(i).getNome());

                              listJson.add(json.toString());
                         }
                    }

                    return ResponseEntity.ok().body(listJson);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/cursos/liberados")
     public ResponseEntity<?> carregarCursosLayoutLiberado(HttpSession sessio) {

          Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(sessio.getAttribute("nome").toString());

          List<Curso_has_Aluno> listaCursos = curso_has_usuarioDAO
                    .buscarCursosLiberadosPorIDAluno(usuario.getId());

          if (listaCursos.isEmpty()) {
               return ResponseEntity.ok().body(listaCursos.isEmpty());
          } else {

               JsonObject json = new JsonObject();
               List<String> listJson = new ArrayList<>();

               for (int i = 0; i < listaCursos.size(); i++) {

                    if (listaCursos.get(i).getLiberado() == 1) {

                         File imagem = new File(urlAbsolute + "/" + listaCursos.get(i).getId_curso() + "/imagem_capa_curso/");
                         
                         json.addProperty("id", listaCursos.get(i).getId_curso());
                         json.addProperty("nome", listaCursos.get(i).getNomeCurso());
                         json.addProperty("arquivo", imagem.listFiles()[0].getName());

                         listJson.add(json.toString());
                          
                    }
                     

               }

               return ResponseEntity.ok().body(listJson);

          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/informacoes/curso/{id}")
     public ResponseEntity<?> carregarInformacoesCursos(@PathVariable("id") Long id) {
          try {
               Curso curso = cursoDAO.buscarCursoPorID(id);

               if (curso == null) {
                    return ResponseEntity.ok().body(true);
               } else {
                    return ResponseEntity.ok().body(curso);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/informacoes/modulo/{id}")
     public ResponseEntity<?> carregarInformacoesModulos(@PathVariable("id") Long id) {
          try {

               List<Modulo> listaModulos = moduloDAO.buscarModulosPorIDCursoPai(id);

               if (listaModulos.isEmpty()) {
                    return ResponseEntity.ok().body(true);
               } else {
                    List<Modulo> listaModulosAtivado = new ArrayList<>();

                    for (int i = 0; i < listaModulos.size(); i++) {
                         if (listaModulos.get(i).getStatus() == 1) {
                              Modulo modulo = new Modulo();
                              modulo.setIdModulo(listaModulos.get(i).getIdModulo());
                              modulo.setId_curso(listaModulos.get(i).getId_curso());
                              modulo.setNome(listaModulos.get(i).getNome());
                              modulo.setStatus(listaModulos.get(i).getStatus());
                              listaModulosAtivado.add(modulo);
                         }
                    }

                    return ResponseEntity.ok().body(listaModulosAtivado);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/informacoes/aula/{id}")
     public ResponseEntity<?> carregarInformacoesAulas(@PathVariable("id") Long id) {
          try {

               List<Aula> listaAulas = aulaDAO.buscarTodasAsAulasPorCursoPai(id);

               if (listaAulas.isEmpty()) {
                    return ResponseEntity.ok().body(true);
               } else {

                    List<Aula> listaAulasAtivado = new ArrayList<>();

                    for (int i = 0; i < listaAulas.size(); i++) {

                         if (listaAulas.get(i).getStatus() == 1) {

                              Aula aula = new Aula();

                              aula.setId(listaAulas.get(i).getId());
                              aula.setId_curso(listaAulas.get(i).getId_curso());
                              aula.setId_modulo(listaAulas.get(i).getId_modulo());
                              aula.setNome(listaAulas.get(i).getNome());
                              aula.setStatus(listaAulas.get(i).getStatus());
                              listaAulasAtivado.add(aula);
                         }
                    }

                    return ResponseEntity.ok().body(listaAulasAtivado);
               }
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }
}
