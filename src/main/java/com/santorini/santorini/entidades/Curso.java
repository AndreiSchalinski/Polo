package com.santorini.santorini.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "curso")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 250)
    private String titulo_curso;
    @Column(length = 250)
    private String resultadoAprendizado;
    @Column(length = 250)
    private String preRequisito;
    @Column(length = 250)
    private String destinatario;
    @Column(length = 250)
    private String titulo;
    @Column(name = "subtitulo", length = 250)
    private String subTitulo;
    @Lob
    private String descricao;
    @Column(length = 250)
    private String conteudoAAprender;
    private String cargaHoraria;
    private String preco;
    private Long categoria;
    private Integer status;

    public Curso() {
    }

    public Curso(String tituloCurso, String resultadoAprendizado, String preRequisito, String destinatario,
            String titulo, String subTitulo, String descricao, String conteudoAAprender, String cargaHoraria,
            String preco, Long categoria, Integer status) {
        this.titulo_curso = tituloCurso;
        this.resultadoAprendizado = resultadoAprendizado;
        this.preRequisito = preRequisito;
        this.destinatario = destinatario;
        this.titulo = titulo;
        this.subTitulo = subTitulo;
        this.descricao = descricao;
        this.conteudoAAprender = conteudoAAprender;
        this.cargaHoraria = cargaHoraria;
        this.preco = preco;
        this.categoria = categoria;
        this.status = status;
    }

    public String getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(String cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public String getPreco() {
        return preco;
    }

    public void setPreco(String preco) {
        this.preco = preco;
    }

    public Long getCategoria() {
        return categoria;
    }

    public void setCategoria(Long categoria) {
        this.categoria = categoria;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTituloCurso() {
        return titulo_curso;
    }

    public void setTituloCurso(String tituloCurso) {
        this.titulo_curso = tituloCurso;
    }

    public String getResultadoAprendizado() {
        return resultadoAprendizado;
    }

    public void setResultadoAprendizado(String resultadoAprendizado) {
        this.resultadoAprendizado = resultadoAprendizado;
    }

    public String getPreRequisito() {
        return preRequisito;
    }

    public void setPreRequisito(String preRequisito) {
        this.preRequisito = preRequisito;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getSubTitulo() {
        return subTitulo;
    }

    public void setSubTitulo(String subTitulo) {
        this.subTitulo = subTitulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getConteudoAAprender() {
        return conteudoAAprender;
    }

    public void setConteudoAAprender(String conteudoAAprender) {
        this.conteudoAAprender = conteudoAAprender;
    }

}
