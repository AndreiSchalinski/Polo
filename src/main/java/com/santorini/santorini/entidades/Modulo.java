package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "modulo")
public class Modulo {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id_modulo;
     private String nome;
     private Long id_curso;
     private Integer status;

     public Modulo() {
     }

     public Modulo(String nome, Long id_curso, Integer status) {
          this.nome = nome;
          this.id_curso = id_curso;
          this.status = status;
     }

     public Long getIdModulo() {
          return id_modulo;
     }

     public void setIdModulo(Long idModulo) {
          this.id_modulo = idModulo;
     }

     public String getNome() {
          return nome;
     }

     public void setNome(String nome) {
          this.nome = nome;
     }

     public Long getId_curso() {
          return id_curso;
     }

     public void setId_curso(Long id_curso) {
          this.id_curso = id_curso;
     }

     public Integer getStatus() {
          return status;
     }

     public void setStatus(Integer status) {
          this.status = status;
     }

}
