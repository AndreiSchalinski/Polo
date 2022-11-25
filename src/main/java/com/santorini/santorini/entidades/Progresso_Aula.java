package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Progresso_Aula")
public class Progresso_Aula {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private Long id_aula;
     private Long id_modulo;
     private Long id_curso;
     private Long id_usuario;
     private String aula_feita;
     private String aula_iniciada;

     public Progresso_Aula() {
     }

     public Progresso_Aula(Long idAula, Long idModulo, Long idCurso, Long idUsuario,
               String aulaIniciada) {
          this.id_aula = idAula;
          this.id_modulo = idModulo;
          this.id_curso = idCurso;
          this.id_usuario = idUsuario;
          this.aula_iniciada = aulaIniciada;
     }

     public String getAulaIniciada() {
          return aula_iniciada;
     }

     public void setAulaIniciada(String aulaIniciada) {
          this.aula_iniciada = aulaIniciada;
     }

     public Long getIdUsuario() {
          return id_usuario;
     }

     public void setIdUsuario(Long idUsuario) {
          this.id_usuario = idUsuario;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public Long getIdAula() {
          return id_aula;
     }

     public void setIdAula(Long idAula) {
          this.id_aula = idAula;
     }

     public Long getIdModulo() {
          return id_modulo;
     }

     public void setIdModulo(Long idModulo) {
          this.id_modulo = idModulo;
     }

     public Long getIdCurso() {
          return id_curso;
     }

     public void setIdCurso(Long idCurso) {
          this.id_curso = idCurso;
     }

     public String getAulaFeita() {
          return aula_feita;
     }

     public void setAulaFeita(String aulaFeita) {
          this.aula_feita = aulaFeita;
     }

}
