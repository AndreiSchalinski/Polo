package com.santorini.santorini.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonObject;
import com.santorini.santorini.entidades.Autoridade;
import com.santorini.santorini.entidades.Imagem_Usuario;
import com.santorini.santorini.entidades.Usuario;
import com.santorini.santorini.interfacesJPAdao.InterfaceAutoridadeJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceImagemUserJPA;
import com.santorini.santorini.interfacesJPAdao.InterfaceUsuarioJPA;
import com.santorini.santorini.services.ServiceEmailRedefinirSenha;
import com.santorini.santorini.services.UserService;

@Controller
@RequestMapping("/usuario")
public class ControllerUsuario {

    @Autowired
    private InterfaceUsuarioJPA usuarioDAO;

    @Autowired
    private InterfaceAutoridadeJPA autoridadeDAO;

    @Autowired
    private InterfaceImagemUserJPA imagemUserDAO;

    @Autowired
    private UserService usuarioServico;

    @Autowired
    private ServiceEmailRedefinirSenha serviceRedefinirSenhaUsuario;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar")
    public ResponseEntity<?> carregar() {
        try {
            List<Usuario> listaUsuario = usuarioDAO.findAll();

            if (listaUsuario.isEmpty()) {
                return ResponseEntity.ok().body(listaUsuario.isEmpty());
            } else {
                return ResponseEntity.ok().body(listaUsuario);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {
        try {

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            Usuario usuarioUserNameExists = usuarioDAO.buscarUsuarioPorEmail(usuario.getUsername(), usuario.getEmail());

            if (usuarioUserNameExists != null) {

                String itemIgual = "";

                if (usuario.getUsername().equals(usuarioUserNameExists.getUsername())) {
                    itemIgual = "Usuário";
                } else {
                    itemIgual = "Email";
                }

                return ResponseEntity.ok()
                        .body(itemIgual + " inválido pois já existe na base, inserir outro.");

            } else {

                usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
                usuarioDAO.save(usuario);
                Usuario usuarioCadastrado = usuarioDAO.buscarPessoaPorUsuario(usuario.getUsername());
                autoridadeDAO.save(new Autoridade(usuarioCadastrado.getUsername(), usuarioCadastrado.getAutoridade(),
                        usuarioCadastrado.getId()));

                return ResponseEntity.ok()
                        .body("<p style='font-size:15px;'>Cadastro de <strong>" + usuario.getNome()
                                + "</strong> finalizado com sucesso.</p>");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/coletar/{nome}")
    public ResponseEntity<?> buscarUsuarioPorFragmanto(@PathVariable("nome") String nome) {

        try {
            List<Usuario> lista = usuarioDAO.buscarUsuariosPorFragmento(nome);
            return ResponseEntity.ok().body(lista);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable("id") Long id) {
        try {
            if (usuarioDAO.findById(id).isEmpty()) {
                return ResponseEntity.ok()
                        .body("<p style='font-size:15px;'>Cadastro filtrado não existe, <strong>verificar com editora</strong>.</p>");
            } else {

                return ResponseEntity.ok().body(usuarioDAO.findById(id));
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
    public ResponseEntity<?> atualizar(@RequestBody Usuario usuario) {
        try {

            if (usuarioDAO.findById(usuario.getId()).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
            } else {
                return usuarioDAO.findById(usuario.getId()).map(usuarioListado -> {

                    String msg = "";
                    boolean confirm = false;

                    List<Usuario> listaDeUsuarios = usuarioDAO.findAll();

                    for(int i=0; i < listaDeUsuarios.size(); i++){

                        if (listaDeUsuarios.get(i).getEmail().equalsIgnoreCase(usuario.getEmail())) {
                            msg = "E-mail já existe na base, inserir outro.";
                            confirm = true;
                        }
    
                        if (listaDeUsuarios.get(i).getUsername().equalsIgnoreCase(usuario.getUsername())) {
                            msg = "Usuário já existe na base, inserir outro.";
                            confirm = true;
                        }

                    }

                    if (!confirm) {
                        usuarioListado.setNome(usuario.getNome());
                        usuarioListado.setEmail(usuario.getEmail());
                        usuarioListado.setNome_certificado(usuario.getNome_certificado());
                        usuarioListado.setCpf(usuario.getCpf());
                        usuarioListado.setUsername(usuario.getUsername());
                        usuarioListado.setAutoridade(usuario.getAutoridade());
                        usuarioListado.setStatus(usuarioListado.getStatus());

                        Usuario usuarioAtualizado = usuarioDAO.save(usuarioListado);

                        Autoridade autoridadeListado = autoridadeDAO.buscarAutoridadePorID(usuarioAtualizado.getId());
                        autoridadeListado.setId(autoridadeListado.getId());
                        autoridadeListado.setUsername(usuarioAtualizado.getUsername());
                        autoridadeListado.setId_username(usuarioAtualizado.getId());
                        autoridadeListado.setAuthority(usuarioAtualizado.getAutoridade());
                        autoridadeDAO.save(autoridadeListado);

                        msg = "Cadastro de" + usuarioAtualizado.getNome()
                                + " atualizado com sucesso.";
                    }

                    return ResponseEntity.ok()
                            .body(msg);
                }).orElse(ResponseEntity.badRequest().build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar/cad", consumes = "application/json")
    public ResponseEntity<?> atualizarSenha(@RequestBody Usuario usuario) {
        try {

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (usuarioDAO.findById(usuario.getId()).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
            } else {
                return usuarioDAO.findById(usuario.getId()).map(usuarioListado -> {
                    usuarioListado.setNome(usuarioListado.getNome());
                    usuarioListado.setEmail(usuarioListado.getEmail());
                    usuarioListado.setNome_certificado(usuarioListado.getNome_certificado());
                    usuarioListado.setCpf(usuarioListado.getCpf());
                    usuarioListado.setUsername(usuarioListado.getUsername());
                    usuarioListado.setAutoridade(usuarioListado.getAutoridade());
                    usuarioListado.setPassword(passwordEncoder.encode(usuario.getPassword()));
                    usuarioListado.setStatus(usuarioListado.getStatus());
                    Usuario usuarioAtualizado = usuarioDAO.save(usuarioListado);

                    return ResponseEntity.ok()
                            .body("<p style='font-size:15px;'>Cadastro de <strong>" + usuarioAtualizado.getNome()
                                    + "</strong> atualizado com sucesso.</p>");
                }).orElse(ResponseEntity.badRequest().build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar/status", consumes = "application/json")
    public ResponseEntity<?> alterarStautsUsuario(@RequestBody Usuario usuario) {
        try {

            return usuarioDAO.findById(usuario.getId()).map(usuarioListado -> {
                usuarioListado.setNome(usuarioListado.getNome());
                usuarioListado.setEmail(usuarioListado.getEmail());
                usuarioListado.setNome_certificado(usuarioListado.getNome_certificado());
                usuarioListado.setCpf(usuarioListado.getCpf());
                usuarioListado.setUsername(usuarioListado.getUsername());
                usuarioListado.setPassword(usuarioListado.getPassword());
                usuarioListado.setStatus(usuario.getStatus());
                Usuario usuarioStatusAtualizado = usuarioDAO.save(usuarioListado);

                String status = "";
                if (usuario.getStatus() == 0) {
                    status = "desativado";
                } else {
                    status = "ativo";
                }

                return ResponseEntity.ok()
                        .body("<p style='font-size:15px;'>Status do usuário " + usuarioStatusAtualizado.getNome()
                                + " está <strong>" + status + "</strong> agora.</p>");
            }).orElse(ResponseEntity.badRequest().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{id}")
    public void deletar(@PathVariable("id") Long id) {
        try {

            Usuario usuario = usuarioDAO.buscarUsuarioPorID(id);

            Autoridade autoridade = autoridadeDAO.buscarAutoridadePorIDUsuarioPai(usuario.getId());
            Imagem_Usuario imagem = imagemUserDAO.buscarImagemPorId(id);
            if (imagem != null) {
                imagemUserDAO.delete(imagem);
            }
            autoridadeDAO.delete(autoridade);
            usuarioDAO.delete(usuario);
            returLogin();
        } catch (Exception e) {
            e.getLocalizedMessage();
        }
    }

    public String returLogin() {
        return "redirect:login";
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/session")
    public ResponseEntity<?> buscarUserSession(HttpSession session) {

        List<Usuario> listaNomes = usuarioDAO.buscarPorNomeUsuario(session.getAttribute("nome").toString());

        String nome = "";
        Long id = null;
        if (listaNomes.size() == 0) {
            nome = session.getAttribute("nome").toString();
        } else {
            id = listaNomes.get(0).getId();
            nome = listaNomes.get(0).getNome();
        }

        JsonObject json = new JsonObject();

        json.addProperty("id", id);
        json.addProperty("nome", nome);

        return ResponseEntity.ok().body(json.toString());
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/nome/{id}")
    public ResponseEntity<?> buscarPorNome(@PathVariable("id") Long id) {

        try {

            Usuario usuario = usuarioDAO.buscarUsuarioPorID(id);

            return ResponseEntity.ok().body(usuario);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/informacoes/cadastro/{id}")
    public ResponseEntity<?> buscarPorUsuariosInfos(@PathVariable("id") Long id) {

        try {

            Usuario usuario = usuarioDAO.buscarUsuarioPorID(id);

            usuario.setPassword("");

            return ResponseEntity.ok().body(usuario);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/logado/editar", consumes = "application/json")
    public ResponseEntity<?> atualizarUsuarioLogado(@RequestBody Usuario usuario, HttpSession session) {
        try {

            if (usuarioDAO.findById(usuario.getId()).isEmpty()) {
                return ResponseEntity.ok().body(
                        "<p style='font-size:15px;'>Cadastro não existe, <strong>verificar com editora</strong>.</p>");
            } else {
                return usuarioDAO.findById(usuario.getId()).map(usuarioListado -> {

                    String msg = "";
                    boolean confirm = false;

                    if (usuarioListado.getEmail().equalsIgnoreCase(usuario.getEmail())) {
                        msg = "E-mail já existe na base, inserir outro.";
                        confirm = true;
                    }

                    if (usuarioListado.getUsername().equalsIgnoreCase(usuario.getUsername())) {
                        msg = "Usuário já existe na base, inserir outro.";
                        confirm = true;
                    }

                    if (!confirm) {
                        usuarioListado.setNome(usuario.getNome());
                        usuarioListado.setEmail(usuario.getEmail());

                        usuarioListado.setNome_certificado(usuario.getNome_certificado());
                        usuarioListado.setCpf(usuario.getCpf());
                        usuarioListado.setUsername(usuario.getUsername());
                        usuarioListado.setAutoridade(usuarioListado.getAutoridade());
                        usuarioListado.setStatus(usuarioListado.getStatus());

                        Usuario usuarioAtualizado = usuarioDAO.save(usuarioListado);

                        session.setAttribute("nome", usuarioAtualizado.getUsername());

                        Autoridade autoridadeListado = autoridadeDAO.buscarAutoridadePorID(usuarioAtualizado.getId());
                        autoridadeListado.setId(autoridadeListado.getId());
                        autoridadeListado.setUsername(usuarioAtualizado.getUsername());
                        autoridadeListado.setId_username(usuarioAtualizado.getId());
                        autoridadeListado.setAuthority(usuarioListado.getAutoridade());

                        autoridadeDAO.save(autoridadeListado);

                        Imagem_Usuario imagem = imagemUserDAO.buscarImagemPorId(usuarioAtualizado.getId());
                        imagem.setId(imagem.getId());
                        imagem.setId_usuario(usuarioAtualizado.getId());
                        imagem.setImagem(imagem.getImagem());
                        imagem.setNome(usuarioAtualizado.getNome());
                        imagemUserDAO.save(imagem);

                        msg = "<p style='font-size:15px;'>Cadastro de kkk<strong>" + usuarioAtualizado.getNome()
                                + "</strong> atualizado com sucesso.</p>";

                    }

                    return ResponseEntity.ok()
                            .body(msg);

                }).orElse(ResponseEntity.badRequest().build());

            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/imagem/salvar")
    public ResponseEntity<?> salvarArquivosModulo(Long id, @RequestParam("imagemuser") MultipartFile imagem) {

        try {

            String mensagem = "";

            Usuario usuario = usuarioDAO.buscarUsuarioPorID(id);
            Imagem_Usuario imagemListada = imagemUserDAO.buscarImagemPorNomeUsuario(usuario.getNome());

            if (usuario != null && imagemListada == null) {

                Imagem_Usuario imagemUsuario = new Imagem_Usuario();
                imagemUsuario.setNome(usuario.getNome());
                imagemUsuario.setId_usuario(usuario.getId());
                imagemUsuario.setImagem(imagem.getBytes());

                imagemUserDAO.save(imagemUsuario);

                mensagem = "Imagem de " + usuario.getNome() + " salva com sucesso.";

                return ResponseEntity.ok().body(mensagem);

            } else {
                return imagemUserDAO.findById(imagemListada.getId()).map(img -> {
                    img.setId(img.getId());
                    img.setId_usuario(img.getId_usuario());
                    img.setNome(img.getNome());
                    try {
                        img.setImagem(imagem.getBytes());
                    } catch (IOException e) {

                        e.printStackTrace();
                    }
                    Imagem_Usuario imag = imagemUserDAO.save(img);
                    return ResponseEntity.ok().body("Imagem de " + imag.getNome() + " alterada com sucesso.");
                }).orElse(ResponseEntity.badRequest().build());
            }

        } catch (Exception e) {

            return ResponseEntity.badRequest().build();
        }

    }

    @RequestMapping(method = RequestMethod.GET, value = "/buscar/imagem/{nome}")
    public void downloadMateriais(@PathVariable("nome") String nome, HttpServletResponse response) {

        try {
            Imagem_Usuario imagem = imagemUserDAO.buscarImagemPorNomeUsuario(nome);

            ServletOutputStream out = response.getOutputStream();

            response.setContentType("application/octet-stream");

            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + imagem.getNome();

            response.setHeader(headerKey, headerValue);

            out.write(imagem.getImagem());

        } catch (Exception e) {

        }

    }

}
