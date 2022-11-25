package com.santorini.santorini.controller;

import javax.servlet.http.HttpServletResponse;

import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.services.ServiceArquivosCurso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/arquivos/cursos/disponivel")
public class ControllerArquivosCursos {
     
     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private ServiceArquivosCurso arquivoDAO;
     
     @RequestMapping(method = RequestMethod.GET, value = "/imagens/cursos/{id}/{nome}/{arquivo}")
     public void buscarImagensCursoDispoível(@PathVariable("id") Long id, @PathVariable("nome") String nome,@PathVariable("arquivo") String arquivo, HttpServletResponse response){
          try {

               Curso curso = cursoDAO.buscarCursoPorID(id);
               
               if (arquivo.equals("info") && nome.equals("info")){
                    
                    arquivoDAO.buscarImagensCapaCursosInfo(curso.getId(), response);
               } else {
                    arquivoDAO.buscarImagensCapaCursos(curso.getId(),arquivo,response);
               }

               

          } catch (Exception e) {
               e.getMessage();
          }
     }

     @RequestMapping(method = RequestMethod.GET, value = "/imagens/cursos/abertura/{id}/{nome}/{arquivo}")
     public void buscarImagensAberturaCursoDispoível(@PathVariable("id") Long id, @PathVariable("nome") String nome,@PathVariable("arquivo") String arquivo, HttpServletResponse response){
          try {

               Curso curso = cursoDAO.buscarCursoPorID(id);
               
               if (arquivo.equals("info") && nome.equals("info")){
                    
                    arquivoDAO.buscarImagensAberturaCursosInfo(curso.getId(), response);
               } else {
                    arquivoDAO.buscarImagensCapaCursos(curso.getId(),arquivo,response);
               }

               

          } catch (Exception e) {
               e.getMessage();
          }
     }

     @RequestMapping(method = RequestMethod.GET, value = "/imagens/cursos/atividade/{idcurso}")
     public void buscarImagensCursoDispoível(@PathVariable("idcurso") Long id, HttpServletResponse response){
          try {
               
               Curso curso = cursoDAO.buscarCursoPorID(id);
               
               arquivoDAO.buscarImagensCapaCursosAtividade(curso.getId(), response);

          } catch (Exception e) {
               e.getMessage();
          }
     }

}
