package com.santorini.santorini.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;
import com.santorini.santorini.services.ServiceVideosArquivos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/arquivos")
public class ControllerVideo {

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private InterfaceModuloJPA moduloDAO;

     @Autowired
     private ServiceVideosArquivos videoService;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/video/carregar/{id}")
     public ResponseEntity<?> carregarVideos(@PathVariable("id") Long id) {
          try {

               Aula aula = aulaDAO.buscarAulaPorId(id);
               Modulo modulo = moduloDAO.buscarModuloPorID(aula.getId_modulo());
               Curso curso = cursoDAO.buscarCursoPorID(aula.getId_curso());

               String nomeVideo = videoService.buscarNomeVideo(aula, modulo, curso);

               return ResponseEntity.ok().body(nomeVideo);

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @RequestMapping(method = RequestMethod.GET, value = "/video/carregar/download/bytes/{cod_aula}/{nomeVideo}")
     public void downloadFile(@PathVariable("cod_aula") Long id, @PathVariable("nomeVideo") String nomeVideo,HttpServletRequest request, HttpServletResponse response) {

          try {
               Aula aula = aulaDAO.buscarAulaPorId(id);

               Modulo modulo = moduloDAO.buscarModuloPorID(aula.getId_modulo());

               Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

               videoService.downloadFile(request,nomeVideo, aula, modulo, curso, response);
               
          } catch (Exception e) {
               
          }

     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/materiais/carregar/{id}")
     public ResponseEntity<?> carregarMateriais(@PathVariable("id") Long id) {
          try {

               Aula aula = aulaDAO.buscarAulaPorId(id);
               Modulo modulo = moduloDAO.buscarModuloPorID(aula.getId_modulo());
               Curso curso = cursoDAO.buscarCursoPorID(aula.getId_curso());

               List<String> listaMateriais = videoService.buscarNomeMateriais(aula, modulo, curso);

               if (listaMateriais.isEmpty()) {
                    return ResponseEntity.ok().body(listaMateriais.isEmpty());
               } else {
                    return ResponseEntity.ok().body(listaMateriais); 
               }    

          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @RequestMapping(method = RequestMethod.GET, value = "/materiais/carregar/download/bytes/{cod_aula}/{nomeMateriail}")
     public void downloadMateriais(@PathVariable("cod_aula") Long id, @PathVariable("nomeMateriail") String nomeMateriail, HttpServletResponse response) {

          try {
               Aula aula = aulaDAO.buscarAulaPorId(id);

               Modulo modulo = moduloDAO.buscarModuloPorID(aula.getId_modulo());

               Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

               videoService.downloadMateriais(nomeMateriail, aula, modulo, curso, response);
               
          } catch (Exception e) {
               
          }

     }

}
