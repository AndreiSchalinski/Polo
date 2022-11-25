package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "plano_de_estudo")
public class Plano_De_Estudo {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private Long id_usuario;
     private String nome;
     @Lob
     private String Descricao;

     public Plano_De_Estudo() {
     }

     public Plano_De_Estudo(Long idUsuario, String nome, String descricao) {
          this.id_usuario = idUsuario;
          this.nome = nome;
          Descricao = descricao;
     }

     public String getNome() {
          return nome;
     }

     public void setNome(String nome) {
          this.nome = nome;
     }

     public String getDescricao() {
          return Descricao;
     }

     public void setDescricao(String descricao) {
          Descricao = descricao;
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

}
