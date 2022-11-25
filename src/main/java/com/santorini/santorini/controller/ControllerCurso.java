package com.santorini.santorini.controller;

import java.io.File;
import java.util.ArrayList;
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

import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.interfacesJPAdao.InterfaceAulaJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceLiberaCurso;
import com.santorini.santorini.services.ServiceArquivosCurso;
import com.santorini.santorini.services.ServiceCrudDiretorios;

@Controller
@RequestMapping("/curso")
public class ControllerCurso {

    @Autowired
    private InterfaceCursoJPA cursoDAO;

    @Autowired
    private ServiceArquivosCurso serviceArquivosCurso;

    @Autowired
    private ServiceCrudDiretorios serviceCrudDiretorios;

    @Autowired
    private InterfaceAulaJPA aulaDAO;

    @Autowired
    private InterfaceLiberaCurso cursosLiberadosDAO;

    private File urlAbsolute = new File(UrlCaminhoPaths.urlAbsolutoMaquina());

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar")
    public ResponseEntity<?> carregar() {
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
    @RequestMapping(method = RequestMethod.GET, value = "/liberar/carregar")
    public ResponseEntity<?> carregarCursoAtivados() {
        try {
            List<Curso> listaCurso = cursoDAO.findAll();
            if (listaCurso.isEmpty()) {
                return ResponseEntity.ok().body(listaCurso.isEmpty());
            } else {

                List<Curso> listaCursosAtivados = new ArrayList<>();

                for (int i = 0; i < listaCurso.size(); i++) {
                    if (listaCurso.get(i).getStatus() == 1) {
                        listaCursosAtivados.add(listaCurso.get(i));
                    }
                }

                if (listaCursosAtivados.isEmpty()) {
                    return ResponseEntity.ok().body(listaCursosAtivados.isEmpty());
                } else {
                    return ResponseEntity.ok().body(listaCursosAtivados);
                }

            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/salvar")
    public ResponseEntity<?> salvar(@RequestParam("imagem_abertura_curso") MultipartFile imagem_abertura_curso,
            @RequestParam("imagem_capa_curso") MultipartFile imagem_capa_curso, String tituloCurso,
            String resultadoAprendizado, String preRequisito, String destinatario, String titulo, String subTitulo,
            String descricao, String conteudoAAprender, String cargaHoraria, String preco, Long categoria,
            Integer status) {
        try {

            String mensagem = "";

            cursoDAO.save(new Curso(tituloCurso, resultadoAprendizado, preRequisito, destinatario, titulo, subTitulo,
                    descricao, conteudoAAprender, cargaHoraria.replace(",", "."), preco.replace(",", "."), categoria,
                    status));

            boolean diretorioCriado = serviceArquivosCurso.criaArquiteturaCurso(tituloCurso);
            boolean imagensSalvas = serviceArquivosCurso.salvarImagensCurso(tituloCurso, imagem_abertura_curso,imagem_capa_curso);

            

            if (diretorioCriado && imagensSalvas) {

                mensagem = "<p style='font-size:15px;'>Cadastro de <strong>" + tituloCurso
                        + "</strong> finalizado com sucesso.</p>";
                return ResponseEntity.ok().body(mensagem);
            } else {
                mensagem = "<p style='font-size:15px;'>Erro ao fazer Cadastro de <strong>" + tituloCurso
                        + "</strong>, problema ao criar pastas do curso.</p>";
                return ResponseEntity.ok().body(mensagem);
            }

        } catch (Exception e) {
            
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/atualizar/imagem/abertura/curso")
    public ResponseEntity<?> atualizarImagemAberturaCurso(@RequestParam("imagem_abertura_curso") MultipartFile imagem_abertura_curso, Long id) {
        try {

            String mensagem = "";

            Curso curso = cursoDAO.buscarCursoPorID(id);

            boolean diretorioCriado = serviceArquivosCurso.criaArquiteturaCurso(curso.getTituloCurso());
            boolean imagensSalvas = serviceArquivosCurso.editaImagensAberturaCurso(curso.getTituloCurso(), imagem_abertura_curso);

            if (diretorioCriado && imagensSalvas) {

                mensagem = "Imagem de abertura do curso alterada com sucesso.";
                return ResponseEntity.ok().body(mensagem);
            } else {
                mensagem = "<p style='font-size:15px;'>Erro ao fazer Cadastro de <strong>" + curso.getTituloCurso()
                        + "</strong>, problema ao criar pastas do curso.</p>";
                return ResponseEntity.ok().body(mensagem);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/atualizar/imagens/capa/curso")
    public ResponseEntity<?> atualizarImagemCapaCurso(@RequestParam("imagem_capa_curso") MultipartFile imagem_capa_curso, Long id) {
        try {

            String mensagem = "";

            Curso curso = cursoDAO.buscarCursoPorID(id);

            boolean diretorioCriado = serviceArquivosCurso.criaArquiteturaCurso(curso.getTituloCurso());
            boolean imagensSalvas = serviceArquivosCurso.editaImagensCapaCurso(curso.getTituloCurso(), imagem_capa_curso);

            if (diretorioCriado && imagensSalvas) {

                mensagem = "Imagem de capa do curso alterada com sucesso.";
                return ResponseEntity.ok().body(mensagem);
            } else {
                mensagem = "<p style='font-size:15px;'>Erro ao fazer Cadastro de <strong>" + curso.getTituloCurso()
                        + "</strong>, problema ao criar pastas do curso.</p>";
                return ResponseEntity.ok().body(mensagem);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/coletar/{titulo}")
    public ResponseEntity<?> buscarCursoPorFragmanto(@PathVariable("titulo") String titulo) {
        try {
            List<Curso> lista = cursoDAO.buscarCursoPorFragmento(titulo);
            return ResponseEntity.ok().body(lista);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/liberado/coletar/{titulo}")
    public ResponseEntity<?> buscarCursoAtivadosPorFragmanto(@PathVariable("titulo") String titulo) {
        try {
            List<Curso> lista = cursoDAO.buscarCursoPorFragmento(titulo);
            List<Curso> listCursosAtivados = new ArrayList<>();
            for (int i = 0; i < lista.size(); i++) {
                if (lista.get(i).getStatus() == 1) {
                    listCursosAtivados.add(lista.get(i));
                }
            }

            if (listCursosAtivados.isEmpty()) {
                return ResponseEntity.ok().body(listCursosAtivados.isEmpty());
            } else {
                return ResponseEntity.ok().body(listCursosAtivados);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable("id") Long id) {
        try {
            if (cursoDAO.findById(id).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro filtrado não existe, <strong>verificar com editora</strong>.</p>");
            } else {
                return ResponseEntity.ok().body(cursoDAO.findById(id));
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
    public ResponseEntity<?> atualizar(@RequestBody Curso curso) {

        try {

            if (cursoDAO.findById(curso.getId()).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
            } else {

                boolean confirm = serviceCrudDiretorios.atualizarDiretorioCurso(curso.getId(), curso.getTituloCurso());

                if (confirm) {
                    return cursoDAO.findById(curso.getId()).map(cursoListado -> {
                        cursoListado.setTituloCurso(curso.getTituloCurso());
                        cursoListado.setResultadoAprendizado(curso.getResultadoAprendizado());
                        cursoListado.setPreRequisito(curso.getPreRequisito());
                        cursoListado.setDestinatario(curso.getDestinatario());
                        cursoListado.setTitulo(curso.getTitulo());
                        cursoListado.setSubTitulo(curso.getSubTitulo());
                        cursoListado.setDescricao(curso.getDescricao());
                        cursoListado.setConteudoAAprender(curso.getConteudoAAprender());
                        cursoListado.setCargaHoraria(curso.getCargaHoraria().replace(",", "."));
                        cursoListado.setPreco(curso.getPreco().replace(",", "."));

                        Curso cursoAtualizado = cursoDAO.save(cursoListado);

                        return ResponseEntity.ok().body("<p style='font-size:15px;'>Cadastro de <strong>"
                                + cursoAtualizado.getTitulo() + "</strong> atualizado com sucesso.</p>");
                    }).orElse(ResponseEntity.badRequest().build());
                } else {
                    return ResponseEntity.ok().body("Erro ao editar cadstro do curso, pasta não pôde ser renomeada!");
                }

            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar/status", consumes = "application/json")
    public ResponseEntity<?> atualizarStatus(@RequestBody Curso curso) {
        try {

            if (cursoDAO.findById(curso.getId()).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
            } else {
                return cursoDAO.findById(curso.getId()).map(cursoListado -> {
                    cursoListado.setTituloCurso(cursoListado.getTituloCurso());
                    cursoListado.setResultadoAprendizado(cursoListado.getResultadoAprendizado());
                    cursoListado.setPreRequisito(cursoListado.getPreRequisito());
                    cursoListado.setDestinatario(cursoListado.getDestinatario());
                    cursoListado.setTitulo(cursoListado.getTitulo());
                    cursoListado.setSubTitulo(cursoListado.getSubTitulo());
                    cursoListado.setDescricao(cursoListado.getDescricao());
                    cursoListado.setConteudoAAprender(cursoListado.getConteudoAAprender());
                    cursoListado.setStatus(curso.getStatus());
                    Curso cursoAtualizado = cursoDAO.save(cursoListado);
                    return ResponseEntity.ok().body("<p style='font-size:15px;'>Status do curso <strong>"
                            + cursoAtualizado.getTitulo() + "</strong> atualizado com sucesso.</p>");
                }).orElse(ResponseEntity.badRequest().build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id) {
        try {

            boolean confirm = serviceCrudDiretorios.excluirDiretorioCurso(id);

                if (confirm) {
                    return cursoDAO.findById(id).map(curso -> {
                        cursoDAO.delete(curso);
                        return ResponseEntity.ok()
                                .body("<p style='font-size:15px;'Cadastro de <strong>" + curso.getTitulo()
                                        + "</strong> excluído com sucesso.</p>");
                    }).orElse(ResponseEntity.badRequest().build());
                } else {
                    return ResponseEntity.ok()
                            .body("Não foi possível deletar cadastro pois diretório não pôde ser excluido!");
                }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
