package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "aula")
public class Aula {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome;
     @Lob
     private String resumo;
     private Long id_modulo;
     private Long id_curso;
     private Integer status;

     public Aula() {
     }

     public String getResumo() {
          return resumo;
     }

     public void setResumo(String resumo) {
          this.resumo = resumo;
     }

     public Aula(String nome, String resumo, Long id_modulo, Long id_curso, Integer status) {
          this.nome = nome;
          this.resumo = resumo;
          this.id_modulo = id_modulo;
          this.id_curso = id_curso;
          this.status = status;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getNome() {
          return nome;
     }

     public void setNome(String nome) {
          this.nome = nome;
     }

     public Long getId_modulo() {
          return id_modulo;
     }

     public void setId_modulo(Long id_modulo) {
          this.id_modulo = id_modulo;
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
