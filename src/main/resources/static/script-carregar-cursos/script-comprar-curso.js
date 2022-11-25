var CURSO_COMPRADO = new Object();
$(document).ready(function () {

     CURSO_COMPRADO.buscarFomularioCompra = function (cod_curso) {

          $("#cursos-em-andamento").load("modal_telas/modais_tela_informacoes_curso/modal_comprar_curso.html")

          CURSO_COMPRADO.buscarInformacoesComprarCurso(cod_curso)

     }

     CURSO_COMPRADO.buscarInformacoesComprarCurso = function (cod_curso) {
          $.ajax({
               url: URL_SISTEMA.url+"/cursos/buscar/informacoes/para/compra/" + cod_curso,
               method: "GET",
               success: function (cursos) {
                    var curso = ""

                    for (let i = 0; i < cursos.length; i++) {
                         curso = JSON.parse(cursos[i])

                    }
                    setTimeout(function () {
                         $("#tit-curso-comprar-form").html(curso.nome)
                         $("#hora-amb-compra-curso").html("Carga Horária: " + curso.hora + " hrs.")
                         $("#preco-amb-compra-curso").html("Preço: R$" + curso.preco + " reais.")
                         CURSO_COMPRADO.carregarImagensCursosLiberados(curso.id, curso.nome, curso.arquivo)
                    }, 300)



               },
               error: function () {

               }
          })
     }

     CURSO_COMPRADO.carregarImagensCursosLiberados = function (cod_curso, nome, arquivo) {

          $.ajax({
               url: URL_SISTEMA.url+"/arquivos/cursos/disponivel/imagens/cursos/" + cod_curso + "/" + nome + "/" + arquivo,
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

                         $("#imagem-compra-venda").attr('src', link)

                    }

               }

          });

     }

     CURSO_COMPRADO.enviarEmailCliente = function () {

          var form = new Object()

          form.nomeCompleto = $("#nome_completo_cliente_compra").val()
          form.cpf = $("#cpf_cliente_compra").val()
          form.endereco = $("#endereco_cliente_compra").val()
          form.email = $("#email_cliente_compra").val()
          form.telefone = $("#telefone_celular_cliente_compra").val()
          form.texto = $("#texto_solicitacao_cliente_compra").val()

          if (form.nomeCompleto == '' && form.cpf == '' && form.endereco == '' && form.email == '' && form.telefone == '' && form.texto == '') {
               $("#modal_aviso").html(CURSO_COMPRADO.modalAviso("Preencher todos campos para editora receber sua solicitação."));
               $("#modal_aviso").modal("show");
          } else {

               $("#modal_aviso").html(CURSO_COMPRADO.modalAviso("Enviando E-mail, aguarde finalização..."));
               $("#modal_aviso").modal("show"); 

               $.ajax({
                    url:URL_SISTEMA.url+"/email/enviar/solicitar/curso",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify(form),
                    success:function (mensagem) {
                         $("#form-input-compra-curso")[0].reset()
                         $("#modal_aviso").html(CURSO_COMPRADO.modalAviso(mensagem));
                         $("#modal_aviso").modal("show"); 
                    },
                    error:function () {
                         $("#modal_aviso").html(CURSO_COMPRADO.modalAviso("Erro ao tentar enviar solicitação de compra para a Editora Santorini."));
                         $("#modal_aviso").modal("show");  
                    }
               })
          }



     }

     CURSO_COMPRADO.limparFormCompraCurso = function () {
          $("#form-input-compra-curso")[0].reset()
     }

     CURSO_COMPRADO.modalAviso = function (mensagem) {
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