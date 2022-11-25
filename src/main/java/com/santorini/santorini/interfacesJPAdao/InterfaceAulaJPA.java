package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.santorini.santorini.entidades.Aula;

@Repository
public interface InterfaceAulaJPA extends JpaRepository<Aula, Long> {

     @Query("SELECT u FROM Aula u WHERE u.nome= :nome ")
     Aula buscarAulaPorNome(@Param("nome") String nome);

     @Query("SELECT u FROM Aula u WHERE u.id_curso= :idcurso ORDER BY u.nome ASC ")
     List<Aula> buscarTodasAsAulasPorCursoPai(@Param("idcurso") Long idcurso);

     @Query("SELECT u FROM Aula u WHERE u.id_modulo= :idmodulo ORDER BY u.nome ASC ")
     List<Aula> buscarTodasAsAulasPorModuloPai(@Param("idmodulo") Long id_modulo);
     
     @Query("SELECT u FROM Aula u WHERE u.id_curso= :idcurso ORDER BY u.nome ASC ")
     List<Aula> buscarTodasAsAulasPorCursoPaiOrdemCre(@Param("idcurso") Long idcurso);

     @Query("SELECT u FROM Aula u WHERE u.id= :id_aula")
     Aula buscarAulaPorId(@Param("id_aula") Long id);

}
