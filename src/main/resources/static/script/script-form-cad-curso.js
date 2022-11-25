var FORM_NOVO_CURSO = new Object();
var FORM_BUSCAR_CURSO = new Object();
var FORM_CURSO_NOVA_AULA = new Object();
var FORM_UPLOAD_MATERIAL = new Object();
var FORM_NOVO_MODULO = new Object();
var FORM_NOVA_CATEGORIA = new Object();
var FORM_AULAS = new Object();



$(document).ready(function () {

  FORM_NOVA_CATEGORIA.cadastrar = function () {
    $('#amb-cad-novo-curso').html('<h4 style="color: white;">Cadastrar Categoria</h4>' +
      '<form><input id="inpuCategoriaCurso" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Informe Categoria:" aria-label=".form-control-lg example"></form>' +
      '<div style="display: flex; justify-content: center; margin-top: 20px;">' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-success" style="margin-right: 10px;" onclick="CATEGORIA.cadastrar()">FINALIZAR</button>' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-danger" onclick="removerFormCadCategoria()">CANCELAR</button>' +
      '</div>');
  }

  FORM_NOVA_CATEGORIA.buscar = function () {
    $('#su-nova-categoria').remove()
    $('#amb-cad-nova-categoria').html('<h4 style="color: white;">Buscar Categoria</h4>' +
      '<input id="buscaNomeCategoria" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Informe Categoria:" aria-label=".form-control-lg example" onkeyup="CATEGORIA.buscarPorFragmento()">' +
      '<div style="max-height: 300px; overflow: auto; margin-top: 10px;">' +
      '<table style="color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;" class="table">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">NOME</th>' +
      '<th scope="col"></th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tabelaCategoria">' +

      '</tbody>' +
      '</table>' +
      '<script>CATEGORIA.carregar()</script>');
  }

  FORM_NOVO_CURSO.cadastrar = function () {
    $('#amb-cad-novo-curso').html(
      '<script>CURSO.carregarCategoria()</script>' +
      '<form enctype:"multipart/form-data" id="form-cad-novo-curso">' +
      '<h4 class="titulos-modais">Informações do Curso</h4>' +
      '<div class="amb-select-cat-curso">' +
      '<select id="lista-categoria-novo-curso" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example">' +
      '</select>' +
      '</div>' +
      '<p style="color: white;">Pense no título interessante para o seu curso, caso não goste você poderá alterar posteriormente.</p>' +
      '<input id="input-titulo-trabalho" class="input-novo-curso form-control form-control-lg" type="text" maxlength="30" placeholder="Título de Trabalho: ex (aprenda a programar do zero)" aria-label=".form-control-lg example">' +

      '<h4 class="titulos-modais">O que aprenderão?</h4>' +
      '<p style="color: white;">Aqui você dirá ao seu aluno no que resultará o aprendizado dele de acordo com o conteúdo.</p>' +
      '<input id="input-resultadoAprendizado" class="input-novo-curso form-control form-control-lg" type="text" maxlength="250" placeholder="Do que será capaz: ex (Definir funções ao gerente de empresa)" aria-label=".form-control-lg example">' +

      '<h4 class="titulos-modais">Pré - requisitos ou Requisitos</h4>' +
      '<p style="color: white;">Diga ao seu aluno, o que ele precisará saber de antemão para conseguir fazer o curso.</p>' +
      '<input id="input-preRequisito" class="input-novo-curso form-control form-control-lg" type="text" maxlength="250" placeholder="Pré - requisitos: ex (Saber conceitos básicos de administração de empresas)" aria-label=".form-control-lg example">' +

      '<h4 class="titulos-modais">Para quem se destina o Curso</h4>' +
      '<p style="color: white;">Indique para os interessados, a que se destina esse curso.</p>' +
      '<input id="input-destinatario" class="input-novo-curso form-control form-control-lg" type="text" maxlength="250" placeholder="Indicações: ex (Esse curso se destina para quem deseja ser técnico em administração)" aria-label=".form-control-lg example">' +

      '<h4 class="titulos-modais">Informações do Curso</h4>' +
      '<p style="color: white;">Insira um vídeo ou imagem de abertura para o seu curso material.</p>' +
      '<div style="display: flex;">' +
      '<div class="drop-menu-cad-material-curso dropdown">' +
      '<button class="btn-opcoes-cad-usuario btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">OPÇÕES</button>' +
      '<ul class="drop-menu-cad-material-curso dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
      '<!--<li><a class="dropdown-item" href="#" onclick="FORM_UPLOAD_MATERIAL.cadastrarMaterialAbertura(1)">VÍDEO</a></li>-->' +
      '<li><a class="dropdown-item" href="#" onclick="FORM_UPLOAD_MATERIAL.cadastrarMaterialAbertura(2)">IMAGEM</a></li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="amb-opcoes-cad-material-abertura"></div>' +
      '<h4 class="titulos-modais" style="margin-top: 7px;">Insira informações e conteúdos do seu curso</h4>' +
      '<input id="input-titulo" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Título do Curso" maxlength="250" aria-label=".form-control-lg example">' +

      '<input id="input-subTitulo" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Subtítulo do Curso" maxlength="250" aria-label=".form-control-lg example">' +

      '<textarea id="input-descricao" class="input-inf-curso form-control" placeholder="Descrição do Seu Curso:" maxlength="700" id="floatingTextarea2" style="height: 200px; resize: none;"></textarea>' +

      '<input style="margin-top:10px;" id="input-conteudoAAprender" class="input-inf-curso form-control form-control-lg" type="text" maxlength="250" placeholder="O que aprenderá essencialmente:" aria-label=".form-control-lg example" style="margin-top: -5px;">' +
      '<input style="margin-top:10px;" id="input-carga-horaria" class="input-inf-curso form-control form-control-lg" type="text" maxlength="250" placeholder="Carga Horária:" aria-label=".form-control-lg example" style="margin-top: -5px;">' +
      '<input style="margin-top:10px;" id="input-preco" class="input-inf-curso form-control form-control-lg" type="text" maxlength="250" placeholder="Preço:" aria-label=".form-control-lg example" style="margin-top: -5px;">' +

      '<div class="amb-upload-curso">' +
      '<div class="box-upload box-upload1">' +
      '<img class="imagem-fundo-curso" src="'+URL_SISTEMA.url+'/imagens/botoes-logos/rotina-estudos.jpg" alt="imagem de animação para mural de curso">' +
      '</div>' +
      '<div class="box-upload box-upload2">' +
      '<p>Aqui você deve fazer Upload de uma imagem de capa para o seu curso. Para que essa imagem atenda aos requisitos' +
      'de padrão de qualidade de imagem para o curso, deve fazer Upload de arquivo com resolução de 333 x 333 jpg.</p>' +
      '<p>' +
      'Também é importante lembrar que o arquivo deve ser do tipo jpg, seguindo os requisitos acima' +
      'orientados.' +
      '</p>' +
      '<h5 style="color:white;margin:10px 0 5px 0;">Insira a imagem de capa para o seu curso:</h5>' +
      '<input name="imagem_capa_curso" class="form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;">' +
      '<p style="color:yellow; font-weight:bold;">ATENÇÃO: Dimencionamento de imagem deve ser 425 largura x 294 altura.</p>'+
      '</div>' +
      '</div>' +
      '<div style="display: flex; justify-content: center; margin-top: 20px;">' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-success" style="margin-right: 10px;" onclick="CURSO.exibirModalCadastrar()">FINALIZAR</button>' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-danger" onclick="removerFormCadCurso()">CANCELAR</button>' +
      '</div>' +
      '</form>')
  }

  FORM_BUSCAR_CURSO.buscar = function () {

    $('#amb-cad-novo-curso').html('<h4 style="color: white;">Buscar Curso</h4>' +
      '<input id="buscaNomeCurso" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Informe Título:" aria-label=".form-control-lg example" onkeyup="CURSO.buscarPorFragmento()">' +
      '<div style="max-height: 300px; overflow: auto; margin-top: 10px;">' +
      '<table style="color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;" class="table">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">Título</th>' +
      '<th scope="col"></th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tabelaCursos">' +

      '</tbody>' +
      '</table>' +
      '<script>CURSO.carregar();</script>');
  }

  FORM_NOVO_MODULO.buscarModulos = function () {
    
    $('#amb-cad-novo-modulo').html('<script>'+
    'MODULO.carregarCursosPai();'+
    '$(".selects-cat-curso").change(function (){var id_curso = ($(this).val()); MODULO.carregarModulosCursoPai(id_curso)});</script>'+
    '<script>MODULO.carregarModulosCursoPai("null")</script>'+
    '<h4 style="color: white;">Buscar Módulos</h4>' +
    '<select id="lista_cursosPai_modulo" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
    'style="margin-right: 10px;"></select>' +
      '<div style="max-height: 300px; overflow: auto; margin-top: 10px;">' +
      '<table style="color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;" class="table">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">Título</th>' +
      '<th scope="col"></th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tabela_lista_cursosPai_modulo">' +

      '</tbody>' +
      '</table>');
  }

  FORM_NOVO_MODULO.buscarAulas = function () {
    $('#amb-cad-novo-modulo').html(
    '<script>MODULO.carregarCursosPai();'+
    'MODULO.carregarModulosAulaPaiSelect("null");'+
    '$(".selects-cat-curso").change(function (){var id_curso = ($(this).val()); MODULO.carregarModulosAulaPaiSelect(id_curso)});'+
    '$(".selects-cat-modulos").change(function (){var id_modulo = ($(this).val()); MODULO.carregarModulosPaiAulas(id_modulo)});'+
    '</script>'+
    '<h4 style="color: white;">Buscar Aulas</h4>' +
    '<select id="lista_cursosPai_modulo" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
    'style="margin-right: 10px;"></select>' +
    '<select id="lista_moduloPai_aulas" class="selects-cat-modulos form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
    'style="margin-right: 10px;"></select>' +
      '<div style="max-height: 300px; overflow: auto; margin-top: 10px;">' +
      '<table style="color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;" class="table">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">Aula</th>' +
      '<th scope="col"></th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tabelaAulas">' +

      '</tbody>' +
      '</table>');
    
  }

  FORM_UPLOAD_MATERIAL.cadastrarMaterialAbertura = function (index) {
    if (index == 1) {
      $('.amb-opcoes-cad-material-abertura').html('<h5 style="color:white;margin:10px 0 5px 0;">Vídeo:</h5><input class="form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;">')
    } else {
      $('.amb-opcoes-cad-material-abertura').html(
        '<h5 style="color:white;margin:10px 0 5px 0;">Imagem:</h5><input name="imagem_abertura_curso" class="form-input-entrada-curso form-control form-control-lg" id="imagemAberturaCurso" type="file" style="margin-bottom: 10px;">'+
        '<p style="color:yellow; font-weight:bold;">ATENÇÃO: Dimencionamento de imagem deve ser 314 largura x 210 altura.</p>'
        )
    }
  }

  FORM_NOVO_MODULO.cadastrarModulo = function () {
    
    $('#amb-cad-novo-modulo').html(
      '<div id="form-cad-novo-modulo">'+
      '<script>MODULO.carregarCursos()</script>' +
      '<div style="margin-top:0px;">' +
      '<form id="form-novo-modulo">' +
      '<p style="color: white;">ATENÇÃO! Será preciso selecionar o curso que acabou de cadastrar para salvar os módulos' +
      'criados com os seus vídeos.</p>' +
      '<select id="lista_cursos_modulo" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
      'style="margin-right: 10px;"></select>' +
      '<input name="nomemodulo" id="nome_modulo" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Informe nome do módulo:"' +
      'aria-label=".form-control-lg example">' +
      '<div class="amb-cad-video-novo-curso"' +
      'style=" border-radius: 5px; max-height: 400px; overflow: auto; background-color: #041155b0;margin-top:10px;">' +

      '</div>' +
      '<div style="display: flex; justify-content: center; margin-top: 10px;">' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-success"' +
      'style="margin-right: 10px;" onclick="MODULO.cadastrar()">FINALIZAR</button>' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-danger" onclick="removerFormCadModulo()">CANCELAR</button>' +
      '</div>' +
      '</form>' +
      '</div>'+
      '</div>')
  }

  FORM_CURSO_NOVA_AULA.novoVideo = function () {

    $('#amb-cad-novo-video').html(
      '<script>MODULO.carregarCursos()</script>' +
      '<form id="form-cad-videos">'+
      '<select id="lista_cursos_modulo" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
      'style="margin-right: 10px;"></select>' +
      '<select id="lista_modulo" class="selects-cat-curso form-select form-select-lg mb-3" aria-label=".form-select-lg example"' +
      'style="margin-right: 10px;"></select>' +
      '<h4 class="text-titulo-cad-video" style="color:white;margin-top:10px;">Vídeo Aula</h4>' +
      '<input name="nomevideoaula" id="nome_vide_aula" class="tit-nome-video input-inf-curso form-control form-control-lg" type="text" placeholder="Informe Título da Aula:" aria-label=".form-control-lg example" style="margin-bottom: 10px;">' +
      '<h5 style="color: white;">Insira a vídeo aula:</h5>' +
      '<input name="videoAula" id="video_aula_class" class="video_aula form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;">' +
      '<h5 style="color: white;">Insira materia de apoio:</h5>' +
      '<input name="materiaisAula" id="material_aula" class="materiais_aula materiais_aula_index form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;" multiple >' +
      '<div style="display:flex; color:white; margin-top:5px;"><div style="margin:0 5px 0 0;">Upload:</div><div id="porcent-text"></div></div>' +

      '<div class="progress">' +
      '<div id="barra-progresso" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><div id="porcent" style="font-weight:bold; color:white; text-align:center;"></div></div>' +
      '</div>' +
      '<div style="display: flex; justify-content: center; margin-top: 10px;">' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-success"' +
      'style="margin-right: 10px;" onclick="MODULO.cadastrar()">FINALIZAR</button>' +
      '<button type="button" class="btn-finalizar-cad-curso btn btn-danger" onclick="removerFormCadVideo()">CANCELAR</button>' +
      '</div>' +
      '</form>')
    
    movimentarScrollModulo(630, 200)
  }
})

