package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "imagem_usuario")
public class Imagem_Usuario {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome;
     private Long id_usuario;
     @Lob
     private byte[] imagem;

     public Imagem_Usuario() {
     }

     public Imagem_Usuario(String nome, Long id_usuario, byte[] imagem) {
          this.nome = nome;
          this.id_usuario = id_usuario;
          this.imagem = imagem;
     }

     public String getNome() {
          return nome;
     }

     public void setNome(String nome) {
          this.nome = nome;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public Long getId_usuario() {
          return id_usuario;
     }

     public void setId_usuario(Long id_usuario) {
          this.id_usuario = id_usuario;
     }

     public byte[] getImagem() {
          return imagem;
     }

     public void setImagem(byte[] imagem) {
          this.imagem = imagem;
     }

}
