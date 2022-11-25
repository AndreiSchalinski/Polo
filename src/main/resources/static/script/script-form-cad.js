var FORM = new Object();

$(document).ready(function () {

  FORM.cadastrar = function () {
    
    $('#amb-cad-novo-curso').html('<h4 class="titulos-modais">Cadastrar Usuário</h4><form id="form-cad-novo-usuario">'+
    '<input id="nomeUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Nome Completo:" aria-label=".form-control-lg example">' +
    '<input id="emailUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="E-mail:" aria-label=".form-control-lg example">' +
    '<input id="nomeCertificadoUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Nome para Certificado:" aria-label=".form-control-lg example">' +
    '<input id="cpfUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="CPF:" maxlength="11" aria-label=".form-control-lg example">' +
    '<input id="loginUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Login:" aria-label=".form-control-lg example">' +
    '<input id="senhaUsuarioCad" class="input-cad-key-admin form-control form-control-lg" type="password" placeholder="Senha:" aria-label=".form-control-lg example">' +
    '<h5 style="color:white; margin-top:15px;">Permissão de Acesso:</h5>'+
    '<fieldset style="display:flex; color:white; padding:10px 10px; background-color:#041155; border-radius:5px;">' +
      '<div style="margin-right:20px;" class="form-check">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioOptions1">'+
        '<label style="font-weight:bold;" class="form-check-label" for="inlineRadioOptions1">'+
        'ADMINISTRADOR'+
        '</label>'+
      '</div>'+
      '<div class="form-check">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioOptions2">'+
        '<label style="font-weight:bold;" class="form-check-label" for="inlineRadioOptions2">'+
        'ESTUDANTE'+
        '</label>'+
      '</div>'+
    '</fieldset>'+
    
    '<div style="display:flex;justify-content:center;margin-top:10px;"><button type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.exibirModalCadastrar()">FINALIZAR</button><button type="button" class="btn btn-danger" onclick="FORM.removerFormulario()">CANCELAR</button></div>' +
    '</form>')
    
  }

  FORM.consutarUsuario = function () {
    $('#amb-cad-novo-curso').html("<script>USUARIO.carregar()</script><h4 style='color: white;'>Buscar Usuário</h4>"+
    "<input id='buscaNomeUsuario' class='input-cad-key-admin form-control form-control-lg' type='text' placeholder='Informe Nome:' aria-label='.form-control-lg example' onkeyup='USUARIO.buscarPorFragmento()'>"+
    "<div style='max-height: 300px; overflow: auto; margin-top: 10px;'>"+
     "<table style='color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;' class='table'>"+
        "<thead>"+
          "<tr>"+
            "<th scope='col'>NOME</th>"+
           "<th scope='col'>OPÇÕES</th>"+
          "</tr>"+
        "</thead>"+
        "<tbody id='tabelaUsuarios'>"+
  
        "</tbody>"+
      "</table>"+
   "</div>")
    
    movimentarScroll(150, 500)
  }

  FORM.consutarUsuarioParaLiberarCurso = function () {
    $('#amb-cad-novo-curso').html("<script>USUARIO.carregarUsuariosParaCurso()</script><h4 style='color: white;'>Buscar Usuário</h4>"+
    "<input id='buscaNomeUsuarioLiberar' class='input-cad-key-admin form-control form-control-lg' type='text' placeholder='Informe Nomes:' aria-label='.form-control-lg example' onkeyup='USUARIO.buscarPorFragmentoUsuarioLiberado()'>"+
    "<div style='max-height: 300px; overflow: auto; margin-top: 10px;'>"+
     "<table style='color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;' class='table'>"+
        "<thead>"+
          "<tr>"+
            "<th scope='col'>NOME</th>"+
           "<th scope='col'>OPÇÕES</th>"+
          "</tr>"+
        "</thead>"+
        "<tbody id='tabelaUsuarios'>"+
  
        "</tbody>"+
      "</table>"+
   "</div>")
    
    movimentarScroll(150, 500)
  }

  FORM.removerFormulario = function () {
    $("#amb-cad-novo-curso").remove()
    //retorna scroll ao topo da página
    movimentarScroll(0, 200)
    $(".amb-novo-curso").html("<div id='amb-cad-novo-curso'><h5 class='titulos-modais'>Cadastre usuário para administrar ou estudar na plataforma.</h5></div>")
  }

  function movimentarScroll(index, velocidade) {
    $("#exibicao-conteudo2").animate({
      scrollTop: index
    }, velocidade);
  }

})