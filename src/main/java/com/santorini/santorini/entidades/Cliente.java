package com.santorini.santorini.entidades;

public class Cliente {

     private Long id;
     private String nomeCompleto;
     private String cpf;
     private String endereco;
     private String email;
     private String telefone;
     private String texto;

     public Cliente() {
     }

     public Cliente(String nomeCompleto, String cpf, String endereco, String email, String telefone, String texto) {
          this.nomeCompleto = nomeCompleto;
          this.cpf = cpf;
          this.endereco = endereco;
          this.email = email;
          this.telefone = telefone;
          this.texto = texto;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getNomeCompleto() {
          return nomeCompleto;
     }

     public void setNomeCompleto(String nomeCompleto) {
          this.nomeCompleto = nomeCompleto;
     }

     public String getCpf() {
          return cpf;
     }

     public void setCpf(String cpf) {
          this.cpf = cpf;
     }

     public String getEndereco() {
          return endereco;
     }

     public void setEndereco(String endereco) {
          this.endereco = endereco;
     }

     public String getEmail() {
          return email;
     }

     public void setEmail(String email) {
          this.email = email;
     }

     public String getTelefone() {
          return telefone;
     }

     public void setTelefone(String telefone) {
          this.telefone = telefone;
     }

     public String getTexto() {
          return texto;
     }

     public void setTexto(String texto) {
          this.texto = texto;
     }

}
