package com.santorini.santorini.services;

import java.io.File;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;

@Component
public class ServiceCrudDiretorios {

     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private InterfaceModuloJPA moduloJPA;

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     private File diretorios = new File("");

     private File urlAbsolute = new File(UrlCaminhoPaths.urlAbsolutoMaquina());

     public boolean atualizarDiretorioCurso(Long id, String tituloCurso) {

          try {

               Curso curso = cursoDAO.buscarCursoPorID(id);

               File diretorio = new File(urlAbsolute+"/"+curso.getId());

               Curso cursoBuscado = cursoDAO.buscarCurosPorNome(tituloCurso);

               File diretorioRename = new File(urlAbsolute+"/"+cursoBuscado.getId());

               return diretorio.renameTo(diretorioRename);

          } catch (Exception e) {
               return true;
          }

     }

     public boolean atualizarDiretorioModulo(Modulo moduloAtualizado) {

          try {

               Curso curso = cursoDAO.buscarCursoPorID(moduloAtualizado.getId_curso());

               Modulo moduloFiltrado = moduloJPA.buscarModuloPorID(moduloAtualizado.getIdModulo());

               File diretorio = new File(urlAbsolute+"/"+curso.getId() + "/modulos/"+moduloFiltrado.getIdModulo());

               File diretorioRename = new File(urlAbsolute+"/"+curso.getId() + "/modulos/"+moduloAtualizado.getIdModulo());

               return diretorio.renameTo(diretorioRename);

          } catch (Exception e) {
               return false;
          }

     }

     public boolean excluirDiretorioCurso(Long id) {

          try {

               List<Aula> listaAula = aulaDAO.buscarTodasAsAulasPorCursoPai(id);

               for (int i = 0; i < listaAula.size(); i++) {
                    if (listaAula.get(i).getId_curso() == id) {
                         aulaDAO.deleteById(listaAula.get(i).getId());
                    }
               }

               List<Modulo> listaModulo = moduloJPA.buscarModulosPorIDCursoPai(id);

               for (int i = 0; i < listaModulo.size(); i++) {
                    if (listaModulo.get(i).getId_curso() == id) {
                         moduloJPA.deleteById(listaModulo.get(i).getIdModulo());
                    }
               }

               Curso curso = cursoDAO.buscarCursoPorID(id);

               File diretorio = new File(urlAbsolute+"/" + curso.getId());

               FileUtils.deleteDirectory(diretorio);

               return true;
          } catch (Exception e) {

               return false;

          }

     }

     public boolean excluirDiretorioModulo(Modulo modulo) {

          try {

               Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

               File diretorio = new File(urlAbsolute+"/" + curso.getId()+"/modulos/"+modulo.getIdModulo());

               FileUtils.deleteDirectory(diretorio);

               return true;
          } catch (Exception e) {

               return false;

          }

     }

     public boolean atualizarDiretorioAula(Aula aulaAtualizado) {

          try {

               Modulo moduloFiltrado = moduloJPA.buscarModuloPorID(aulaAtualizado.getId_modulo());

               Curso curso = cursoDAO.buscarCursoPorID(moduloFiltrado.getId_curso());

               Aula aula = aulaDAO.buscarAulaPorId(aulaAtualizado.getId());

               File diretorio = new File(urlAbsolute+"/"+curso.getId() + "/modulos/"+moduloFiltrado.getIdModulo()+"/aulas/"+aula.getId());

               File diretorioRename = new File(urlAbsolute+"/"+curso.getId()+ "/modulos/"+moduloFiltrado.getIdModulo()+"/aulas/"+aulaAtualizado.getId());

               return diretorio.renameTo(diretorioRename);

          } catch (Exception e) {
               return false;
          }

     }

     public boolean excluirDiretorioAula(Aula aula) {

          try {

               Modulo modulo = moduloJPA.buscarModuloPorID(aula.getId_modulo());

               Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

               Aula aulaFiltrada = aulaDAO.buscarAulaPorId(aula.getId());

               File diretorio = new File(diretorios.getAbsolutePath().replace("\\", "//")+"/" + curso.getId()+"/modulos/"+modulo.getIdModulo()+"/aulas/"+aulaFiltrada.getId());

               FileUtils.deleteDirectory(diretorio);

               return true;
          } catch (Exception e) {

               return false;

          }

     }


}
