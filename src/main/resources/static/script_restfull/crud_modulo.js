var MODULO = new Object()
var AULA = new Object();
var VIDEO = new Object();
var MATERIAL = new Object();
$(document).ready(function () {

     MODULO.carregar = function () {
          $.ajax({
               url: URL_SISTEMA.url+"/modulo/carregar",
               method: "GET",
               success: function (result) {

                    var lista = '';

                    if (result == true) {
                         lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Ainda não tem modulos cadastrados na plataforma.</h4>";
                    } else {
                         for (let i = 0; i < result.length; i++) {
                              lista += "<tr><td>" + result[i].tituloCurso + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='CURSO.carregarStatus(" + result[i].id + ")'>AÇÕES</button></td></tr>";
                         }
                    }
                    $("#tabelaCursos").html(lista);
               },
               error: function (result) {
                   
               }
          })
     }

     MODULO.carregarCursos = function () {
          $.ajax({
               url: URL_SISTEMA.url+"/modulo/carregar_cursos",
               method: "GET",
               success: function (result) {

                    var lista = '';

                    if (result == true) {
                         lista = "<option value='null'>Ainda não tem cursos cadastrados na plataforma.</option>";
                    } else {

                         lista += '<option value="null" selected>SELECIONE O CURSO</option>';

                         for (let i = 0; i < result.length; i++) {

                              lista += '<option value="' + result[i].id + '" onclick="MODULO.carregarModulosCursoPai(' + result[i].id + ')">' + result[i].tituloCurso + "</option>";
                         }
                    }
                    $("#lista_cursos_modulo").html(lista);
               },
               error: function (result) {
                    
               }
          })
     }

     MODULO.carregarCursosPai = function () {

          $.ajax({
               url: URL_SISTEMA.url+"/modulo/carregar_cursos",
               method: "GET",
               success: function (result) {

                    var lista = '';

                    if (result == true) {
                         lista = "<option value='null'>Ainda não tem cursos cadastrados na plataforma.</option>";
                    } else {

                         lista += '<option value="null" selected>SELECIONE O CURSO</option>';

                         for (let i = 0; i < result.length; i++) {

                              lista += '<option value="' + result[i].id + '">' + result[i].tituloCurso + "</option>";
                         }
                    }
                    $("#lista_cursosPai_modulo").html(lista);
               },
               error: function (result) {
                    
               }
          })
     }



     MODULO.carregarModulosCursoPai = function (id) {

          if (id !== 'null') {
               $.ajax({
                    url: URL_SISTEMA.url+"/modulo/buscar/curso/" + id,
                    method: "GET",
                    success: function (result) {

                         var lista = '';

                         if (result == true) {
                              lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Não há módulos cadastrados neste curso ainda, cadastrar!</h4>";
                         } else {
                              for (let i = 0; i < result.length; i++) {
                                   lista += "<tr><td id=" + result[i].idModulo + ">" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='MODULO.carregarStatus(" + id + "," + result[i].idModulo + ")'>AÇÕES</button></td></tr>";
                              }
                         }
                         $("#tabela_lista_cursosPai_modulo").html(lista);
                    },
                    error: function (result) {
                         
                    }
               })
          } else {

               $("#tabela_lista_cursosPai_modulo").html("<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Selecione um curso para buscar todos os módulos.</h4>");
          }

     }

     MODULO.carregarModulosAulaPaiSelect = function (id) {

          if (id !== 'null') {

               $.ajax({
                    url: URL_SISTEMA.url+"/modulo/buscar/curso/" + id,
                    method: "GET",
                    success: function (result) {

                         var lista = '';

                         if (result == true) {
                              lista = "<option>Não há módulos cadastrados neste curso ainda, cadastrar!</option>";
                         } else {
                              lista = '<option value="null" selected>SELECIONE O MÓDULO</option>';
                              for (let i = 0; i < result.length; i++) {
                                   lista += '<option value="' + result[i].idModulo + '">' + result[i].nome + "</option>";
                              }
                              $("#tabelaAulas").html("<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Selecione um módulo para buscar todas as aulas.</h4>");
                         }

                         $("#lista_moduloPai_aulas").html(lista);
                    },
                    error: function (result) {
                         
                    }
               })
          } else {

               $("#lista_moduloPai_aulas").html("<option>SELECIONE UM CURSO PARA BUSCAR MÓDULOS</option>");
               $("#tabelaAulas").html("<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Selecione um curso para buscar todos o módulos.</h4>");
          }

     }

     MODULO.carregarModulosPaiAulas = function (id) {

          if (id !== 'null') {
               $.ajax({
                    url: URL_SISTEMA.url+"/aula/carregar/" + id,
                    method: "GET",
                    success: function (result) {

                         var lista = '';

                         if (result == true) {
                              lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Não há aulas cadastradas neste módulo ainda, cadastrar!</h4>";
                         } else {
                              for (let i = 0; i < result.length; i++) {
                                   lista += "<tr><td id=" + result[i].id + ">" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='AULA.carregarStatus(" + result[i].id + "," + result[i].id_modulo + ","+result[i].id_curso+")'>AÇÕES</button></td></tr>";
                              }
                         }
                         $("#tabelaAulas").html(lista);
                    },
                    error: function (result) {
                         
                    }
               })
          } else {

               $("#tabelaAulas").html("<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Selecione um módulo para buscar todas as aulas.</h4>");
          }

     }

     MODULO.cadastrar = function () {

          var modulo = new Object();

          modulo.nome = $("#nome_modulo").val()
          modulo.id_curso = $("#lista_cursos_modulo option:selected").val();
          modulo.status = 1;

          if (modulo.nome !== '' && modulo.id_curso !== 'null') {
               $.ajax({
                    url: URL_SISTEMA.url+"/modulo/salvar",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(modulo),
                    success: function (result) {

                         $('#form-novo-modulo')[0].reset();
                         $("#modal_aviso").html(MODULO.modalAviso(result));
                         $("#modal_aviso").modal("show");
                    },
                    error: function (result) {
                         var mensagem = result
                         $("#modal_aviso").html(MODULO.modalAviso(mensagem))
                         $("#modal_aviso").modal("show")
                    }
               })
          } else {
               var mensagem = ""

               if (modulo.nome == '') {
                    mensagem = "Preencher campo com nome do módulo!"
               }

               if (modulo.id_curso == 'null') {
                    mensagem = "Selecionar curso para cadastrar um módulo!"
               }

               $("#modal_aviso").html(MODULO.modalAviso(mensagem))
               $("#modal_aviso").modal("show")
          }
     }

     MODULO.buscarPorID = function (cod_modulo) {
          $.ajax({
               url: URL_SISTEMA.url+"/modulo/buscar/" + cod_modulo,
               method: "GET",
               success: function (modulo) {

                    if (modulo !== true) {
                         $("#input-atualiza-nome-modulo").val(modulo.nome)

                    } else {
                         var mensagem = "<p>Cadastro de módulo não existe mais na base!</p>";
                         $("#modal_aviso").html(MODULO.modalAviso(mensagem))
                         $("#modal_aviso").modal("show")
                         MODULO.carregarCursosPai()
                         var lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Não há módulos cadastrados neste curso ainda, cadastrar!</h4>";
                         $("#tabela_lista_cursosPai_modulo").html(lista);

                    }
               },
               error: function (result) {
                    
               }
          })
     }

     AULA.buscarPorID = function (cod_aula) {
          $.ajax({
               url: URL_SISTEMA.url+"/aula/buscar/" + cod_aula,
               method: "GET",
               success: function (aula) {

                    if (aula !== true) {
                         $("#input-atualiza-nome-aula").val(aula.nome)
                         $("#texto_atualiza_resumo_aula").val(aula.resumo)

                    } else {
                         //var mensagem = "<p>Cadastro de aula não existe mais na base!</p>";
                         //$("#modal_aviso").html(MODULO.modalAviso(mensagem))
                         //$("#modal_aviso").modal("show")
                         //MODULO.carregarCursosPai()
                         //var lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Não há mó cadastrados neste curso ainda, cadastrar!</h4>";
                         //$("#tabela_lista_cursosPai_modulo").html(lista);

                    }
               },
               error: function (result) {
                    
               }
          })
     }

     MODULO.cadastrarArquivos = function (id_Curso_Pai, id_Modulo) {

          var confirme = true;
          var mensagem = "";

          var reg = /(.*?)\.(mp4|m4v|mov|wmv)$/;
          var regs = /(.*?)\.(txt|pdf|docx)$/;

          var data = new FormData($("#form-files-modulo")[0]);

          data.append("idCursoPai", id_Curso_Pai)
          data.append("idModulo", id_Modulo)
          data.append("tituloVideoAula", $("#nome_video_aula").val())
          data.append("textoresumoaula", $("#texto_resumo_aula").val())
          data.append("videoAula", $("#video_aula_class").val())

          var aula = new Object()

          aula.nome = $("#nome_video_aula").val()
          aula.resumo = $("#texto_resumo_aula").val()
          aula.id_modulo = id_Modulo
          aula.id_curso = id_Curso_Pai
          aula.status = 1;

          for (let i = 0; i < document.getElementsByClassName("materiais_aula").length; i++) {

               if (!document.getElementsByClassName("materiais_aula")[i].value.match(regs) && document.getElementsByClassName("materiais_aula")[i].value !== "") {
                    mensagem = "Formato de arquivo é inválido, somente txt, docx ou pdf.";
                    confirme = false;
                    arquivoMaterial = true;
               }

               data.append("materiaisAula", document.getElementsByClassName("materiais_aula")[i].value)
          }

          if ($("#nome_video_aula").val() == '') {
               mensagem = "Informar nome da vídeo aula!";
               confirme = false;
          }

          if ($("#texto_resumo_aula").val() == '') {
               mensagem = "Informar resumo da vídeo aula!";
               confirme = false;
          }

          var arquivo = $("#video_aula_class").val();

          if (!arquivo.match(reg)) {
               mensagem = "Formato de arquivo é inválido, somente mp4, m4v,mov, wmv.";
               confirme = false;
          }

          if (arquivo == '') {
               mensagem = "Inserir a vídeo aula no campo requerido.";
               confirme = false;
          }


          if (confirme) {

               AULA.cadastrar(aula);

               $.ajax({
                    url: URL_SISTEMA.url+"/modulo/arquivos/cadastrar",
                    method: "POST",
                    data: data,
                    processData: false,
                    contentType: false,
                    enctype: "multipart/form-data",
                    xhr: function () {
                         var xhr = new window.XMLHttpRequest()
                         xhr.upload.addEventListener("progress", function (evt) {

                              if (evt.lengthComputable) {

                                   MODULO.exibirModalBarraProgress();

                                   var percentComplete = evt.loaded / evt.total;
                                   percentComplete = parseInt(percentComplete * 100);

                                   $("#barra-progresso").css({ "width": percentComplete + "%" })
                                   $("#porcent").html(percentComplete + "%")

                                   if (percentComplete === 100) {
                                        $("#barra-progresso").css({ "background": "#198754" })
                                        $("#porcent-text").html("<span style='background-color:#198754; padding:3px 8px; border-radius:5px;'>FINALIZADO.</span>")

                                   } else if (percentComplete <= 100) {
                                        $("#barra-progresso").css({ "background-color": "orange" })
                                        $("#porcent-text").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>PROCESSANDO... AGUARDE!</span>")
                                   }

                              }

                         }, false);

                         return xhr;
                    },
                    success: function (result) {

                         $("#modal_aviso").html(MODULO.modalAviso(result))
                         $("#modal_aviso").modal("show")
                         movimentarScroll(400, 100)

                    },
                    error: function () {
                         MODULO.exibirModalBarraProgress();
                         $("#barra-progresso").css({ "width": "100%" })
                         $("#porcent").html("0%")
                         $("#barra-progresso").css({ "background": "#bb2d3b" })
                         $("#porcent-text").html("Erro no processo de UPLOAD dos arquivos enviados, fazer processo novamente!")
                         $("#btn-ok").html("<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>OK</button>")

                    }
               })
          } else {

               $("#modal_aviso").html(MODULO.modalAvisoInputFiles(mensagem, id_Curso_Pai, id_Modulo));
               $("#modal_aviso").modal("show");

          }

     }
     
     AULA.cadastrar = function (aula) {

          $.ajax({
               url: URL_SISTEMA.url+"/aula/salvar",
               method: "POST",
               contentType: "application/json",
               data: JSON.stringify(aula),
               success: function (result) {
                    confirm = result;
               },
               error: function () {
                    confirm = false;
               }
          })
     }

     MODULO.carregarModulosPai = function () {

          $.ajax({
               url: URL_SISTEMA.url+"/modulo/carregar",
               method: "GET",
               success: function (result) {

                    var lista = '';

                    if (result == true) {
                         lista = "<option value='null'>Ainda não tem aulas cadastradas neste módulo.</option>";
                    } else {

                         lista += '<option value="null" selected>SELECIONE O MÓDULO</option>';

                         for (let i = 0; i < result.length; i++) {

                              lista += '<option value="' + result[i].id_modulo + '">' + result[i].nome + "</option>";
                         }
                    }
                    $("#lista_modulosPai_modulo").html(lista);
               },
               error: function (result) {
                    
               }
          })
     }

     MODULO.atualizar = function (cod_curso, cod_modulo) {

          var modulo = new Object();

          modulo.idModulo = cod_modulo;
          modulo.nome = $("#input-atualiza-nome-modulo").val();
          modulo.id_curso = cod_curso;

          if (modulo.nome !== '') {
               $.ajax({
                    url: URL_SISTEMA.url+"/modulo/editar",
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(modulo),
                    success: function (result) {
                         MODULO.carregarModulosCursoPai(cod_curso);
                         $("#modal_aviso").html(MODULO.modalAviso(result))
                         $("#modal_aviso").modal("show")
                         $(".form-cad-user").hide()

                    },
                    error: function (result) {
                         
                    }
               })
          } else {
               var mensagem = "<p style='font-size:13px;'>Todos os campos precisam ser preenchidos!</p>";
               $("#modal_aviso").html(CURSO.modalAviso(mensagem));
               $("#modal_aviso").modal("show");
          }
     }

     AULA.atualizar = function (cod_aula, cod_modulo) {

          var aula = new Object();

          aula.id = cod_aula;
          aula.nome = $("#input-atualiza-nome-aula").val();
          aula.resumo = $("#texto_atualiza_resumo_aula").val()
          aula.id_modulo = cod_modulo;

          if (aula.nome !== '' && aula.resumo !== '') {
               $.ajax({
                    url: URL_SISTEMA.url+"/aula/editar",
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(aula),
                    success: function (result) {
                         MODULO.carregarModulosPaiAulas(cod_modulo)
                         $("#modal_aviso").html(MODULO.modalAviso(result))
                         $("#modal_aviso").modal("show")
                         $(".form-cad-user").hide()

                    },
                    error: function (result) {
                         
                    }
               })
          } else {
               var mensagem = "<p style='font-size:13px;'>Todos os campos precisam ser preenchidos!</p>";
               $("#modal_aviso").html(CURSO.modalAviso(mensagem));
               $("#modal_aviso").modal("show");
          }
     }

     MODULO.deletaCurso = function (cod_curso, cod_modulo) {

          $.ajax({
               url: URL_SISTEMA.url+"/modulo/deletar/" + cod_modulo,
               method: "DELETE",
               success: function (result) {
                    MODULO.carregarCursosPai()
                    MODULO.carregarModulosCursoPai(cod_curso);
                    $("#modal_aviso").html(MODULO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()

               },
               error: function (result) {
                    
               }
          })
     }

     MODULO.carregarStatus = function (id_curso_pai, cod_modulo) {

          var checked = "";

          $.ajax({
               url: URL_SISTEMA.url+"/modulo/buscar/" + cod_modulo,
               method: "GET",
               success: function (result) {

                    if (result == true) {
                         $("#modal_aviso").html(MODULO.modalAviso("Módulo não está cadastrado na base."));
                         $("#modal_aviso").modal("show");
                    } else {
                         if (result.status == 0) {
                              checked = '';
                         } else if (result.status == 1) {
                              checked = 'checked';
                         }

                         $("#modal_aviso").html(MODULO.exibirModalAlterar(id_curso_pai, cod_modulo, checked));
                         $("#modal_aviso").modal("show");
                    }


               },
               error: function (result) {
                    
               }
          })

     }

     MODULO.atualizarStatus = function (cod_modulo) {

          var modulo = new Object();
          modulo.idModulo = cod_modulo;

          if ($("#togBtn").is(":checked") == true) {
               modulo.status = 1;
          } else {
               modulo.status = 0;
          }

          $.ajax({
               url: URL_SISTEMA.url+"/modulo/editar/status",
               method: "PUT",
               contentType: "application/json",
               data: JSON.stringify(modulo),
               success: function (result) {
                    $("#modal_aviso").html(MODULO.modalAviso(result));
                    $("#modal_aviso").modal("show");
               },
               error: function (result) {
                    
               }
          })
     }

     AULA.carregarStatus = function (cod_aula, cod_modulo,cod_curso) {

          var checked = "";

          $.ajax({
               url: URL_SISTEMA.url+"/aula/buscar/" + cod_aula,
               method: "GET",
               success: function (result) {

                    if (result == true) {
                         $("#modal_aviso").html(MODULO.modalAviso("Aula não está cadastrada na base."));
                         $("#modal_aviso").modal("show");
                    } else {
                         if (result.status == 0) {
                              checked = '';
                         } else if (result.status == 1) {
                              checked = 'checked';
                         }

                         $("#modal_aviso").html(AULA.exibirModalAula(cod_aula, cod_modulo,cod_curso, checked));
                         $("#modal_aviso").modal("show");
                    }


               },
               error: function (result) {
                    
               }
          })

     }

     AULA.atualizarStatus = function (cod_aula) {

          var aula = new Object();
          aula.id = cod_aula;

          if ($("#togBtn").is(":checked") == true) {
               aula.status = 1;
          } else {
               aula.status = 0;
          }

          $.ajax({
               url: URL_SISTEMA.url+"/aula/editar/status",
               method: "PUT",
               contentType: "application/json",
               data: JSON.stringify(aula),
               success: function (result) {
                    $("#modal_aviso").html(MODULO.modalAviso(result));
                    $("#modal_aviso").modal("show");
               },
               error: function (result) {
                    
               }
          })
     }

     AULA.deletaAula = function (cod_aula, cod_modulo) {

          $.ajax({
               url: URL_SISTEMA.url+"/aula/deletar/" + cod_aula,
               method: "DELETE",
               success: function (result) {
                    MODULO.carregarModulosPaiAulas(cod_modulo)
                    $("#modal_aviso").html(MODULO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()

               },
               error: function (result) {
                    
               }
          })
     }

     MODULO.exibirModalAlterar = function (cod_curso, cod_modulo, checked) {
          $("#modal_aviso").html(MODULO.alterarCadastro(cod_curso, cod_modulo, checked));
          $("#modal_aviso").modal("show");
          movimentarScrollCadFiles(260, 200)
     }

     MODULO.exibirModalCadastrarVideoAula = function () {
          $("#modal_aviso").html(MODULO.cadastrarVideoAula());
          $("#modal_aviso").modal("show");
     }

     MODULO.exibirModalBarraProgress = function () {
          $("#modal_aviso").html(MODULO.modalProgressEnvioArquivos());
          $("#modal_aviso").modal("show");
     }

     MODULO.exibirModalDeletar = function (cod_curso, cod_modulo) {
          $("#modal_aviso").html(MODULO.modalDeletar(cod_curso, cod_modulo));
          $("#modal_aviso").modal("show");
     }

     MODULO.exibirModalAtualizar = function (cod_curso, cod_modulo) {
          $("#modal_aviso").html(MODULO.modalAtulizar(cod_curso, cod_modulo));
          MODULO.buscarPorID(cod_modulo);
          $("#modal_aviso").modal("show");
     }

     AULA.exibirModalAula = function (cod_aula, cod_modulo,cod_curso, checked) {
          VIDEO.carregarNomeVideoAula(cod_aula)
          MATERIAL.carregarNomeMateriaias(cod_aula)
          $("#modal_aviso").html(AULA.modalAlteracaoAula(cod_aula, cod_modulo,cod_curso, checked));
          AULA.buscarPorID(cod_aula);
          $("#modal_aviso").modal("show");
     }

     AULA.exibirModalAtualizarAula = function (cod_aula, cod_modulo) {

          $("#modal_aviso").html(AULA.modalAtulizarAula(cod_aula, cod_modulo));
          AULA.buscarPorID(cod_aula);
          $("#modal_aviso").modal("show");
     }

     AULA.exibirModalDeletarAula = function (cod_aula, cod_modulo) {
          $("#modal_aviso").html(AULA.modalDeletarAula(cod_aula, cod_modulo));
          $("#modal_aviso").modal("show");
     }

     AULA.modalAlteracaoAula = function name(cod_aula, cod_modulo, cod_curso,checked) {

          var nomeAula = $("#" + cod_aula).text();

          var modal = '<style>.form-control-lg{font-size:15px;}</style>' +
               '<div class="modal-dialog">' +
               '<div style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;" class="modal-content" >' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">' + nomeAula.toUpperCase() + '</h5>' +
               '</div>' +
               '<div id="amb-opcoes-cad-files" style="overflow: auto; height:420px;">' +
               '<div style="padding:10px 10px;">' +
               '<p style="font-size:15px;">ATENÇÃO: Aula desativado não poderá mais ser distribuido aos usuários.</p>' +
               '<br>' +
               '<div class="mb-3">' +
               '<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status do Aula:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="AULA.atualizarStatus(' + cod_aula + ')" ' + checked + '><div class="slider round"></div></label></div>' +
               '</div>' +
               '<hr>' +
               '</div>' +
               '<div style="padding:10px 10px;">' +
               '<p style="font-size:15px;">OPÇÕES DE CADASTRO:</p>' +
               '<button type="button" class="btn-acoes-usuario btn btn-primary" onclick="AULA.exibirModalAtualizarAula(' + cod_aula + ',' + cod_modulo + ')">EDITAR</button>' +
               //'<button type="button" class="btn-acoes-usuario btn btn-danger" onclick="AULA.exibirModalDeletarAula(' + cod_aula + ',' + cod_modulo + ')">EXCLUIR</button>' +
               '<hr>' +
               '</div>' +
               '<div style="padding:10px 10px;">' +
               '<p>AULA ATUAL:</p>' +
               '<video id="video-aula" width="100%" height="350" controls></video>' +
               '<hr>' +
               '<p style="padding:0; margin:0;">BAIXAR MATERIAIS:</p>' +
               '<div id="amb-materiais-download"><div id="materiais"></div></div>' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="fecharVideo()">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>'

          return modal;
     }

     MODULO.alterarCadastro = function name(cod_curso, cod_modulo, checked) {

          var nomeModulo = $("#" + cod_modulo).text();

          var modal = '<style>.form-control-lg{font-size:15px;}</style>' +
               '<div class="modal-dialog">' +
               '<div style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;" class="modal-content" >' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">' + nomeModulo.toUpperCase() + '</h5>' +
               '</div>' +
               '<div id="amb-opcoes-cad-files" style="overflow: auto; height:420px;">' +
               '<div style="padding:10px 10px;">' +
               '<p style="font-size:15px;">ATENÇÃO: Módulo desativado não poderá mais ser distribuido aos usuários.</p>' +
               '<br>' +
               '<div class="mb-3">' +
               '<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status do Módulo:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="MODULO.atualizarStatus(' + cod_modulo + ')" ' + checked + '><div class="slider round"></div></label></div>' +
               '</div>' +
               '<hr>' +
               '</div>' +
               '<div style="padding:10px 10px;">' +
               '<p style="font-size:15px;">OPÇÕES DE CADASTRO:</p>' +
               '<button type="button" class="btn-acoes-usuario btn btn-primary" onclick="MODULO.exibirModalAtualizar(' + cod_curso + ',' + cod_modulo + ')">EDITAR</button>' +
               //'<button type="button" class="btn-acoes-usuario btn btn-danger" onclick="MODULO.exibirModalDeletar(' + cod_curso + ',' + cod_modulo + ')">EXCLUIR</button>' +
               '<hr>' +
               '</div>' +
               '<div style="padding:10px 10px;">' +
               '<form id="form-files-modulo" enctype="multipart/form-data">' +
               '<p style="margin:-30px 0 10px 0;">INSIRA SUA VÍDEO AULA AQUI:</p>' +
               '<input style="border:1px solid #ffffff47; margin:0 0 20px 0;" name="nomevideoaula" id="nome_video_aula" class="tit-nome-video input-inf-curso form-control form-control-lg" type="text" placeholder="Informe Título da Aula:" aria-label=".form-control-lg example" style="margin-bottom: 10px;">' +
               '<textarea style="border:1px solid #ffffff47; margin:0 0 20px 0;" name="textoresumoaula" id="texto_resumo_aula" class="input-inf-curso form-control" placeholder="Iinforme resumo da aula:" maxlength="3000" id="floatingTextarea2" style="height: 100px; resize: none;"></textarea>' +
               '<p style="margin:0;">Vídeo Aula:</p>' +
               '<input style="border:1px solid #ffffff47; margin:0 0 20px 0;" name="videoAula" id="video_aula_class" class="video_aula form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;">' +
               '<p style="margin:0;">Materiais de Apoio:</p>' +
               '<input style="border:1px solid #ffffff47;" name="materiaisAula" id="material_aula" class="materiais_aula materiais_aula_index form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;" multiple >' +
               '<div style="display:flex; justify-content:center; margin-top:10px;">' +
               '<button style="margin-right:5px;" type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="MODULO.cadastrarArquivos(' + cod_curso + ',' + cod_modulo + ')">UPLOAD</button>' +
               '<button type="button" class="btn btn-danger" onclick="MODULO.limparFormCadFiles()">LIMPAR</button>' +
               '</div>' +
               '</form>' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>'

          return modal;
     }

     MODULO.cadastrarVideoAula = function () {
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">AVISO!</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p>Finalizar cadastramento de vídeo aula?</p>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-success" data-bs-dismiss="modal">FINALIZAR</button>' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>'
          return modal;
     }

     MODULO.modalAviso = function (mensagem) {
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

     MODULO.modalAvisoInputFiles = function (mensagem, id_Curso_Pai, id_Modulo) {
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">AVISO!</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p>' + mensagem + '</p>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="MODULO.carregarStatus(' + id_Curso_Pai + ',' + id_Modulo + ')">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
          return modal;
     }

     MODULO.modalProgressEnvioArquivos = function () {
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">CARREGANDO ARQUIVO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div style="display:flex;"><p style="margin-right:5px;">Progresso: </p><p id="porcent-text"></p></div>' +
               '<div class="progress">' +
               '<div id="barra-progresso" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><div id="porcent" style="font-weight:bold; color:white; text-align:center;"></div></div>' +
               '</div>' +
               '<div id="btn-ok" style="display:flex; justify-content:right; margin-top:10px;">' +
               '</div>' +
               '</div>' +
               '</div>' +
               '</div>'
          return modal;
     }

     MODULO.modalDeletar = function (cod_curso, cod_modulo) {
          var nomeModulo = $("#" + cod_modulo).text()
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">EXCLUIR MÓDULO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div class="mb-3">' +
               '<p style="font-size:15px;">Excluir o módulo ' + nomeModulo + '?</p>' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="MODULO.deletaCurso(' + cod_curso + ',' + cod_modulo + ')">FINALIZAR</button>' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>"'
          return modal;
     }

     MODULO.modalAtulizar = function (cod_curso, cod_modulo) {
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">ATUALIZAR</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p style="font-size:15px;">ATENÇÃO: O nome do módulo será alterado na base.</p>' +
               '<div style="border-radius:5px; padding:20px 13px;" class="mb-3">' +
               '<input style="border:1px solid white;" id="input-atualiza-nome-modulo" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Informe o nome do módulo:" aria-label=".form-control-lg example">' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="MODULO.atualizar(' + cod_curso + ',' + cod_modulo + ')">FINALIZAR</button>' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>"'
          return modal;
     }

     AULA.modalAtulizarAula = function (cod_aula, cod_modulo) {
          var nomeAula = $("#" + cod_aula).text()
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">ATUALIZAR ' + nomeAula + '</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<p style="font-size:15px;">ATENÇÃO: O nome do módulo será alterado na base.</p>' +
               '<div style="border-radius:5px; padding:20px 13px;" class="mb-3">' +
               '<input style="border:1px solid white;" id="input-atualiza-nome-aula" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Informe o nome do módulo:" aria-label=".form-control-lg example">' +
               '<textarea style="border:1px solid #ffffff47; margin:0 0 20px 0;" name="textoresumoaula" id="texto_atualiza_resumo_aula" class="input-inf-curso form-control" placeholder="Iinforme resumo da aula:" maxlength="3000" id="floatingTextarea2" style="height: 100px; resize: none;"></textarea>' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="AULA.atualizar(' + cod_aula + ',' + cod_modulo + ')">FINALIZAR</button>' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>"'
          return modal;
     }

     AULA.modalDeletarAula = function (cod_aula, cod_modulo) {

          var nomeAula = $("#" + cod_aula).text()
          var modal = '<div class="modal-dialog">' +
               '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title">EXCLUIR ' + nomeAula + '</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div class="mb-3">' +
               '<p style="font-size:15px;">Excluir aula: ' + nomeAula + '?</p>' +
               '</div>' +
               '</div>' +
               '<div class="modal-footer">' +
               '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="AULA.deletaAula(' + cod_aula + ',' + cod_modulo + ')">FINALIZAR</button>' +
               '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
               '</div>' +
               '</div>' +
               '</div>"'
          return modal;
     }

     MODULO.limparFormCadFiles = function () {
          $('#form-files-modulo')[0].reset();
     }
})

function fecharVideo() {
     $("#video-aula").attr("src", "")
}

function movimentarScrollModulo(index, velocidade) {
     $("#exibicao-conteudo2").animate({
          scrollTop: index
     }, velocidade);
}

function movimentarScrollCadFiles(index, velocidade) {
     $("#amb-opcoes-cad-files").animate({
          scrollTop: index
     }, velocidade)
}