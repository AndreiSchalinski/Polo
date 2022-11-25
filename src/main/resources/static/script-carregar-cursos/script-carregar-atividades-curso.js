var CURSO_ATIVIDADE = new Object();

$(document).ready(function () {

     CURSO_ATIVIDADE.carregarInformacoesCursoAtividade = function (cod_curso) {

          $.ajax({
               url: URL_SISTEMA.url+"/atividade/carregar/aula/" + cod_curso,
               method: "GET",
               success: function (curso) {

                    setTimeout(function () {
                         $("#curso-atividade-atual").html(curso.tituloCurso)
                    }, 200)

                    CURSOS_LIBERADOS.carregarImagensCursosAtivade(cod_curso)

               },
               error: function () {

               }
          })

          setTimeout(function () {
               CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulas(cod_curso)
          }, 350)


     }

     CURSOS_LIBERADOS.carregarImagensCursosAtivade = function (cod_curso) {

          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/cursos/disponivel/imagens/cursos/atividade/" + cod_curso,
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
                         $('#imagem-abertura-curso-atividade').attr("src", link)

                    }

               },



          });

     }

     CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulas = function (cod_curso) {

          if (cod_curso == 'null') {
               $("#lista-atividades-aula-aula").html("<option value='null'>AULA ATUAL</option>")
               $("#lista-de-aulas-atividades").html("<li><a class='dropdown-item' href='#'>SELECIONE UM MÓDULO ANTES</a></li>")
          } else {
               $.ajax({
                    url: URL_SISTEMA.url+ "/atividade/carregar/aula/curso/aulas/" + cod_curso,
                    method: "GET",
                    success: function (aulas) {

                         var listaDeAulasDrop = ""

                         if (aulas.length == 0) {
                              $("#tit-resumo-aula").html("Este curso está sem aulas no momento.")
                              listaDeAulasDrop += "<li class='lista-aulas-concluidas'><a style='font-size: 15px; text-transform: uppercase;' class='dropdown-item'>Este curso está sem aulas</a></li>"
                         } else {
                              
                              var codAula = "";
     
                              for (let i = 0; i < aulas.length; i++) {
     
                                   listaDeAulasDrop += "<li class='lista-aulas-concluidas'><a style='font-size: 15px; text-transform: uppercase;' class='dropdown-item' id='aula-" + aulas[i].id + "' href='#' onclick='CURSO_ATIVIDADE.validarInicioDaAula(" + aulas[i].id + ")'>" + aulas[i].nome + "</a></li>"
                                   CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulasConcluidas(aulas[i].id)
                                   codAula = aulas[i].id
                              }
                              CURSO_ATIVIDADE.salvarProgressoAula(codAula)  
                         }

                         
                         $("#lista-de-aulas-atividades").html(listaDeAulasDrop)

                    },
                    error: function () {

                    }
               })
          }

     }

     CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulasConcluidas = function (cod_aula) {

          $.ajax({
               url: URL_SISTEMA.url+ "/atividade/carregar/aula/curso/aulas/concluidas/" + cod_aula,
               method: "GET",
               success: function (cursoFeito) {

                    if (cursoFeito == true) {
                         $("#aula-" + cod_aula).css({ "background": "#198754", "color": "white" })
                         $("#aula-" + cod_aula).addClass("feito")
                    }

               },
               error: function () {

               }
          })

     }

     //até acima tudo certo.

     CURSO_ATIVIDADE.carregarNomeVideoAula = function (cod_aula) {

          if (cod_aula == 'null') {
               var video = document.getElementById("aula-atividade-video")
               video.pause();
          } else {
               $.ajax({
                    url: URL_SISTEMA.url+ "/arquivos/video/carregar/" + cod_aula,
                    method: "GET",
                    success: function (nomeVideo) {

                         CURSO_ATIVIDADE.carregarVideo(nomeVideo, cod_aula);

                    },
                    error: function () {

                         
                    }
               })

          }
     }

     CURSO_ATIVIDADE.salvarProgressoAula = function (cod_aula) {

          $.ajax({
               url: URL_SISTEMA.url+ "/progresso/curso/salvar/" + cod_aula,
               method: "GET",
               success: function (progresso) {

                    if (progresso == 0) {
                         $("#progress-andamento-curso").css({ "width": "100%" })
                         $("#progress-andamento-curso").html("INICIE O SEU CURSO")
                         $("#status-curso-concluida").html("STATUS CURSO: INICIAR")
                    } else {
                         $("#progress-andamento-curso").html(progresso + "%")
                         $("#progress-andamento-curso").css({ "width": progresso + "%" })
                         $("#status-curso-concluida").html("STATUS CURSO: EM ANDAMENTO COM " + progresso + "% CONCLUÍDO.")

                    }

                    if (progresso == 100) {
                         $("#status-curso-concluida").html("STATUS CURSO: FINALIZADO")
                         $("#status-curso-concluida").css({ "color": "white", "border-radius": "5px", "background": "#198754", "padding": "2px 8px" })
                         var curso = $("#curso-atividade-atual").text()
                         $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso("Curso de " + curso + " está concluído, parabéns. Entrar em contato com editora para solicitar certificado."));
                         $("#modal_aviso").modal("show");
                    }

               },
               error: function () {


               }
          })
     }

     CURSO_ATIVIDADE.carregarVideo = function (nomeVideo, cod_aula) {

          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/video/carregar/download/bytes/" + cod_aula + "/" + nomeVideo,
               method: "GET",
               cache: false,
               xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                         

                         xhr.onprogress = (event) => {

                              MODULO.exibirModalBarraProgress()

                              var result = ((event.loaded/event.total)*100)

                              $("#barra-progresso").css({ "background-color": "orange" })
                              $("#porcent-text").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>CARREGANDO VÍDEO!</span>")
                              $("#barra-progresso").css({ "width": parseInt(result) + "%" })
                              $("#porcent").html(parseInt(result)+ "%")

                              if (result == 100) {
                                   $("#modal_aviso").modal("hide");
                              }
                              
                          }


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
                         window.navigator.msSaveBlob(blob, nomeVideo);
                    } else {
                         var url = window.URL || window.webkitURL;
                         link = url.createObjectURL(blob);

                         $("#aula-atividade-video").attr("src", link)
                         document.getElementsByClassName("info-aula")[0].textContent = cod_aula

                    }
               }
          });

          CURSO_ATIVIDADE.carregarNomeMateriaias(cod_aula)
     }

     CURSO_ATIVIDADE.carregarNomeMateriaias = function (cod_aula) {

          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/materiais/carregar/" + cod_aula,
               method: "GET",
               success: function (materiais) {

                    if (materiais !== true) {
                         $("#lista-materiais-aulas").html("");
                         for (let i = 0; i < materiais.length; i++) {
                              CURSO_ATIVIDADE.carregarMateriais(materiais[i], cod_aula)
                         }
                    } else {
                         $("#lista-materiais-aulas").html("");
                         $("#lista-materiais-aulas").html("<p id='mensagem-materiais' style='color:yellow;'>NÃO HÁ MATERIAIS PARA BAIXAR</p>");
                    }

               },
               error: function () {
                    
               }
          })
     }


     var index = 0;

     CURSO_ATIVIDADE.carregarMateriais = function (nomeMaterial, cod_aula) {

          index = 0
          $.ajax({
               url: URL_SISTEMA.url+ "/arquivos/materiais/carregar/download/bytes/" + cod_aula + "/" + nomeMaterial,
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

                    index++

                    //Convert the Byte Data to BLOB object.

                    var blob = new Blob([data], { type: "application/octetstream" });

                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                         window.navigator.msSaveBlob(blob, nomeMaterial);
                    } else {
                         var url = window.URL || window.webkitURL;
                         link = url.createObjectURL(blob);

                         $("#lista-materiais-aulas").append("<li id='materiais' style='cursor:pointer; font-size:18px; background:#198754; text-align:center; border-radius:5px;'><a style='text-decoration:none; color:white; white-space: nowrap;' href=" + link + " download=" + nomeMaterial + "><p>BAIXAR MATERIAL " + (index) + "</a></li>");

                    }

               }

          });

     }

     CURSO_ATIVIDADE.validarInicioDaAula = function (cod_aula) {

          var confirm = 'true'
          $.ajax({
               url: URL_SISTEMA.url+ "/atividade/validar/aula/curso/iniciar/" + cod_aula + "/" + confirm,
               method: "POST",
               success: function (result) {

                    if (result == true) {
                         var aula = $("#aula-" + cod_aula).text()
                         $("#aula-atual-atividade").html("NOME: " + aula)
                         var valor = $("#aula-" + cod_aula).is(".feito")
                         CURSO_ATIVIDADE.buscarTextoAula(cod_aula)

                         

                         if (valor == true) {
                              $("#status-atividade-feita").html("STATUS AULA: CONCLUÍDA")
                              $("#status-atividade-feita").css({ "color": "white", "border-radius": "5px", "background": "#198754", "padding": "2px 8px" })
                         } else {
                              $("#status-atividade-feita").html("STATUS AULA: PENDENTE")
                              $("#status-atividade-feita").css({ "color": "white", "border-radius": "5px", "background": "red", "padding": "2px 8px" })
                         }

                         CURSO_ATIVIDADE.carregarNomeVideoAula(cod_aula)
                         CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulasConcluidas(cod_aula);
                    } else {
                         $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso("Acesso a aula não é possível, precisa terminar aula anterior primeiro."));
                         $("#modal_aviso").modal("show");
                    }
               },
               error: function () {

               }
          })
     }

     CURSO_ATIVIDADE.buscarTextoAula = function (cod_aula) {
          $.ajax({
               url: URL_SISTEMA.url+"/atividade/validar/aula/curso/aula/texto/" + cod_aula,
               method:"GET",
               success:function (aula) {
                    $("#tit-resumo-aula").html("RESUMO DA AULA: "+aula.nome)
                    $("#texto-aula-atual").html(aula.resumo)
               },
               error:function () {
                    
               }
          })
     }

     CURSO_ATIVIDADE.validarTerminoDaAula = function (cod_aula, confirm) {

          $.ajax({
               url: URL_SISTEMA.url+ "/atividade/validar/aula/curso/" + cod_aula + "/" + confirm,
               method: "POST",
               success: function (mensagem) {

                    if (mensagem !== true) {
                         $("#status-atividade-feita").html("STATUS AULA: CONCLUÍDA")
                         $("#status-atividade-feita").css({ "color": "white", "border-radius": "5px", "background": "#198754", "padding": "2px 8px" })
                         CURSO_ATIVIDADE.salvarProgressoAula(cod_aula)
                         CURSO_ATIVIDADE.carregarInformacoesCursoAtividadeAulasConcluidas(cod_aula)
                         $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso(mensagem));
                         $("#modal_aviso").modal("show");
                    }


               },
               error: function () {

               }
          })
     }

     CURSO_ATIVIDADE.cadastrarPlanoDeEstudo = function () {
          var nomePlano = $("#input-novo-plano-estudo").val()
          var descricaoPlano = $("#input-descricao-novo-plano-estudo").val()

          if (nomePlano == '' && descricaoPlano == '') {
               $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso("Informar nome do plano e sua descrição."));
               $("#modal_aviso").modal("show");
          } else {

               var plano = new Object();

               plano.nome = nomePlano
               plano.descricao = descricaoPlano

               $.ajax({
                    url: URL_SISTEMA.url+ "/plano/salvar",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(plano),
                    success: function (mensagem) {
                         $("#input-novo-plano-estudo").val('')
                         $("#input-descricao-novo-plano-estudo").val('')
                         CURSO_ATIVIDADE.carregarPlanoDeEstudo()
                         $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso(mensagem));
                         $("#modal_aviso").modal("show");
                    },
                    error: function () {

                    }

               })
          }

     }

     CURSO_ATIVIDADE.carregarPlanoDeEstudo = function () {

          $.ajax({
               url: URL_SISTEMA.url+ "/plano/carregar/",
               method: "GET",
               success: function (planos) {

                    if (planos == true) {
                         $(".container-planos-de-estudos").html("<h5 class='titulos-modais'>Você ainda não criou um plano, faça um novo plano e inicie seus estudos.</h5>")
                    } else {
                         var lista = "";
                    for (let i = 0; i < planos.length; i++) {

                         lista += '<div style="width:100%;" class="accordion-modulo accordion-item">' +

                              '<h2 class="accordion-header" id="flush-heading' + planos[i].id + '">' +
                              '<button class="accordion-grade-curricular-btn accordion-button collapsed" type="button"' +
                              'data-bs-toggle="collapse" data-bs-target="#gradeCurricularCurso' + planos[i].id + '" aria-expanded="false"' +
                              'aria-controls="gradeCurricularCurso' + planos[i].id + '">' +
                              planos[i].nome +
                              '</button>' +
                              '</h2>' +

                              '<div style="width:100%;" id="gradeCurricularCurso' + planos[i].id + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + planos[i].id + '"' +
                              'data-bs-parent="#accordionFlushGrade">' +
                              '<div  class="lista-materias-grade-curricular accordion-body">' +
                              '<ul id="modulo-' + planos[i].id + '" class="list-modulo-cursos-info">' +
                              '<p style="word-wrap:break-word;">' + planos[i].descricao + '</p>' +
                              '<li style="border:none; margin-top:10px; justify-content:center;"><button style="margin-right:10px;" type="button" class="btn btn-success" onclick="CURSO_ATIVIDADE.exibirModalEditarPlano(' + planos[i].id + ',' + planos[i].idUsuario + ')">EDITAR</button><button type="button" class="btn btn-danger" onclick="CURSO_ATIVIDADE.exibirModalExcluirPlano(' + planos[i].id + ',' + planos[i].idUsuario + ')">APAGAR</button></li>' +
                              '</ul>' +
                              '</div>' +
                              '</div>' +

                              '</div>'

                    }

                    $(".accordion-grade-curricular").html(lista)
                    }

               },
               error: function () {

               }
          })
     }

     CURSO_ATIVIDADE.excluirPlanoDeEstudos = function (idplano, idaluno) {
          $.ajax({
               url: URL_SISTEMA.url+ "/plano/deletar/" + idplano + "/" + idaluno,
               method: "DELETE",
               success: function (mensagem) {
                    CURSO_ATIVIDADE.carregarPlanoDeEstudo()
                    $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
               },
               error: function () {

               }

          })
     }

     CURSO_ATIVIDADE.buscarPorIdPlanoDeEstudos = function (idplano, idaluno) {
          $.ajax({
               url: URL_SISTEMA.url+ "/plano/buscar/" + idplano + "/" + idaluno,
               method: "GET",
               success: function (plano) {
                    $("#input-edita-plano-estudo").val(plano.nome)
                    $("#input-edita-descricao-novo-plano-estudo").val(plano.descricao)
               },
               error: function () {

               }

          })
     }

     CURSO_ATIVIDADE.exibirModalEditarPlano = function (idplano, idaluno) {
          CURSO_ATIVIDADE.buscarPorIdPlanoDeEstudos(idplano, idaluno)
          $("#modal_aviso").html(CURSO_ATIVIDADE.modalEditarPlano(idplano, idaluno));
          $("#modal_aviso").modal("show");
     }

     CURSO_ATIVIDADE.exibirModalExcluirPlano = function (idplano, idaluno) {
          
          $("#modal_aviso").html(CURSO_ATIVIDADE.modalExcluirPlano(idplano, idaluno));
          $("#modal_aviso").modal("show");
     }

     CURSO_ATIVIDADE.quebrarLinhaDescricaoPlano = function (index) {
          if (index == 1) {
               document.getElementById("input-descricao-novo-plano-estudo").value += "<br>"
          } else {
               document.getElementById("input-edita-descricao-novo-plano-estudo").value += "<br>"
          }
            
     }

     CURSO_ATIVIDADE.editarPlanoDeEstudos = function (idplano, idaluno) {

          var plano = new Object();

          plano.id = idplano
          plano.nome = $("#input-edita-plano-estudo").val()
          plano.descricao = $("#input-edita-descricao-novo-plano-estudo").val()
          plano.idUsuario = idaluno
          $.ajax({
               url: URL_SISTEMA.url+ "/plano/editar/",
               method: "PUT",
               contentType: "application/json",
               data: JSON.stringify(plano),
               success: function (mensagem) {
                    CURSO_ATIVIDADE.carregarPlanoDeEstudo()
                    $("#modal_aviso").html(CURSO_ATIVIDADE.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
               },
               error: function () {

               }

          })
     }


     CURSO_ATIVIDADE.modalAviso = function (mensagem) {
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

     CURSO_ATIVIDADE.modalEditarPlano = function (idplano, idaluno) {

          return '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">EDITAR PLANO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p>Atenção, informações do seu plano serão alteradas na base.</p>' +
               '<form action="#">' +
               '<input style="border:1px solid white;" id="input-edita-plano-estudo" class="inputs-novo-plano form-control form-control-lg" type="text" placeholder="Título de Plano:"' +
               'aria-label=".form-control-lg example" style="margin-bottom: 10px;">' +
               '<button style="margin:10px 0 0px 0;" type="button" class="btn-form-criar-plano btn btn-dark" onclick="CURSO_ATIVIDADE.quebrarLinhaDescricaoPlano(2)">QUEBRAR LINHA DESCRIÇÃO</button>'+
               '<textarea id="input-edita-descricao-novo-plano-estudo" class="inputs-novo-plano form-control" placeholder="Informe descrição:" id="floatingTextarea2"' +
               'style="height: 200px; resize: none; border:1px solid white; margin-top:10px;"></textarea>' +
               '</form>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn-form-criar-plano btn btn-success" onclick="CURSO_ATIVIDADE.editarPlanoDeEstudos('+idplano+','+idaluno+')">EDITAR</button>' +
               '<button type="button"class="btn-form-criar-plano btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>'

     }

     CURSO_ATIVIDADE.modalExcluirPlano = function (idplano, idusuario) {

          var layout = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">EXCLUIR PLANO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p>Finalizar exclusão de plano ?</p>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn-form-criar-plano btn btn-success" onclick="CURSO_ATIVIDADE.excluirPlanoDeEstudos('+idplano+','+idusuario+')">FINALIZAR</button>' +
               '<button type="button"class="btn-form-criar-plano btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>'

          return layout;
     }

})