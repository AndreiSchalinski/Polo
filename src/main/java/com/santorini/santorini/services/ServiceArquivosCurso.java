package com.santorini.santorini.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.santorini.santorini.entidades.Aula;
import com.santorini.santorini.entidades.Curso;
import com.santorini.santorini.entidades.Modulo;
import com.santorini.santorini.entidades.UrlCaminhoPaths;
import com.santorini.santorini.interfacesJPAdao.InterfaceCursoJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceModuloJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceVideoAula;

@Component
public class ServiceArquivosCurso {

        private File urlAbsolute = new File(UrlCaminhoPaths.urlAbsolutoMaquina());

        @Autowired
        private InterfaceCursoJPA cursoDAO;

        @Autowired
        private InterfaceModuloJPA moduloDAO;

        @Autowired
        private InterfaceVideoAula videoAulaDAO;

        public Boolean criaArquiteturaCurso(String tituloCurso) {

                try {
                        Curso curso = cursoDAO.buscarCurosPorNome(tituloCurso);

                        File diretorioPai = new File(urlAbsolute+"/" + curso.getId());

                        diretorioPai.mkdir();

                        File diretorioImagemAberturaCurso = new File( urlAbsolute+"/" + curso.getId()  + "/imagem_abertura_curso");

                        diretorioImagemAberturaCurso.mkdir();

                        File diretorioImagemCapaCurso = new File(urlAbsolute+"/" + curso.getId()  + "/imagem_capa_curso");

                        diretorioImagemCapaCurso.mkdir();

                        File diretorioModulos = new File(urlAbsolute+"/" + curso.getId() + "/modulos/");

                        diretorioModulos.mkdir();

                        return true;
                } catch (Exception e) {

                        return false;

                }

        }

        public boolean salvarImagensCurso(String tituloCurso, MultipartFile imagem_abertura_curso,
                        MultipartFile imagem_capa_curso) {
                try {

                        Curso curso = cursoDAO.buscarCurosPorNome(tituloCurso);

                        File imagemAberturaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_abertura_curso/" + imagem_abertura_curso.getOriginalFilename());

                        imagemAberturaCurso.createNewFile();

                        imagem_abertura_curso.transferTo(imagemAberturaCurso);

                        File imagemCapaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_capa_curso/" + imagem_capa_curso.getOriginalFilename());

                        imagemCapaCurso.createNewFile();

                        imagem_capa_curso.transferTo(imagemCapaCurso);

                        return true;
                } catch (Exception e) {

                        return false;
                }
        }

        public boolean editaImagensAberturaCurso(String tituloCurso, MultipartFile imagem_abertura_curso) {
                try {

                        Curso curso = cursoDAO.buscarCurosPorNome(tituloCurso);

                        File imagemAberturaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_abertura_curso/");

                        if (imagemAberturaCurso.listFiles().length > 0) {
                                imagemAberturaCurso.listFiles()[0].delete();
                        }

                        imagemAberturaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_abertura_curso/" + imagem_abertura_curso.getOriginalFilename());

                        imagemAberturaCurso.createNewFile();

                        imagem_abertura_curso.transferTo(imagemAberturaCurso);

                        return true;
                } catch (Exception e) {
                        return false;
                }
        }

        public boolean editaImagensCapaCurso(String tituloCurso, MultipartFile imagem_capa_curso) {
                try {

                        Curso curso = cursoDAO.buscarCurosPorNome(tituloCurso);

                        File imagemCapaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_capa_curso/");

                        if (imagemCapaCurso.listFiles().length > 0) {
                                imagemCapaCurso.listFiles()[0].delete();
                        }

                        imagemCapaCurso = new File( urlAbsolute+"/" + curso.getId() + "/imagem_capa_curso/" + imagem_capa_curso.getOriginalFilename());

                        imagemCapaCurso.createNewFile();

                        imagem_capa_curso.transferTo(imagemCapaCurso);

                        return true;
                } catch (Exception e) {
                        return false;
                }
        }

