package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Progresso_Aula;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceProgressoAula extends JpaRepository<Progresso_Aula, Long> {

     @Query("SELECT u FROM Progresso_Aula u WHERE u.id_aula= :idaula AND u.id_usuario= :iduser ")
     Progresso_Aula buscarAulaFeitaPorIdAlunoIdAula(@Param("idaula") Long id_Aula, @Param("iduser") Long id_Aluno);

     @Query("SELECT u FROM Progresso_Aula u WHERE u.id_curso= :idcurso AND u.id_usuario= :iduser ")
     List<Progresso_Aula> buscarTodasAulasPorIdAulaIdUsuario(@Param("idcurso") Long id_Curso, @Param("iduser") Long id_Aluno);

     @Query("SELECT u FROM Progresso_Aula u WHERE u.id= :idprogresso ")
     Progresso_Aula buscarAulaBloqueadaPorId(@Param("idprogresso") Long id);
     
     @Query("SELECT count(u.id) FROM Progresso_Aula u WHERE u.id_curso = :idcurso AND u.id_usuario = :idusuario ")
     Integer buscarTotalCursosIniciado (@Param("idcurso") Long idcurso, @Param("idusuario") Long idusuario);

     @Query("SELECT count(u.id) FROM Progresso_Aula u WHERE u.aula_feita = 'true' AND u.id_curso= :idcurso AND u.id_usuario= :idusuario ")
     Integer buscarTotalCursosFinalizados (@Param("idcurso") Long idcurso, @Param("idusuario") Long idusuario);

     @Query("SELECT u FROM Progresso_Aula u WHERE u.aula_feita = 'true' AND u.id_usuario= :idusuario GROUP BY u.id_curso ORDER BY u.id_curso ")
     List<Progresso_Aula> buscarTodosOsCursosConcluidos(@Param("idusuario") Long idusuario);

}
