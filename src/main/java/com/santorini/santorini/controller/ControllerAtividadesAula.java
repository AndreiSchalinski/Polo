package com.santorini.santorini.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.entidades.Progresso_Aula;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;
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
@RequestMapping("/atividade")
public class ControllerAtividadesAula {

     @Autowired
     private InterfaceCursoJPA cursoDAO;

     @Autowired
     private InterfaceModuloJPA moduloDAO;

     @Autowired
     private InterfaceAulaJPA aulaDAO;

     @Autowired
     private InterfaceUsuarioJPA usuarioDAO;

     @Autowired
     private InterfaceProgressoAula progressoAulaDAO;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/aula/{idcurso}")
     public ResponseEntity<?> carregarCursosAtividade(@PathVariable("idcurso") Long id) {
          try {
               Curso curso = cursoDAO.buscarCursoPorID(id);

               return ResponseEntity.ok().body(curso);

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/aula/modulos/{idcurso}")
     public ResponseEntity<?> carregarModulosAtividade(@PathVariable("idcurso") Long id) {
          try {
               List<Modulo> listaModulosCurso = moduloDAO.buscarModulosPorIDCursoPai(id);

               return ResponseEntity.ok().body(listaModulosCurso);

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/aula/curso/aulas/{idcurso}")
     public ResponseEntity<?> carregarAulasAtividade(@PathVariable("idcurso") Long id, HttpSession session) {
          try {

               List<Aula> listaDeAulas = aulaDAO.buscarTodasAsAulasPorCursoPaiOrdemCre(id);

               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Progresso_Aula> listaAulasProgressoCadastradas = progressoAulaDAO
                         .buscarTodasAulasPorIdAulaIdUsuario(id, usuario.getId());

               boolean contem = false;

               for (int i = 0; i < listaAulasProgressoCadastradas.size(); i++) {

                    if (listaAulasProgressoCadastradas.get(i).getIdCurso() == id
                              && listaAulasProgressoCadastradas.get(i).getIdUsuario() == usuario.getId()) {
                         contem = true;
                    }
               }

               if (!contem) {
                    for (int i = 0; i < listaDeAulas.size(); i++) {

                         progressoAulaDAO.save(new Progresso_Aula(listaDeAulas.get(i).getId(),
                                   listaDeAulas.get(i).getId_modulo(), listaDeAulas.get(i).getId_curso(),
                                   usuario.getId(), null));
                    }
               }

               return ResponseEntity.ok().body(listaDeAulas);

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/aula/curso/aulas/concluidas/{idaula}")
     public ResponseEntity<?> carregarAulasConcluidas(@PathVariable("idaula") Long id, HttpSession session) {
          try {

               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());
               Progresso_Aula aulaFeita = progressoAulaDAO.buscarAulaFeitaPorIdAlunoIdAula(id, usuario.getId());

               if (aulaFeita.getAulaFeita() != null) {
                    return ResponseEntity.ok().body(true);
               } else {
                    return ResponseEntity.ok().body(false);
               }

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/validar/aula/curso/iniciar/{idaula}/{iniciada}")
     public ResponseEntity<?> validarAulaIniciadaAtividade(@PathVariable("idaula") Long id,
               @PathVariable("iniciada") String iniciada, HttpSession session) {
          try {

               Aula aula = aulaDAO.buscarAulaPorId(id);
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Progresso_Aula> listaAulasIniciadas = progressoAulaDAO
                         .buscarTodasAulasPorIdAulaIdUsuario(aula.getId_curso(), usuario.getId());

               boolean bloqueada = false;

               for (int i = 0; i < listaAulasIniciadas.size(); i++) {

                    if ((listaAulasIniciadas.get(i).getIdUsuario() == usuario.getId()) && (listaAulasIniciadas.get(i).getIdAula() < aula.getId()) && aula.getId() > 1) {
                         if (listaAulasIniciadas.get(i).getAulaIniciada() != null
                                   && listaAulasIniciadas.get(i).getAulaFeita() != null) {

                              bloqueada = false;
                              
                         } else if ((listaAulasIniciadas.get(i).getAulaIniciada() != null
                                   && listaAulasIniciadas.get(i).getAulaFeita() == null)
                                   || (listaAulasIniciadas.get(i).getAulaIniciada() == null
                                             && listaAulasIniciadas.get(i).getAulaFeita() == null)) {
                              bloqueada = true;
                         }

                    }

               }

               Progresso_Aula aulaConcluida = progressoAulaDAO.buscarAulaFeitaPorIdAlunoIdAula(aula.getId(),
                         usuario.getId());

               if (aulaConcluida.getAulaIniciada() == null) {

                    if (bloqueada) {
                         return ResponseEntity.ok().body(false);
                    } else {
                         Progresso_Aula aulaFiltrada = progressoAulaDAO.buscarAulaFeitaPorIdAlunoIdAula(aula.getId(),
                                   usuario.getId());

                         aulaFiltrada.setIdAula(aulaFiltrada.getIdAula());
                         aulaFiltrada.setIdModulo(aulaFiltrada.getIdModulo());
                         aulaFiltrada.setIdCurso(aulaFiltrada.getIdCurso());
                         aulaFiltrada.setAulaIniciada("true");
                         aulaFiltrada.setAulaFeita(aulaFiltrada.getAulaFeita());

                         progressoAulaDAO.save(aulaFiltrada);

                         return ResponseEntity.ok().body(true);
                    }

               } else {
                    return ResponseEntity.ok().body(true);
               }

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/validar/aula/curso/aula/texto/{id_aula}")
     public ResponseEntity<?> buscarTextoAula(@PathVariable("id_aula") Long idAula){
          try {
               Aula aula = aulaDAO.buscarAulaPorId(idAula);
               return ResponseEntity.ok().body(aula);
          } catch (Exception e) {
               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/validar/aula/curso/{idaula}/{confirm}")
     public ResponseEntity<?> validarAulaAtividade(@PathVariable("idaula") Long id,
               @PathVariable("confirm") String confirm, HttpSession session) {

          try {

               String msg = "";

               Aula aula = aulaDAO.buscarAulaPorId(id);
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               Progresso_Aula aulaConcluida = progressoAulaDAO.buscarAulaFeitaPorIdAlunoIdAula(aula.getId(),
                         usuario.getId());

               if (aulaConcluida.getAulaIniciada().equals("true") && aulaConcluida.getAulaFeita() == null) {

                    Progresso_Aula aulaFiltrada = progressoAulaDAO.buscarAulaFeitaPorIdAlunoIdAula(aula.getId(),
                              usuario.getId());

                    aulaFiltrada.setIdAula(aulaFiltrada.getIdAula());
                    aulaFiltrada.setIdModulo(aulaFiltrada.getIdModulo());
                    aulaFiltrada.setIdCurso(aulaFiltrada.getIdCurso());
                    aulaFiltrada.setAulaIniciada(aulaFiltrada.getAulaIniciada());
                    aulaFiltrada.setAulaFeita(confirm);

                    progressoAulaDAO.save(aulaFiltrada);

                    msg = "Aula " + aula.getNome() + " finalizada, prossiga com seus estudos.";

                    return ResponseEntity.ok().body(msg);
               } else {
                    return ResponseEntity.ok().body(true);
               }

          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar/aula/curso/aulas/bloquer/{idaula}")
     public ResponseEntity<?> bloquerAulaIniciadaAtividade(@PathVariable("idaula") Long id, HttpSession session) {
          try {

               Aula aula = aulaDAO.buscarAulaPorId(id);
               Usuario usuario = usuarioDAO.buscarPessoaPorUsuario(session.getAttribute("nome").toString());

               List<Progresso_Aula> listaAulasConcluida = progressoAulaDAO
                         .buscarTodasAulasPorIdAulaIdUsuario(aula.getId_curso(), usuario.getId());

               return ResponseEntity.ok().body("");
          } catch (Exception e) {

               return ResponseEntity.badRequest().build();
          }
     }
}
