package com.santorini.santorini.interfacesJPAdao;

import com.santorini.santorini.entidades.Imagem_Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceImagemUserJPA extends JpaRepository<Imagem_Usuario, Long> {
     
     @Query("SELECT u FROM Imagem_Usuario u WHERE u.nome= :nome ")
     Imagem_Usuario buscarImagemPorNomeUsuario(@Param("nome") String nome);

     @Query("SELECT u FROM Imagem_Usuario u WHERE u.id_usuario= :id")
     Imagem_Usuario buscarImagemPorId(@Param("id") Long id);

}
