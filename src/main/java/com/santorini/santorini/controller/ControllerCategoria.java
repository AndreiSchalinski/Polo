package com.santorini.santorini.controller;

import java.util.List;

import com.santorini.santorini.entidades.Categoria;
import com.santorini.santorini.interfacesJPAdao.InterfaceCategoriaJPA;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/categoria")
public class ControllerCategoria {

    @Autowired
    private InterfaceCategoriaJPA categoriaDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar")
    public ResponseEntity<?> carregar() {
        try {
            List<Categoria> lista = categoriaDAO.findAll();
            if (lista.isEmpty()) {
                return ResponseEntity.ok().body(lista.isEmpty());
            } else {
                return ResponseEntity.ok().body(lista);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
    public ResponseEntity<?> cadastrar(@RequestBody Categoria categoria) {
        try {
            categoriaDAO.save(categoria);

            return ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria <strong>" + categoria.getNome()
                    + "</strong> cadastrada com sucesso.</p>");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable("id") Long id) {
        try {
            if (categoriaDAO.findById(id).isEmpty()) {
                return ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria não econtrada na base.</p>");
            } else {
                return ResponseEntity.ok().body(categoriaDAO.findById(id));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar", consumes = "application/json")
    public ResponseEntity<?> atualizar(@RequestBody Categoria categoria) {
        try {
            return categoriaDAO.findById(categoria.getId()).map(categoriaListada -> {
                categoriaListada.setNome(categoria.getNome());
                Categoria categoriaAtualizada = categoriaDAO.save(categoriaListada);
                return ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria <strong>"+categoriaAtualizada.getNome()+"</strong> atualizada com sucesso.</p>");
            }).orElse(ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria não encontrada para atualizar.</p>"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/editar/status", consumes = "application/json")
    public ResponseEntity<?> atualizarStatus(@RequestBody Categoria categoria) {
        try {
            return categoriaDAO.findById(categoria.getId()).map(categoriaListada -> {
                categoriaListada.setNome(categoriaListada.getNome());
                categoriaListada.setStatus(categoria.getStatus());
                Categoria categoriaAtualizada = categoriaDAO.save(categoriaListada);
                return ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria <strong>"+categoriaAtualizada.getNome()+"</strong> atualizada com sucesso.</p>");
            }).orElse(ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria não encontrada para atualizar.</p>"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/coletar/{nome}")
    public ResponseEntity<?> buscaFragmentadaCategoria(@PathVariable("nome") String nome){
        try {
            List<Categoria> lista = categoriaDAO.buscarCategoriaPorFragmento(nome);
            return ResponseEntity.ok().body(lista);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id){
        try {
            return categoriaDAO.findById(id).map(categoria -> {
                categoriaDAO.delete(categoria);
                return ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria <strong>"+categoria.getNome()+"</strong> excluida com sucesso.</p>");
            }).orElse(ResponseEntity.ok().body("<p style='font-size:15px;'>Categoria não encontrada na base.</p>"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
