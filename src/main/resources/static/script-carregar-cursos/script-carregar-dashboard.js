var CURSOS_EM_ANDAMENTO = new Object()
var CURSOS_PARA_COMPRA = new Object()
$(document).ready(function () {

     CURSOS_EM_ANDAMENTO.carregarCursosEmAndamento = function () {
          
          $.ajax({
               url: URL_SISTEMA.url+ "/progresso/cursos/carregar/cursos/fazendo",
               method: "GET",
               success: function (cursos) {
               
                    if (cursos == true) {
                         $("#tit-amb-recomendacoes").css({"display":"none"})
                         $(".recomendacoes-cursos-disponiveis-mensagem").html("<h5 class='titulos-modais'>Você ainda não iniciou um curso, adquiria ou comece seus estudos.</h5>")
                    } else {

                         for (let i = 0; i < cursos.length; i++) {
                              var curso = JSON.parse(cursos[i])

                              CURSOS_EM_ANDAMENTO.carregarImagensCursosLiberados(curso.id, curso.nome, curso.arquivo, i)

                         }

                    }

               },
               error: function (mensagem) {
                    alert(JSON.stringify(mensagem))
               }
          })
     }

     CURSOS_EM_ANDAMENTO.carregarProgressoCursosEmAndamento = function (cod_curso) {
          $.ajax({
               url: URL_SISTEMA.url+ "/progresso/curso/buscar/progresso/" + cod_curso,
               method: "GET",
               success: function (progresso) {

                    $("#progresso-curso-daschboard-" + cod_curso).html(progresso + "%")
                    $("#progresso-curso-daschboard-" + cod_curso).css({ "width": progresso + "%", "color": "white" })
               },
               error: function () {

               }
          })
     }

     CURSOS_EM_ANDAMENTO.carregarImagensCursosLiberados = function (cod_curso, nome, arquivo, i) {

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

                         $('.container-cursos-play-meus-cursos').append('<div class="box box-"' + (i + 1) + ' onclick="LOAD_MODAL.carregarModal(3)">' +
                              '<p class="titulo_nome_curso_andamento">' + nome + '</p>' +
                              '<div class="indicador-progresso progress" style="height:15px;">' +
                              '<div id="progresso-curso-daschboard-' + cod_curso + '" class="progress-bar" role="progressbar" background-color: #68B267;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>' +
                              '</div>' +
                              '<img class="cursosEmAndamento" src=' + link + ' alt="imagem de curso em andamento">' +
                              '<div class="registro-ultimo-acesso">' +
                              '</div>' +
                              '</div>')
                         CURSOS_EM_ANDAMENTO.carregarProgressoCursosEmAndamento(cod_curso)
                    }

               },

          });

     }

     //------------------------------------------------------------------------

     CURSOS_PARA_COMPRA.carregarCarouseisCategorias = function () {

          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/carregar/cursos/categorias",
               method: "GET",
               success: function (categorias) {

                    for (let i = 0; i < categorias.length; i++) {

                         var categoria = JSON.parse(categorias[i])

                         id = "categoria-curso-para-venda-" + categoria.id

                         CURSOS_PARA_COMPRA.carregarCarouseis(categoria.id, categoria.nome)
                    }

               },
               error: function () {
                    var mensagem = "Erro ao carregar lista de cursos disponíveis."
                    $("#modal_aviso").html(CURSOS_LIBERADOS.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
               }
          })
     }

     CURSOS_PARA_COMPRA.carregarCarouseis = function (cod_categoria,nomeCategoria) {

          $.ajax({
               url: URL_SISTEMA.url+ "/cursos/carregar/cursos/carousell/" + cod_categoria,
               method: "GET",
               success: function (cursos) {

                    $("#recomendacoes-cursos-disponiveis").append('<div id="categoria-'+cod_categoria+'" class="cursos-recomendacoes-em-seguida"><h4 id="tit-categoria-curso-'+cod_categoria+'" class="titulos-modais tit-categoria-curso"></h4></div>')
                    
                    $("#tit-categoria-curso-"+cod_categoria).html(nomeCategoria)
                    
                    if (cursos == 'true') {
                         $("#categoria-"+cod_categoria).append("<h5 class='titulos-modais'>Não há cursos cadastrados ou ativos para esta categoria.</h5>")
                    } else {

                         var lista = '<div class="owl-carousel owl-theme">';

                         for (let i = 0; i < cursos.length; i++) {

                              var curso = JSON.parse(cursos[i])
                              
                              if (curso.idCategoria == cod_categoria) {
                                   
                                   lista +='<div id="cod-cat-curso-'+cod_categoria+'" class="box item '+nomeCategoria+'" onclick="CURSOS_PARA_COMPRA.buscarLayoutInfosCursoParaVenda('+curso.id+')">'+
                                        '<a href="#" class="opcao-curso-recomendado">'+
                                          '<div>'+
                                            '<p class="titulo_nome_curso_andamento">'+curso.nome+'</p>'+
                                            '<img id="imagem-curso-para-venda-'+curso.id+'" class="cursos-recomendados" alt="imagem de curso em andamento">'+
                                          '</div>'+
                                        '</a>'+
                                      '</div>' 
     
                                 CURSOS_PARA_COMPRA.carregarImagensCursosLiberados(curso.id, curso.nome, curso.arquivo)
     
                              }
                              
                              
                         }

                         lista += '</div>';

                         $("#categoria-"+cod_categoria).append(lista)

                    }                   

                    $("#amb-exibi-conteudo").append('<script src="script/owlCarousel.js"></script>')

               },
               error: function () {
                    var mensagem = "Erro ao carregar lista de cursos disponíveis."
                    $("#modal_aviso").html(CURSOS_LIBERADOS.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
               }
          })
     }

     CURSOS_PARA_COMPRA.carregarImagensCursosLiberados = function (cod_curso, nome, arquivo) {
          
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

                         $('#imagem-curso-para-venda-' + cod_curso).attr('src', link)

                    }

               },

          });

     }

     CURSOS_PARA_COMPRA.buscarLayoutInfosCursoParaVenda = function (id) {
          movimentarScroll(0,400)
          $("#cursos-em-andamento").load("modal_telas/modais_tela_informacoes_curso/modal_informacoes_curso.html")
          $("#recomendacoes-cursos-disponiveis").remove()
          $("#tit-amb-recomendacoes").remove()
          
          setTimeout(function () {
               
               CURSOS.buscarInformacoesCurso(id)
               CURSOS.carregarImagensCursosDisponiveisInfo(id)
          }, 400);

     }

})

function movimentarScroll(index, velocidade) {
     $("#exibicao-conteudo2").animate({
       scrollTop: index
     }, velocidade);
   }