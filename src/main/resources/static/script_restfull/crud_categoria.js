var CATEGORIA = new Object();

$(document).ready(function () {

  CATEGORIA.carregar = function () {
    $.ajax({
      url: URL_SISTEMA.url +"/categoria/carregar",
      method: "GET",
      success: function (result) {

        var lista = '';

        if (result == true) {
          lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Ainda não há categorias cadastradas na plataforma.</h4>";
        } else {
          for (let i = 0; i < result.length; i++) {
            lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='CATEGORIA.carregarStatus(" + result[i].id + ")'>AÇÕES</button></td></tr>";
          }

        }
        $("#tabelaCategoria").html(lista);

      },
      error: function (result) {
        
      }
    })
  };

  CATEGORIA.cadastrar = function () {

    var categoria = new Object();
    categoria.nome = $("#inpuCategoriaCurso").val();
    categoria.status = 1;

    if (categoria.nome !== '' && categoria.senha !== '') {
      $.ajax({
        url: URL_SISTEMA.url +"/categoria/salvar",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(categoria),
        success: function (result) {
          $("#modal_aviso").html(CATEGORIA.modalAviso(result));
          $("#modal_aviso").modal("show");
          $(".form-cad-user").hide();
          $("#inpuCategoriaCurso").val('');
          FORM_NOVA_CATEGORIA.buscar()
          CATEGORIA.carregar();
        },
        error: function (result) {
          var mensagem = result
          $("#modal_aviso").html(CATEGORIA.modalAviso(mensagem))
          $("#modal_aviso").modal("show")
        }
      })
    } else {
      var mensagem = "Todos os campos precisam ser preenchidos!"
      $("#modal_aviso").html(CATEGORIA.modalAviso(mensagem))
      $("#modal_aviso").modal("show")
    }
  }

  CATEGORIA.buscarPorFragmento = function () {

    var categoria = $('#buscaNomeCategoria').val()

    if (INPUT.validaEspacoEmBranco(categoria) !== true) {
      if (categoria == '') {
        CATEGORIA.carregar();
      } else {
        $.ajax({
          url: URL_SISTEMA.url +"/categoria/coletar/" + categoria,
          method: "GET",
          success: function (result) {
            var lista = '';
            if (result.length == 0) {
              lista = "<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>";
            } else {
              for (let i = 0; i < result.length; i++) {
                lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='CATEGORIA.carregarStatus(" + result[i].id + ")'>AÇÕES</button></td></tr>";
              }
            }
            $("#tabelaCategoria").html(lista);
          },
          error: function (result) {
            
          }

        })
      }
    } else {
      $("#tabelaCategoria").html("<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>");
    }

  }

  CATEGORIA.buscarPorID = function (cod_categoria) {
    $.ajax({
      url: URL_SISTEMA.url +"/categoria/buscar/" + cod_categoria,
      method: "GET",
      success: function (categoria) {
        if (categoria !== true) {
          $("#inpuAtualizaCategoria").val(categoria.nome)
        } else {
          var mensagem = "<p style='font-size:13px;'>Cadastro não encontrado para atualizar!</p>";
          $("#modal_aviso").html(CATEGORIA.modalAviso(mensagem))
          $("#modal_aviso").modal("show")
        }
      },
      error: function (result) {
        
      }
    })
  }

  CATEGORIA.atualizar = function (cod_categoria) {
    var categoria = new Object();
    categoria.id = cod_categoria;
    categoria.nome = $("#inpuAtualizaCategoria").val();

    if (categoria.nome !== '') {
      $.ajax({
        url: URL_SISTEMA.url +"/categoria/editar",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(categoria),
        success: function (result) {
          $("#modal_aviso").html(CATEGORIA.modalAviso(result))
          $("#modal_aviso").modal("show")
          $(".form-cad-user").hide()
          CATEGORIA.carregar();
        },
        error: function (result) {
         
        }
      })
    } else {
      var mensagem = "<p style='font-size:13px;'>Todos os campos precisam ser preenchidos!</p>";
      $("#modal_aviso").html(CATEGORIA.modalAviso(mensagem));
      $("#modal_aviso").modal("show");
    }
  }

  CATEGORIA.carregarStatus = function (cod_categoria) {

    var checked = "";

    $.ajax({
      url: URL_SISTEMA.url +"/categoria/buscar/" + cod_categoria,
      method: "GET",
      success: function (result) {
        if (result.status == 0) {
          checked = '';
        } else if (result.status == 1) {
          checked = 'checked';
        }

        $("#modal_aviso").html(CATEGORIA.alteraCadastro(cod_categoria, checked));
        $("#modal_aviso").modal("show");
      },
      error: function (result) {
        
      }
    })

  }

  CATEGORIA.atualizarStatus = function (cod_categoria) {

    var categoria = new Object();
    categoria.id = cod_categoria;

    if ($("#togBtn").is(":checked") == true) {
      categoria.status = 1;
    } else {
      categoria.status = 0;
    }

    $.ajax({
      url: URL_SISTEMA.url +"/categoria/editar/status",
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(categoria),
      success: function (result) {
        $("#modal_aviso").html(CATEGORIA.modalAviso(result));
        $("#modal_aviso").modal("show");
      },
      error: function (result) {
       
      }
    })
  }

  CATEGORIA.excluir = function (cod_categoria) {
    $.ajax({
      url: URL_SISTEMA.url+"/categoria/deletar/" + cod_categoria,
      method: "DELETE",
      success: function (mensagem) {
        CATEGORIA.carregar();
        $("#modal_aviso").html(CATEGORIA.modalAviso(mensagem));
        $("#modal_aviso").modal("show")
      },
      error: function (result) {
        
      }
    })
  }

  CATEGORIA.exibirModalCadastrar = function () {
    $("#modal_aviso").html(CATEGORIA.modalCadastrar());
    $("#modal_aviso").modal("show");
  }

  CATEGORIA.alterarCadastro = function (cod_categoria) {
    $("#modal_aviso").html(CATEGORIA.modalAtulizar(cod_categoria));
    CATEGORIA.buscarPorID(cod_categoria);
    $("#modal_aviso").modal("show");
  }

  CATEGORIA.excluiCadastro = function (cod_categoria) {
    $("#modal_aviso").html(CATEGORIA.modalExcluir(cod_categoria));
    $("#modal_aviso").modal("show");
  }

  CATEGORIA.modalAviso = function (mensagem) {
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

  CATEGORIA.modalCadastrar = function () {
    var modal = '<div class="modal-dialog">' +
      '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">FINALIZAR</h5>' +
      '</div>' +
      '<div class="modal-body">' +
      '<div class="mb-3">' +
      '<p style="font-size:15px;">Finalizar cadastramento de categoria?</p>' +
      '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CATEGORIA.cadastrar()">CADASTRAR</button>' +
      '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
      '</div>' +
      '</div>' +
      '</div>"'
    return modal;
  }

  CATEGORIA.modalAtulizar = function (cod_categoria) {
    var modal = '<div class="modal-dialog">' +
      '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">ATUALIZAR</h5>' +
      '</div>' +
      '<div class="modal-body">' +
      '<p style="font-size:15px;">ATENÇÃO: Informações da categoria serão alteradas na base.</p>' +
      '<div style="height:125px; overflow:auto; border-radius:5px; padding:20px 13px;" class="mb-3">' +
      '<input style="border:1px solid white;" id="inpuAtualizaCategoria" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Informe Categoria:" aria-label=".form-control-lg example"></input>' +
      '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CATEGORIA.atualizar(' + cod_categoria + ')">FINALIZAR</button>' +
      '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
      '</div>' +
      '</div>' +
      '</div>"'
    return modal;
  }

  CATEGORIA.modalExcluir = function (cod_categoria) {
    var modal = '<div class="modal-dialog">' +
      '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">EXCLUIR CATEGORIA</h5>' +
      '</div>' +
      '<div class="modal-body">' +
      '<p style="font-size:15px;">ATENÇÃO: Informações da categoria serão excluidas na base, finalizar?</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CATEGORIA.excluir(' + cod_categoria + ')">FINALIZAR</button>' +
      '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
      '</div>' +
      '</div>' +
      '</div>"'
    return modal;
  }

  CATEGORIA.alteraCadastro = function name(cod_categoria, checked) {
    var modal = '<div class="modal-dialog">' +
      '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">STATUS CATEGORIA</h5>' +
      '</div>' +
      '<div class="modal-body">' +
      '<p style="font-size:15px;">ATENÇÃO: Categoria desativada não poderá mais ser usada para cadastro de cursos.</p>' +
      '<br>' +
      '<div class="mb-3">' +
      '<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status da Categoria:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="CATEGORIA.atualizarStatus(' + cod_categoria + ')" ' + checked + '><div class="slider round"></div></label></div>' +
      '</div>' +
      '</div>' +
      '<div style="border-top:1px solid white;" class="modal-body">' +
      '<p style="font-size:15px;">OPÇÕES DE CADASTRO:</p>' +
      '<button type="button" class="btn-acoes-usuario btn btn-primary" onclick="CATEGORIA.alterarCadastro(' + cod_categoria + ')">EDITAR</button>' +
      //'<button type="button" class="btn-acoes-usuario btn btn-danger" onclick="CATEGORIA.excluiCadastro(' + cod_categoria + ')">EXCLUIR</button>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
      '</div>' +
      '</div>' +
      '</div>"'
    return modal;
  }

})