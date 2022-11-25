package com.santorini.santorini.services;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.interfacesJPAdao.InterfaceVideoAula;

@Component
public class ServiceVideosArquivos {

     @Autowired
     private InterfaceVideoAula videoAulaDAO;

     private File urlAbsolute = new File(
               UrlCaminhoPaths.urlAbsolutoMaquina());

     public String buscarNomeVideo(Aula aula, Modulo modulo, Curso curso) {
          try {

               File videoAula = new File(urlAbsolute.getAbsolutePath() + "/" + curso.getId() + "/modulos/"
                         + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/video/");

               return videoAula.listFiles()[0].getName();

          } catch (Exception e) {
               return "false";
          }
     }

     public void downloadFile(HttpServletRequest request ,String nomeVideo, Aula aula, Modulo modulo, Curso curso, HttpServletResponse response)
               throws IOException {
          
           Path url = Paths.get(urlAbsolute.getAbsolutePath()+ "/"+ curso.getId() +
           "/modulos/" + modulo.getIdModulo()+ "/aulas/" + aula.getId() + "/video/" +
           nomeVideo);
            
          File arquivo = new File(urlAbsolute.getAbsolutePath() + "/" + curso.getId() +
                 "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/video/" +
                  nomeVideo);

          

          String nome = arquivo.getName();
          int tamanho = (int) arquivo.length();

          response.setContentType("image/png"); // tipo do conteúdo
          response.setContentLength(tamanho); // opcional
          response.setHeader("Content-Disposition", "attachment; filename=\"nome\"");

          
          OutputStream output = response.getOutputStream();
          Files.copy(url, output);
      

     }

     public List<String> buscarNomeMateriais(Aula aula, Modulo modulo, Curso curso) {

          List<String> listaArquivos = new ArrayList<>();

          try {

               File materiaisAula = new File(urlAbsolute.getAbsolutePath() + "/" + curso.getId() + "/modulos/"
                         + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/materiais/");

               for (int i = 0; i < materiaisAula.listFiles().length; i++) {

                    listaArquivos.add(materiaisAula.listFiles()[i].getName());
               }
               return listaArquivos;

          } catch (Exception e) {

               e.getLocalizedMessage();
          }
          return listaArquivos;
     }

     public void downloadMateriais(String nomeMaterial, Aula aula, Modulo modulo, Curso curso,
               HttpServletResponse response)
               throws IOException {

          Path url = Paths.get(urlAbsolute.getAbsolutePath() + "/" + curso.getId() + "/modulos/" + modulo.getIdModulo()
                    + "/aulas/" + aula.getId() + "/materiais/" + nomeMaterial);

          File arquivo = new File(urlAbsolute.getAbsolutePath() + "/" + curso.getId() + "/modulos/" + modulo.getIdModulo()
          + "/aulas/" + aula.getId() + "/materiais/" + nomeMaterial);

          String nome = arquivo.getName();
          int tamanho = (int) arquivo.length();

          //response.setContentType("image/png"); // tipo do conteúdo
          response.setContentLength(tamanho); // opcional
          response.setHeader("Content-Disposition", "attachment; filename=\"nome\"");

          
          OutputStream output = response.getOutputStream();
          Files.copy(url, output);

     }

}
