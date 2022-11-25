package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceCategoriaJPA extends JpaRepository<Categoria, Long> {
    
    @Query("SELECT u FROM Categoria u WHERE u.nome LIKE CONCAT('%',:nome,'%') ")
    List<Categoria> buscarCategoriaPorFragmento(@Param("nome") String nome);

    @Query("SELECT u FROM Categoria u ORDER BY u.nome ASC ")
    List<Categoria> buscarCategoriasPorOrdemAlfabetica();

}
