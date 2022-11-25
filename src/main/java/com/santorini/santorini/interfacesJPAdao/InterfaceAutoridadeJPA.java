package com.santorini.santorini.interfacesJPAdao;

import com.santorini.santorini.entidades.Autoridade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceAutoridadeJPA extends JpaRepository<Autoridade, Long> {
     
     @Query("SELECT u FROM Autoridade u WHERE u.id_username= :id ")
     Autoridade buscarAutoridadePorID(@Param("id") Long id);

     @Query("SELECT u FROM Autoridade u WHERE u.id_username= :id ")
     Autoridade buscarAutoridadePorIDUsuarioPai(@Param("id") Long id);

}
