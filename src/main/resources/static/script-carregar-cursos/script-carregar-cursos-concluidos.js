var CURSOS_CONCLUIDOS = new Object();
$(document).ready(function () {
     
     CURSOS_CONCLUIDOS.direcionarBuscaCursosConcluidos = function (index) {
          if (index == 1) {
               CURSOS_CONCLUIDOS.carregarCursosLiberados()
          }
     }

     CURSOS_CONCLUIDOS.carregarCursosLiberados = function () {
          $.ajax({
               url: URL_SISTEMA.url+ "/progresso/cursos/carregar/cursos/concluidos",
               method: "GET",
               success: function (curso) {
                    
                    if (curso == true) {
                         $(".titulos-modais").html("<h4 style='margin:0 0 5px 0;'>Cursos Concluídos</h4><h5>Ainda não há cursos concluídos para visualização.</h5>")
                    } else {
                         for (let i = 0; i < curso.length; i++) {

                              var cursos = JSON.parse(curso[i])
                              
                              CURSOS_CONCLUIDOS.carregarImagensCursosLiberados(cursos.id, cursos.nome, cursos.arquivo)
     
                         } 
                    } 

               },
               error: function () {
                    
               }
          })
     }

     CURSOS_CONCLUIDOS.carregarImagensCursosLiberados = function (cod_curso, nome, arquivo) {

          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/cursos/disponivel/imagens/cursos/" + cod_curso + "/" + nome + "/" + arquivo,
               method: "GET",
               cache: false,
               xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                         if (xhr.readyState == 2) {
                              if (xhr.status == 200) {
                                   xhr.responseType = "blob";
                              } else {
                                   xhr.responseType = "text";
                              }
                         }
                    };
                    return xhr;
               },
               success: function (data) {

                    //Convert the Byte Data to BLOB object.

                    var blob = new Blob([data], { type: "application/octetstream" });

                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                         window.navigator.msSaveBlob(blob, arquivo);
                    } else {
                         var url = window.URL || window.webkitURL;
                         link = url.createObjectURL(blob);
                         $('.container-cursos-play-meus-cursos').append('<div style="cursor:pointer;" class="curso-conteudo-formacoes" onclick="CURSOS_CONCLUIDOS.buscarLayoutInfosLiberado(' + cod_curso + ')">' +
                              '<a class="opcao-curso-recomendado">' +
                              '<div>' +
                              '<p class="titulo_nome_curso_andamento">' + nome + '</p>' +
                              '<img class="cursos-recomendados" src=' + link + ' alt="imagem de curso em andamento">' +
                              '</div>' +
                              '</a>' +
                              '</div>')

                    }

               },



          });

     }

     CURSOS_CONCLUIDOS.buscarLayoutInfosLiberado = function (id) {

          $("#cursos-concluidos-lista").load("modal_telas/modais_tela_meu_aprendizado/modal_informacoes_meu_curso.html")

          setTimeout(function () {

               CURSOS_LIBERADOS.buscarInformacoesCursoLiberado(id)
               
          }, 400);
          setTimeout(function () {

               
               CURSOS_LIBERADOS.carregarImagensCursosDisponiveisInfoLiberado(id)
          }, 400);

     }

})