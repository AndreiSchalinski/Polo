package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.santorini.santorini.entidades.Modulo;

@Repository
public interface InterfaceModuloJPA extends JpaRepository<Modulo, Long> {

     @Query("SELECT u FROM Modulo u WHERE u.nome= :nomeModulo")
     Modulo buscarModuloPorNome(@Param("nomeModulo") String nomeModulo);

     
     @Query("SELECT u FROM Modulo u WHERE u.nome LIKE CONCAT('%',:nomeModulo,'%') ORDER BY u.nome ASC ")
     List<Modulo> buscarModuloPorFragmento(@Param("nomeModulo") String nomeModulo);
     
     
     @Query("SELECT u FROM Modulo u WHERE u.id_modulo= :id_modulo ")
     Modulo buscarModuloPorID(@Param("id_modulo") Long id);

     @Query("SELECT u FROM Modulo u WHERE u.id_curso= :idCurso ORDER BY u.nome ASC ")
     List<Modulo> buscarModulosPorIDCursoPai(@Param("idCurso") Long id);

}
