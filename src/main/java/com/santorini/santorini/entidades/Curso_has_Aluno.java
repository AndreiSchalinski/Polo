package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "curso_has_aluno")
public class Curso_has_Aluno {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome_curso;
     private Long id_curso;
     private Long id_usuario;
     private Integer liberado;

     public Curso_has_Aluno() {
     }

     public Curso_has_Aluno(String nomeCurso, Long id_curso, Long id_usuario, Integer liberado) {
          this.nome_curso = nomeCurso;
          this.id_curso = id_curso;
          this.id_usuario = id_usuario;
          this.liberado = liberado;
     }

     public Integer getLiberado() {
          return liberado;
     }

     public void setLiberado(Integer liberado) {
          this.liberado = liberado;
     }

     public String getNomeCurso() {
          return nome_curso;
     }

     public void setNomeCurso(String nomeCurso) {
          this.nome_curso = nomeCurso;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public Long getId_curso() {
          return id_curso;
     }

     public void setId_curso(Long id_curso) {
          this.id_curso = id_curso;
     }

     public Long getId_usuario() {
          return id_usuario;
     }

     public void setId_usuario(Long id_usuario) {
          this.id_usuario = id_usuario;
     }

}
