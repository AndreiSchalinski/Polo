package com.santorini.santorini.interfacesJPAdao;

import java.util.List;

import com.santorini.santorini.entidades.Curso_has_Aluno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceLiberaCurso extends JpaRepository<Curso_has_Aluno, Long>{
     
     @Query("SELECT u FROM Curso_has_Aluno u WHERE u.id_usuario= :iduser ")
     List<Curso_has_Aluno> buscarCursosLiberadosPorIDAluno(@Param("iduser") Long id_user);

     @Query("SELECT u FROM Curso_has_Aluno u WHERE u.id_usuario= :iduser AND u.id_curso= :idcurso ")
     Curso_has_Aluno buscarCursoLiberadoPosIdCursoIdAluno(@Param("iduser") Long idus,@Param("idcurso") Long id);

     @Query("SELECT u FROM Curso_has_Aluno u WHERE u.id_curso= :idcurso ")
     Curso_has_Aluno buscarCursosCompradosPodIdCurso(@Param("idcurso") Long idcurso);

}
