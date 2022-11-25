package com.santorini.santorini.interfacesJPAdao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.santorini.santorini.entidades.Video_Aula;

@Repository
public interface InterfaceVideoAula extends JpaRepository<Video_Aula,Long>{

    @Query("SELECT u FROM Video_Aula u WHERE u.id_aula = :id_aula ")
    Video_Aula buscarVideoAula(@Param("id_aula") Long id);
    
}