        public boolean criarPastaModulo(Modulo modulo) {
                boolean confirm = false;
                try {

                        Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

                        File diretorioNovoModulo = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo());
                                                            
                        return diretorioNovoModulo.mkdir();
                } catch (Exception e) {
                        return confirm;
                }
        }

        public boolean criarPastaAula(Aula aula) {
                boolean confirm = false;
                try {

                        Modulo modulo = moduloDAO.buscarModuloPorID(aula.getId_modulo());

                        Curso curso = cursoDAO.buscarCursoPorID(modulo.getId_curso());

                        File diretorioAula = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/");

                        diretorioAula.mkdir();

                        File diretorioAulaCadastrada = new File( urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId());

                        diretorioAulaCadastrada.mkdir();

                        File diretorioAulaVideo = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/video");

                        diretorioAulaVideo.mkdir();

                        File diretorioAulaMateriais = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/materiais");

                        diretorioAulaMateriais.mkdir();

                        return confirm;
                } catch (Exception e) {
                        return confirm;
                }
        }

        public boolean salvarArquivosModulo(Curso curso, Modulo modulo, Aula aula,
                        MultipartFile videoAula, MultipartFile materiaisAula[]) {
                try {

                        String arquivoVideo = "";

                        arquivoVideo = videoAula.getOriginalFilename().replace(" ", "_");

                        File novaVideoAula = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/video/" + arquivoVideo);

                        novaVideoAula.createNewFile();

                        videoAula.transferTo(novaVideoAula);


                        if (materiaisAula[0].getSize() > 0) {
                                
                                for (int i = 0; i < materiaisAula.length; i++) {

                                        String arquivo = materiaisAula[i].getOriginalFilename().replaceAll(" ", "_");

                                        File novosMateriais = new File(urlAbsolute+"/" + curso.getId() + "/modulos/" + modulo.getIdModulo() + "/aulas/" + aula.getId() + "/materiais/" + arquivo);

                                        novosMateriais.createNewFile();

                                        materiaisAula[i].transferTo(novosMateriais);
                                }

                        } else {
                                return true;
                        }
                        return true;
                } catch (Exception e) {
                        return false;
                }
        }

        public void buscarImagensCapaCursos(Long id_curso, String arquivo, HttpServletResponse response)
                        throws IOException {

                Path url = Paths.get( urlAbsolute+"/" + id_curso + "/imagem_capa_curso/" + arquivo);

                byte[] arquivoLido = Files.readAllBytes(url);

                response.setContentType("application/octet-stream");
                String headerKey = "Content-Disposition";
                String headerValue = "attachment; filename=" + arquivo;

                response.setHeader(headerKey, headerValue);

                ServletOutputStream out = response.getOutputStream();

                out.write(arquivoLido);
                

        }

        public void buscarImagensCapaCursosInfo(Long id_curso, HttpServletResponse response) throws IOException {

                Path url = Paths.get( urlAbsolute+"/" + id_curso + "/imagem_capa_curso/");

                File imagem = new File(url.toString());

                url = Paths.get( urlAbsolute+"/" + id_curso + "/imagem_capa_curso/" + imagem.listFiles()[0].getName());

                byte[] arquivoLido = Files.readAllBytes(url);

                response.setContentType("application/octet-stream");
                String headerKey = "Content-Disposition";
                String headerValue = "attachment; filename=" + imagem.listFiles()[0].getName();

                response.setHeader(headerKey, headerValue);

                ServletOutputStream out = response.getOutputStream();

                out.write(arquivoLido);

        }

        public void buscarImagensAberturaCursosInfo(Long id_curso, HttpServletResponse response) throws IOException {

                Path url = Paths.get( urlAbsolute+"/" + id_curso + "/imagem_abertura_curso/");

                File imagem = new File(url.toString());

                url = Paths.get(urlAbsolute+"/" + id_curso + "/imagem_abertura_curso/" + imagem.listFiles()[0].getName());

                byte[] arquivoLido = Files.readAllBytes(url);

                response.setContentType("application/octet-stream");
                String headerKey = "Content-Disposition";
                String headerValue = "attachment; filename=" + imagem.listFiles()[0].getName();

                response.setHeader(headerKey, headerValue);

                ServletOutputStream out = response.getOutputStream();

                out.write(arquivoLido);

        }

        public void buscarImagensCapaCursosAtividade(Long id_curso, HttpServletResponse response) throws IOException {

                Path url = Paths.get( urlAbsolute+"/" + id_curso + "/imagem_abertura_curso/");

                File imagem = new File(url.toString());

                url = Paths.get(urlAbsolute+"/" + id_curso + "/imagem_abertura_curso/" + imagem.listFiles()[0].getName());

                byte[] arquivoLido = Files.readAllBytes(url);

                response.setContentType("application/octet-stream");
                String headerKey = "Content-Disposition";
                String headerValue = "attachment; filename=" + imagem.listFiles()[0].getName();

                response.setHeader(headerKey, headerValue);

                ServletOutputStream out = response.getOutputStream();

                out.write(arquivoLido);

        }
}