function removerFormCadCurso() {
  $("#form-cad-novo-curso").remove()
  $("#amb-cad-novo-curso").html("<h5 class='titulos-modais'>Cadastre seu curso escolhendo a opção cadastrar.</h5>");
  movimentarScroll(0, 200)
}

function removerFormCadCategoria() {
  $("#form-cad-novo-curso").remove()
  $("#amb-cad-novo-curso").html("<h5 class='titulos-modais'>Cadastre uma categoria escolhendo a opção cadastrar, assim seu curso poderá ser incluído nela.</h5>");
  movimentarScroll(0, 200)
}

function limparFormulario() {
  $('#form-cad-videos')[0].reset();
}

function removerFormCadModulo() {
  $("#form-cad-novo-modulo").remove()
  $("#amb-cad-novo-modulo").html("<h5 class='titulos-modais'>Cadastre os módulos do curso escolhendo a opção cadastrar.</h5>");
  movimentarScroll(0, 200)
}

function removerFormCadVideo() {

  $("#form-cad-videos").remove()
  $("#amb-cad-novo-video").html("<h5 class='titulos-modais'>Insira suas vídeo aulas escolhendo a opção cadastrar.</h5>");
  movimentarScroll(0, 200)
}

function movimentarScroll(index, velocidade) {
  $("#exibicao-conteudo2").animate({
    scrollTop: index
  }, velocidade);
}

function movimentarScrollModulo(index, velocidade) {
  $("#exibicao-conteudo2").animate({
    scrollTop: index
  }, velocidade);
}