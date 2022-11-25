package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "autoridade")
public class Autoridade {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String username;
     private String authority;
     private Long id_username;

     public Autoridade() {
     }

     public Autoridade(String username, String authority, Long id_username) {
          this.username = username;
          this.authority = authority;
          this.id_username = id_username;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getUsername() {
          return username;
     }

     public void setUsername(String username) {
          this.username = username;
     }

     public String getAuthority() {
          return authority;
     }

     public void setAuthority(String authority) {
          this.authority = authority;
     }

     public Long getId_username() {
          return id_username;
     }

     public void setId_username(Long id_username) {
          this.id_username = id_username;
     }

}
