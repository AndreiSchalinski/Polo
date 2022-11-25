var USER = new Object();

$(document).ready(function () {

     USER.enviarEmail = function () {

          var email = $("#emailuser").val()

          $("#modal_aviso").html(USER.modalAvisoCarregamento("Aguarde carregamento para finalizar envio de e-mail..."));
          $("#modal_aviso").modal("show");
          
          $.ajax({
               url: URL_SISTEMA.url+"/lembrarme/"+email,
               method:"POST",
               success:function (mensagem) {
                    $("#modal_aviso").html(USER.modalAviso(mensagem));
                    $("#modal_aviso").modal("show");
                    $("#emailuser").val('')
               },
               error:function () {
                    $("#modal_aviso").html(USER.modalAviso("Erro ao tentar enviar e-mail de redefinação de senha."));
                    $("#modal_aviso").modal("show");
               }
           })
     }

     USER.enviarInformacao = function () {


          var url = window.location.href

          url = url.split('?token=')
          url = url[1]

          var info1 = $("#info1").val()
          var info2 = $("#info2").val()

          var confirm = false;
          var mensagem = "";

          if (info1 == '' && info2 == '') {
               
               mensagem = "Preencher os campos para enviar informações.";
               confirm = true;
          }

          if (info1 !== info2) {
               mensagem = "A senha nova precisa ser igual nos dois campos!";
               confirm = true;
          }

          if (confirm) {

               $("#modal_aviso").html(USER.modalAviso(mensagem));
               $("#modal_aviso").modal("show"); 

          } else {

               var user = new Object()

               user.info2 = info2
               user.token = url
               
               $.ajax({
                    url: URL_SISTEMA.url+"/newpas",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify(user),
                    success:function (mensagem) {
                         $("#modal_aviso").html(USER.modalAvisoSenhaRedefinida(mensagem));
                         $("#modal_aviso").modal("show");
                         
                    },
                    error:function () {
                         $("#modal_aviso").html(USER.modalAviso("Erro ao redefinir senha."));
                         $("#modal_aviso").modal("show"); 
                    }
                }) 

          }          
          
     }

     USER.modalAvisoCarregamento = function (mensagem) {
          var modal = '<div class="modal-dialog">'+
          '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
            '<div class="modal-header">'+
              '<h5 class="modal-title">AVISO!</h5>'+
            '</div>'+
            '<div class="modal-body" style="height:150px;">'+
              '<p>'+mensagem+'</p>'+
            '</div>'+
            '<div class="modal-footer">'+
            '</div>'+
          '</div>'+
        '</div>'
        return modal;
      }

     USER.modalAviso = function (mensagem) {
          var modal = '<div class="modal-dialog">'+
          '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
            '<div class="modal-header">'+
              '<h5 class="modal-title">AVISO!</h5>'+
            '</div>'+
            '<div class="modal-body">'+
              '<p>'+mensagem+'</p>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>'+
            '</div>'+
          '</div>'+
        '</div>'
        return modal;
      }

      USER.modalAvisoSenhaRedefinida = function (mensagem) {
          var modal = '<div class="modal-dialog">'+
          '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
            '<div class="modal-header">'+
              '<h5 class="modal-title">AVISO!</h5>'+
            '</div>'+
            '<div class="modal-body">'+
              '<p>'+mensagem+'</p>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="USER.voltarAologin()">OK</button>'+
            '</div>'+
          '</div>'+
        '</div>'
        return modal;
      }

      USER.voltarAologin = function () {
          window.location.href= "/polo/login"
      }
})