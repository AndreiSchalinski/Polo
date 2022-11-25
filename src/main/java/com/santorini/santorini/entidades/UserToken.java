package com.santorini.santorini.entidades;

public class UserToken {

     private String info2;
     private String token;
     public UserToken() {
     }
     public UserToken(String info2, String token) {
          this.info2 = info2;
          this.token = token;
     }
     public String getInfo2() {
          return info2;
     }
     public void setInfo2(String info2) {
          this.info2 = info2;
     }
     public String getToken() {
          return token;
     }
     public void setToken(String token) {
          this.token = token;
     }

     
     
}
