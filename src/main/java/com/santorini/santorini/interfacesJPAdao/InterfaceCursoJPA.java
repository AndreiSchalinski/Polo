package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceCursoJPA extends JpaRepository<Curso, Long>{
    
    @Query("SELECT u FROM Curso u WHERE u.titulo_curso LIKE CONCAT('%',:tituloCurso,'%') ORDER BY u.titulo_curso ASC ")
    List<Curso> buscarCursoPorFragmento(@Param("tituloCurso") String tituloCurso);

    @Query("SELECT u FROM Curso u WHERE u.id= :cursoPai ")
    Curso buscarCursoPorID(@Param("cursoPai") Long id);

    @Query("SELECT u FROM Curso u WHERE u.titulo_curso= :nome ")
    Curso buscarCurosPorNome(@Param("nome") String nome);

    @Query("SELECT u FROM Curso u WHERE u.categoria= :idCategoria ")
    List<Curso> buscarCursosPorCategoriaIdCategoria(@Param("idCategoria") Long idCategoria);

}
