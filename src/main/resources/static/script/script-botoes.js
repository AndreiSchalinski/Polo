var BOTAO_HAMB = new Object()

$(document).ready(function () {

    $(".fechar-menu").click(function () {

        $(".amb-opcoes-menu-botoes").hide(350);
        MENU_NAV.alterarTamanhoFrase(2)
        $("#inform-usuario").css("display", "flex")
        $(".amb-triangulos").css("visibility", "collapse")
    })

    $('.botao-nav-responsivo').click(function () {
        $("#exemplo").toggle(400);
        $(".nav2").css("display", "flex")
    })

    //função para controlar menu de navegação

    $(".bot-nav-icons").click(function () {
        $("#inform-usuario").css("display", "none")
        $(".amb-opcoes-menu-botoes").show();
        $(".amb-opcoes-menu-botoes").css("display", "flex")

        //$(".amb-opcoes-menu-botoes").animate({width: 'toggle',},0);
    });

    $(".btn-perfil").click(function () {
        $(".dropdown-menu-perfil").animate({ right: '250px' });
    })


    const btnMobile = document.getElementById('hamburguer')

    btnMobile.addEventListener('click', function () {

        btnMobile.classList.toggle('ativar')
        $(".nav").animate({ width: 'toggle', }, 0);
        
        var l = document.getElementById("cursos-disponiveis")

        var div = document.getElementById("amb-infos-form-compra-curso")

        if (div !== null) {
            if (div.scrollWidth < 700) {
                
                $("#amb-infos-form-compra-curso").css({"flex-wrap":"wrap"})
                $("#amb-form-curs-venda").css({"width":"100%"})
                $("#imagem-compra-venda").css({"width":"100%"})
                $("#form-input-compra-curso").css({"margin-left":"0"})
            } else {
                $("#amb-infos-form-compra-curso").css({"flex-wrap":"nowrap"})
                $("#amb-form-curs-venda").css({"width":"420px"})
                $("#imagem-compra-venda").css({"width":"400"})
                $("#form-input-compra-curso").css({"margin-left":"10px"})
            }
        } 

        if (l !== null) {
            if (l.scrollWidth < 900) {
                $("#amb-infos-form-compra-curso").css({"display":"flex-wrap: wrap"})
                $(".container-planos-de-estudos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-finalizados").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-play-meus-cursos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-conteudos-disponiveis").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-meus-cursos-concluidos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-mais-vendidos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-mais-acessados").css({ "grid-template-columns": "repeat(2, 1fr)" })
            } else if (l.scrollWidth > 900) {
                $("#amb-infos-form-compra-curso").css({"display":"flex-wrap: flex"})
                $(".container-planos-de-estudos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-finalizados").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-play-meus-cursos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-conteudos-disponiveis").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-meus-cursos-concluidos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-mais-vendidos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-mais-acessados").css({ "grid-template-columns": "repeat(3, 1fr)" })
            }
        }

        
    })

    document.body.onresize = function () {
        var l = document.getElementById("cursos-disponiveis")

        var div = document.getElementById("amb-infos-form-compra-curso")

        if (div !== null) {
            if (div.scrollWidth < 700) {
                $("#amb-infos-form-compra-curso").css({"flex-wrap":"wrap"})
                $("#amb-form-curs-venda").css({"width":"100%"})
                $("#imagem-compra-venda").css({"width":"100%"})
                $("#form-input-compra-curso").css({"margin-left":"0"})
            }  else {
                $("#amb-infos-form-compra-curso").css({"flex-wrap":"nowrap"})
                $("#amb-form-curs-venda").css({"width":"420px"})
                $("#imagem-compra-venda").css({"width":"400px"})
                $("#form-input-compra-curso").css({"margin-left":"10px"})
            }
        }

        if (l !== null) {
            if (l.scrollWidth < 900) {
                $("#amb-infos-form-compra-curso").css({"display":"flex-wrap: wrap"})
                $(".container-planos-de-estudos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-finalizados").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-play-meus-cursos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-conteudos-disponiveis").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-meus-cursos-concluidos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-mais-vendidos").css({ "grid-template-columns": "repeat(2, 1fr)" })
                $(".container-cursos-mais-acessados").css({ "grid-template-columns": "repeat(2, 1fr)" })
            } else if (l.scrollWidth > 900) {
                $("#amb-infos-form-compra-curso").css({"display":"flex-wrap: flex"})
                $(".container-planos-de-estudos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-finalizados").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-play-meus-cursos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-conteudos-disponiveis").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-meus-cursos-concluidos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-mais-vendidos").css({ "grid-template-columns": "repeat(3, 1fr)" })
                $(".container-cursos-mais-acessados").css({ "grid-template-columns": "repeat(3, 1fr)" })
            }
        } 
    };

})





