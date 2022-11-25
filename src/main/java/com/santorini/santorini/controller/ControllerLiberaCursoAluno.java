package com.santorini.santorini.controller;

import java.util.List;

import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Curso_has_Aluno;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceLiberaCurso;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/permissao")
public class ControllerLiberaCursoAluno {

     @Autowired
     private InterfaceLiberaCurso curso_has_alunoDAO;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @Autowired
     private InterfaceCursoJPA cursoDAO;
     
     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/{id}")
     public ResponseEntity<?> carregaAcessoCurso(@PathVariable("id") Long idAluno){

          try {
               List<Curso_has_Aluno> listaCursosLiberados = curso_has_alunoDAO.buscarCursosLiberadosPorIDAluno(idAluno);

               if (listaCursosLiberados.isEmpty()) {
                    return ResponseEntity.ok().body(listaCursosLiberados.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaCursosLiberados);
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/curso/liberado/buscar/{idusuario}/{idcurso}")
     public ResponseEntity<?> buscarAcessoCurso(@PathVariable("idusuario") Long iduser, @PathVariable("idcurso") Long idcurso){

          try {
               Curso_has_Aluno cursoLiberadoListado = curso_has_alunoDAO.buscarCursoLiberadoPosIdCursoIdAluno(iduser, idcurso);

               if (cursoLiberadoListado == null) {
                    return ResponseEntity.ok().body(true);
               } else {
                    return ResponseEntity.ok().body(cursoLiberadoListado);
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/curso/liberado/salvar/{idcurso}/{idusuario}/{status}")
     public ResponseEntity<?> liberarAcessoCurso(@PathVariable("idcurso") Long idCurso,@PathVariable("idusuario") Long idAluno ,@PathVariable("status") Integer status){
     
          try {
               //método está ok
               Usuario usuario = usuarioDAO.buscarUsuarioPorID(idAluno);
               Curso curso = cursoDAO.buscarCursoPorID(idCurso);

               Curso_has_Aluno cursoLiberadoListado = curso_has_alunoDAO.buscarCursoLiberadoPosIdCursoIdAluno(idAluno, idCurso);

               if (cursoLiberadoListado == null) {
                    
                    curso_has_alunoDAO.save(new Curso_has_Aluno(curso.getTituloCurso(), curso.getId(), usuario.getId(),status));
                    return ResponseEntity.ok().body("Usuário está liberado para fazer curso.");
               } else {
                    
                    return curso_has_alunoDAO.findById(cursoLiberadoListado.getId()).map(cursoLiberado -> {
                         cursoLiberado.setId_curso(curso.getId());
                         cursoLiberado.setId_usuario(usuario.getId());
                         cursoLiberado.setNomeCurso(curso.getTituloCurso());
                         cursoLiberado.setLiberado(status);

                         curso_has_alunoDAO.save(cursoLiberado);
                         
                         return ResponseEntity.ok().body("Acesso de "+usuario.getNome()+" ao curso "+curso.getTitulo()+" atualizado.");
                    }).orElse(ResponseEntity.ok().body("Problema ao atualizar acesso ao curso para usuário."));
               }

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }

     }

}
