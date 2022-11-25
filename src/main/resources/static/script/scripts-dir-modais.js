var LOAD_MODAL = new Object();

$(document).ready(function () {

    $("#amb-exibi-conteudo").load("modal_telas/modais_tela_meu_aprendizado/modal_Dashboard.html");

    LOAD_MODAL.carregarModal = function (index) {
        voltarScrollTop();
        if (index == 1) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_meu_aprendizado/modal_Dashboard.html");
        } else if (index == 2) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_meu_aprendizado/modal_planos_de_estudo.html");
        } else if (index == 3) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_meu_aprendizado/modal_meus_cursos.html");
        } else if (index == 4) {
            
        } else if (index == 5) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_conteudos/modal_formacoes.html");
        } else if (index == 6) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_conteudos/modal_edicoes_santorini.html");
        } else if (index == 7) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_perfil_certificados/modal_minhas_informacoes.html");
        } else if (index == 8) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_perfil_certificados/modal_cursos_concluidos.html");
        } else if (index == 12) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_vendas/modal_cursos_vendidos.html");
        } else if (index == 13) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_vendas/modal_relatorios.html");
        } else if (index == 10) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_vendas/modal_novo_curso.html");
        } else if (index == 9) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_vendas/modal_cursos_categorias.html");
        } else if (index == 14) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_admin/modal_acessos.html");
        }else if (index == 11) {
            $("#amb-exibi-conteudo").load("modal_telas/modais_tela_vendas/modal_novo_modulo.html");
        }

        esconderNav();
    }

    function esconderNav() {
        $(".nav").hide()
        $("span").removeClass("ativar") // normailizar botão hamburguer
    }

    function voltarScrollTop() {
        $("#exibicao-conteudo2").animate({
            scrollTop: 0
        }, 0);
    }

})