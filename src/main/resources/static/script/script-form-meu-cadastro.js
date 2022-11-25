var LOAD_FORM_MEU_CADASTRO = new Object();
$(document).ready(function () {
  LOAD_FORM_MEU_CADASTRO.exibirFormulario = function () {
    $(".container-form-cadastro-novo-plano").html(
      '<div class="form-cadastro-novo-plano">' +
      '<div class="cursos-adicionados-plano-estudo">' +
      '<h4 class="titulos-modais">Cadastrar Novo Plano</h4>' +
      '<form action="#">' +
      '<input class="inputs-novo-plano form-control form-control-lg" type="text" placeholder="Título de Plano:"' +
      'aria-label=".form-control-lg example" style="margin-bottom: 10px;">' +
      '<textarea class="inputs-novo-plano form-control" placeholder="Informe descrição:" id="floatingTextarea2"' +
      'style="height: 200px; resize: none;"></textarea>' +
      '<div style="display: flex; justify-content: center; margin-top: 10px;">' +
      '<button type="button" class="btn-form-criar-plano btn btn-success">CADASTRAR<button type="button"' +
      'class="btn-form-criar-plano btn btn-danger" onclick="LOAD_FORM_NOVO_PLANO.removerFormulario()">CANCELAR</button>' +
      '</div>' +
      '</form>' +
      '</div>' +
      '</div>')
    
  }

  LOAD_FORM_NOVO_PLANO.removerFormulario = function () {
    $(".form-cadastro-novo-plano").hide()
    //retorna scroll ao topo da página
    //movimentarScroll(0, 200)
  }

  function movimentarScroll(index, velocidade) {
    $("#exibicao-conteudo2").animate({
      scrollTop: index
    }, velocidade);
  }
})