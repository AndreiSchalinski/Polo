package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceUsuarioJPA extends JpaRepository<Usuario, Long>{
    
    @Query("SELECT u FROM Usuario u WHERE u.nome LIKE CONCAT('%',:nome,'%') ")
    List<Usuario> buscarUsuariosPorFragmento(@Param("nome") String nome);

    @Query("SELECT u FROM Usuario u WHERE u.username= :user ")
    Usuario buscarPessoaPorUsuario(@Param("user") String usuario);

    @Query("SELECT u FROM Usuario u WHERE u.id= :id")
    Usuario buscarUsuarioPorID(@Param("id") Long id);

    @Query("SELECT u FROM Usuario u WHERE u.username= :user")
    List<Usuario> buscarPorNomeUsuario(@Param("user") String user);

    @Query("SELECT p FROM Usuario p WHERE p.nome= :nome")
    Usuario buscarUsuarioPorNomeCompleto(@Param("nome") String nome);

    @Query("SELECT u FROM Usuario u WHERE u.username= :nome OR u.email= :email ")
    Usuario buscarUsuarioPorEmail(@Param("nome") String username ,@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE u.email= :email ")
    Usuario buscarUsuarioPorEmail(@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE u.token= :token ")
    Usuario buscarUsuarioPorToke(@Param("token") String token);

}
