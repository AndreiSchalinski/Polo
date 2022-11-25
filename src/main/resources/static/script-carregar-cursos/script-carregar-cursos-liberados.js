var CURSOS_LIBERADOS = new Object();

$(document).ready(function name() {

     CURSOS_LIBERADOS.carregarCursosLiberados = function () {
          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/carregar/cursos/liberados",
               method: "GET",
               success: function (curso) {

                    if (curso == true) {
                         $(".container-cursos-play-meus-cursos-mensagem").html("<h5 class='titulos-modais'>Você ainda não tem cursos, adquira um e inicie seus estudos.</h5>")
                    } else {
                         for (let i = 0; i < curso.length; i++) {

                              var cursos = JSON.parse(curso[i])
                              CURSOS_LIBERADOS.carregarImagensCursosLiberados(cursos.id, cursos.nome, cursos.arquivo)
                         } 
                    }

               },
               error: function (mensagem) {
                    //var mensagem = "Erro ao carregar lista de cursos disponíveis."
                    $("#modal_aviso").html(CURSOS_LIBERADOS.modalAviso(JSON.stringify(mensagem)));
                    $("#modal_aviso").modal("show");
               }
          })
     }

     CURSOS_LIBERADOS.carregarImagensCursosLiberados = function (cod_curso, nome, arquivo) {

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
                         $('.container-cursos-play-meus-cursos').append('<div style="cursor:pointer;" class="curso-conteudo-formacoes" onclick="CURSOS_LIBERADOS.buscarLayoutInfosLiberado(' + cod_curso + ')">' +
                              '<a class="opcao-curso-recomendado">' +
                              '<div>' +
                              '<p class="titulo_nome_curso_andamento">' + nome + '</p>' +
                              '<div class="indicador-progresso progress" style="height:15px;">'+
                              '<div id="progresso-curso-daschboard-'+cod_curso+'" class="progress-bar" role="progressbar" background-color: #68B267;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>' +
                              '</div>'+
                              '<img class="cursos-recomendados" src=' + link + ' alt="imagem de curso em andamento">' +
                              '</div>' +
                              '</a>' +
                              '</div>')
                              CURSOS_LIBERADOS.carregarProgressoCursosEmAndamento(cod_curso)
                    }

               },



          });

     }

     CURSOS_LIBERADOS.carregarProgressoCursosEmAndamento = function (cod_curso) {
          $.ajax({
               url: URL_SISTEMA.url+ "/progresso/curso/buscar/progresso/"+cod_curso,
               method: "GET",
               success: function (progresso) {
                    
                    if (progresso > 0) {
                         $("#progresso-curso-daschboard-"+cod_curso).html(progresso+"%")
                         $("#progresso-curso-daschboard-"+cod_curso).css({"width":progresso+"%","color":"white"})
                    } else {
                         $("#progresso-curso-daschboard-"+cod_curso).html("INICIE O CURSO")
                         $("#progresso-curso-daschboard-"+cod_curso).css({"width":"100%","color":"white","background":"transparent"})
                    }

                    
               },
               error: function () {

               }
          })
     }



     CURSOS_LIBERADOS.buscarLayoutInfosLiberado = function (id) {

          $("#cursos-em-andamento").load("modal_telas/modais_tela_meu_aprendizado/modal_informacoes_meu_curso.html")

          setTimeout(function () {

               CURSOS_LIBERADOS.buscarInformacoesCursoLiberado(id)
               
          }, 400);
          setTimeout(function () {

               
               CURSOS_LIBERADOS.carregarImagensCursosDisponiveisInfoLiberado(id)
          }, 400);

     }

     CURSOS_LIBERADOS.buscarInformacoesCursoLiberado = function (cod_curso) {

          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/buscar/informacoes/curso/" + cod_curso,
               method: "GET",
               success: function (curso) {

                    $("#tit-curso-modais1").html(curso.tituloCurso)
                    $("#tit-curso-modais2").html(curso.tituloCurso)
                    $("#tit-curso-modais3").html(curso.tituloCurso)
                    $("#pre-req-curso").html(curso.preRequisito)
                    $("#carga-horaria-curso").html(curso.cargaHoraria + " hrs.")
                    $("#valor-curso").html("R$" + curso.preco + " reais.")
                    $(".accordion-grade-curricular").html("<h4 style='padding:10px 10px; border-radius:5px;' class='accordion-grade-curricular-btn'>O QUE VOCÊ VERÁ<h4>")    

                    $(".informacoes-gerais-curso").html("<p style='padding:10px 10px; margin:0 5px -40px 0; font-weight:0;' ><strong>DESCRIÇÃO DO CURSO</strong><br><br>" + curso.descricao + "<br><br><strong>RESULTADO DE APRENDIZADO</strong><br><br>" + curso.resultadoAprendizado + "</p>")

                    $(".tit-amb-acessado-comprar-curso").html('<button type="button" class="btn-comprar-curso btn btn-success" onclick="CURSOS_LIBERADOS.buscarModalAtividades('+curso.id+')">INICIAR CURSO</button>')
               },
               error: function () {

               }
          })
     }

     CURSOS_LIBERADOS.buscarModalAtividades = function (cod_curso) {
          $("#amb-exibi-conteudo").load("modal_telas/modais_tela_meu_aprendizado/modal_atividades.html");
          
          setTimeout(function () {
               $("#amb-exibi-conteudo").append("<script>CURSO_ATIVIDADE.carregarInformacoesCursoAtividade("+cod_curso+")</script>")
          },400)

          
     }

     CURSOS_LIBERADOS.carregarImagensCursosDisponiveisInfoLiberado = function (id) {

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
                         $('.cursos-recomendados').attr("src", link)

                    }

               },
          });

          CURSOS_LIBERADOS.buscarInformacoesModuloLiberado(id);

     }



     CURSOS_LIBERADOS.buscarInformacoesModuloLiberado = function (cod_curso) {

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

                              CURSOS_LIBERADOS.buscarInformacoesAulasLiberado(cod_curso)
                         } else {
                              $(".accordion-grade-curricular").html("<h4 style='padding:10px 10px; border-radius:5px;' class='accordion-grade-curricular-btn'>Curso está com módulos desativados no momento.</h4>")
                         }


                    }




               },
               error: function () {

               }
          })

     }

     CURSOS_LIBERADOS.buscarInformacoesAulasLiberado = function (cod_curso) {

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

                         if ($(id + " li").length == 0) {

                              $(id).append('<li><p>Não há aulas disponíveis nesta módulo.</p></li>')
                         }

                    }

               },
               error: function () {

               }
          })



     }

     CURSOS_LIBERADOS.modalAviso = function (mensagem) {
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