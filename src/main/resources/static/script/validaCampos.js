var INPUT = new Object();
$(document).ready(function () {
    //função para validar se input iniciar com espaço em branco.
    INPUT.validaEspacoEmBranco = function (input) {
        if (input.match(/^[ \t]+$/)) {
            return true
        } else {
            return false;
        }
    }
})