package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Plano_De_Estudo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfacePlanoDeEstudo extends JpaRepository<Plano_De_Estudo, Long>{

     @Query("SELECT u FROM Plano_De_Estudo u WHERE u.id_usuario= :idusuario ORDER BY u.nome ASC ")
     List<Plano_De_Estudo> buscarTodosOsPlanoDeEstudosIdUsuario(@Param("idusuario") Long id_usuario);

     @Query("SELECT u FROM Plano_De_Estudo u WHERE u.id= :idplano AND u.id_usuario= :idaluno ")
     Plano_De_Estudo buscarPlanoPorIdplanoIdAluno(@Param("idplano") Long idplano,@Param("idaluno") Long idaluno);

}
