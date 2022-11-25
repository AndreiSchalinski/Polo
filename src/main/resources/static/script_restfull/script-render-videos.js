var VIDEO = new Object();
var MATERIAL = new Object();
var IMAGEM_CAPA_VIDEO = new Object();

$(document).ready(function () {

    VIDEO.carregarNomeVideoAula = function (cod_aula) {

        $.ajax({
            url: URL_SISTEMA.url+"/arquivos/video/carregar/" + cod_aula,
            method: "GET",
            success: function (nomeVideo) {

                VIDEO.carregarVideo(nomeVideo, cod_aula);

            },
            error: function () {
                
            }
        })

    }

    VIDEO.carregarVideo = function (nomeVideo, cod_aula) {

        $.ajax({
            url: URL_SISTEMA.url+"/arquivos/video/carregar/download/bytes/" + cod_aula + "/" + nomeVideo,
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
            success: function (data, nomeVideo) {
                //Convert the Byte Data to BLOB object.

                var blob = new Blob([data], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, nomeVideo);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);

                    $("#video-aula").attr("src", link)

                }
            }
        });
    }

    MATERIAL.carregarNomeMateriaias = function (cod_aula) {
        $.ajax({
            url: URL_SISTEMA.url+"/arquivos/materiais/carregar/" + cod_aula,
            method: "GET",
            success: function (materiais) {

                if (materiais !== true) {

                    for (let i = 0; i < materiais.length; i++) {
                        MATERIAL.carregarMateriais(materiais[i], cod_aula)
                    }

                } else{
                    $("#amb-materiais-download").html("<p>Não há materiais de apoio cadastrados nesta aula.</p>");
                }

            },
            error: function () {
                
            }
        })
    }

    
    var index = 0;

    MATERIAL.carregarMateriais = function (nomeMaterial, cod_aula) {
        index = 0
        $.ajax({
            url: URL_SISTEMA.url+"/arquivos/materiais/carregar/download/bytes/" + cod_aula + "/" + nomeMaterial,
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

                index++

                //Convert the Byte Data to BLOB object.

                var blob = new Blob([data], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, nomeMaterial);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);

                    $("#amb-materiais-download").append("<div id='materiais' style='background:#198754; width:50%; text-align:center; border-radius:5px;'><a style='text-decoration:none; color:white;' href="+link+" download="+nomeMaterial+"><p>MATERIAL DE APOIO "+(index)+"<p></p></a></div>");
                    
                }
                
            }
            
        });
        
    }

})