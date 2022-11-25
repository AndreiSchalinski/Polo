var CURSOS = new Object();
$(document).ready(function () {

     CURSOS.carregarCursosDisponiveis = function () {
          $.ajax({
               url: URL_SISTEMA.url+"/cursos/carregar/cursos",
               method: "GET",
               success: function (curso) {

                    if (curso == true) {
                         $(".container-cursos-conteudos-disponiveis").html("<h5 class='titulos-modais'>Ainda não há cursos disponíveis na plataforma.</h5>")
                    } else {
                         for (let i = 0; i < curso.length; i++) {

                              var cursos = JSON.parse(curso[i])
                              CURSOS.carregarImagensCursosDisponiveis(cursos.id, cursos.nome, cursos.arquivo)
                              
                         }  
                    }

                    

               },
               error: function () {
                    var mensagem = "Erro ao carregar lista de cursos disponíveis."
                    $("#modal_aviso").html(CURSOS.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
               }
          })
     }

     CURSOS.carregarImagensCursosDisponiveis = function (cod_curso, nome, arquivo) {

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
                         
                         $('.container-cursos-conteudos-disponiveis').append('<div style="cursor:pointer;" class="curso-conteudo-formacoes" onclick="CURSOS.buscarLayoutInfos(' + cod_curso + ')">' +
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

     CURSOS.buscarLayoutInfos = function (id) {
          
          $("#cursos-em-andamento").load("modal_telas/modais_tela_informacoes_curso/modal_informacoes_curso.html")

          setTimeout(function () {
               CURSOS.buscarInformacoesCurso(id)
          }, 600);

          setTimeout(function () {
               CURSOS.carregarImagensCursosDisponiveisInfo(id)
          }, 600);

          setTimeout(function () {
               CURSOS.buscarInformacoesModulo(id);
          }, 600);

     }

     CURSOS.buscarInformacoesCurso = function (cod_curso) {
          
          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/buscar/informacoes/curso/" + cod_curso,
               method: "GET",
               success: function (curso) {
                    
                    $("#tit-curso-modais1").html(curso.tituloCurso)
                    $("#tit-curso-modais2").html(curso.tituloCurso)
                    $("#tit-curso-modais3").html(curso.tituloCurso)
                    $("#pre-req-curso").html(curso.preRequisito)
                    $("#carga-horaria-curso").html(curso.cargaHoraria+" hrs.")
                    $("#valor-curso").html("R$"+curso.preco+" reais.")
                    $(".accordion-grade-curricular").html(
                         "<p style='padding:10px 10px; border-radius:5px;' class='accordion-grade-curricular-btn'>DESCRIÇÃO DO CURSO<br>"+curso.descricao+"<br><br>RESULTADO DE APRENDIZADO<br>"+curso.resultadoAprendizado+"</p>"+
                         '<hr style="color:white;">'+
                         '<h4 style="color:white;">Módulos:</h4>')
                    $("#btn-compra-curso").attr('onclick','CURSO_COMPRADO.buscarFomularioCompra('+curso.id+')')
                         
                         
               },
               error: function () {

               }
          })
     }

     CURSOS.carregarImagensCursosDisponiveisInfo = function (id) {

          var cod_curso = id
          var nome = "info";
          var arquivo = "info"
          
          
          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/cursos/disponivel/imagens/cursos/abertura/" + cod_curso + "/" + nome + "/" + arquivo,
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
                         $('.cursos-recomendados').attr("src",link)

                    }
                    
               },
          });
          
          CURSOS.buscarInformacoesModulo(id);

     }

     

     CURSOS.buscarInformacoesModulo = function (cod_curso) {

          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/buscar/informacoes/modulo/" + cod_curso,
               method: "GET",
               success: function (modulos) {
                    
                    if (modulos == true) {
                         $(".accordion-grade-curricular").html("<h4 style='padding:10px 10px; border-radius:5px;' class='accordion-grade-curricular-btn'>Curso está com módulos indispoíveis no momento.</h4>")
                    } else {

                         if (modulos.length > 0) {
                              for (let i = 0; i < modulos.length; i++) {

                                   $(".accordion-grade-curricular").append(
                                        '<div class="accordion-modulo accordion-item">' +
                                        '<div class="lista-modulos" style="display:none;">' + modulos[i].idModulo + '</div>' +
                                        '<h2 class="accordion-header" id="flush-heading' + modulos[i].idModulo + '">' +
                                        '<button class="accordion-grade-curricular-btn accordion-button collapsed" type="button"' +
                                        'data-bs-toggle="collapse" data-bs-target="#gradeCurricularCurso' + modulos[i].idModulo + '" aria-expanded="false"' +
                                        'aria-controls="gradeCurricularCurso' + modulos[i].idModulo + '">' +
                                        modulos[i].nome +
                                        '</button>' +
                                        '</h2>' +
     
                                        '<div id="gradeCurricularCurso' + modulos[i].idModulo + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + modulos[i].idModulo + '"' +
                                        'data-bs-parent="#accordionFlushGrade">' +
                                        '<div class="lista-materias-grade-curricular accordion-body">' +
                                        '<ul id="modulo-' + modulos[i].idModulo + '" class="list-modulo-cursos-info">' +
     
                                        '</ul>' +
                                        '</div>' +
                                        '</div>' +
     
                                        '</div>'
                                   )
     
                              }

                              CURSOS.buscarInformacoesAulas(cod_curso)
                         } else {
                              $(".accordion-grade-curricular").html("<h4 style='padding:10px 10px; border-radius:5px;' class='accordion-grade-curricular-btn'>Curso está com módulos desativados no momento.</h4>")
                         }

                         
                    }




               },
               error: function () {

               }
          })

     }

     CURSOS.buscarInformacoesAulas = function (cod_curso) {

          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/buscar/informacoes/aula/" + cod_curso,
               method: "GET",
               success: function (aulas) {

                    var id = "";

                    
                    
                    for (let i = 0; i < document.getElementsByClassName("accordion-modulo").length; i++) {

                         id = '#modulo-' + document.getElementsByClassName("lista-modulos")[i].textContent

                         for (let j = 0; j < aulas.length; j++) {

                              if (document.getElementsByClassName("lista-modulos")[i].textContent == aulas[j].id_modulo) {
                                   $(id).append('<li><p>' + aulas[j].nome + '</p></li>')
                              }

                         }
                         
                         if ($(id+" li").length == 0) {
                              
                              $(id).append('<li><p>Não há aulas disponíveis nesta módulo.</p></li>')
                         }

                    }
                    
               },
               error: function () {

               }
          })



     }

     CURSOS.modalAviso = function (mensagem) {
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">AVISO!</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p>' + mensagem + '</p>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
          return modal;
     }

})