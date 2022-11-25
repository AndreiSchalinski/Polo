var USUARIO = new Object();
$(document).ready(function () {

    USUARIO.carregar = function () {
        $.ajax({
            url: URL_SISTEMA.url+"/usuario/carregar",
            method: "GET",
            success: function (result) {

                var lista = '';

                if (result == true) {
                    lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Ainda não há usuários cadastrados na plataforma.</h4>";
                } else {
                    for (let i = 0; i < result.length; i++) {
                        lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='USUARIO.carregarStatus(" + result[i].id + ")'>AÇÕES</button></td></tr>";
                    }
                }
                $("#tabelaUsuarios").html(lista);
            },
            error: function (result) {
                
            }
        })
    };

    USUARIO.carregarUsuariosParaCurso = function () {
        $.ajax({
            url: URL_SISTEMA.url+"/usuario/carregar",
            method: "GET",
            success: function (result) {

                var lista = '';

                if (result == true) {
                    lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Ainda não há usuários cadastrados na plataforma.</h4>";
                } else {
                    for (let i = 0; i < result.length; i++) {
                        lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='USUARIO.exibirModalLiberarUsuarioParaCurso(" + result[i].id + ")'>AÇÕES</button></td></tr>";
                    }
                }
                $("#tabelaUsuarios").html(lista);
            },
            error: function (result) {
                
            }
        })
    };
    

    USUARIO.cadastrar = function () {

        var usuario = new Object();
        usuario.nome = $("#nomeUsuarioCad").val();
        usuario.email = $("#emailUsuarioCad").val();
        usuario.nome_certificado = $("#nomeCertificadoUsuarioCad").val();
        usuario.cpf = $("#cpfUsuarioCad").val();
        usuario.username = $("#loginUsuarioCad").val();
        usuario.password = $("#senhaUsuarioCad").val();
        usuario.autoridade = "";

        for (let i = 0; i < document.getElementsByName("inlineRadioOptions").length; i++) {
            if (document.getElementsByName("inlineRadioOptions")[i].checked == true && i == 0) {
                usuario.autoridade = "ADMIN"
            } else if (document.getElementsByName("inlineRadioOptions")[i].checked == true && i == 1) {
                usuario.autoridade = "USER"
            }

        }

        usuario.status = 1;

        if (usuario.nome !== '' && usuario.email !== '' && usuario.nome_certificado !== '' && usuario.cpf !== '' && usuario.usuario !== '' && usuario.senha !== '' && usuario.autoridade !== '') {
            $.ajax({
                url: URL_SISTEMA.url+"/usuario/salvar",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function (result) {
                    $('#form-cad-novo-usuario')[0].reset();
                    $("#modal_aviso").html(USUARIO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()
                    USUARIO.carregar();
                },
                error: function (result) {
                    
                }
            })
        } else {

            var mensagem = ""
            if (usuario.autoridade == '') {
                mensagem = "Informar permissão de acesso que usuário terá."
            } else {
                mensagem = "Todos os campos precisam ser preenchidos!"
            }
            $("#modal_aviso").html(USUARIO.modalAviso(mensagem))
            $("#modal_aviso").modal("show")

        }
    }

    USUARIO.buscarPorFragmentoUsuarioLiberado = function () {

        var usuario = $('#buscaNomeUsuarioLiberar').val()

        if (INPUT.validaEspacoEmBranco(usuario) !== true) {
            if (usuario == '') {
                USUARIO.carregarUsuariosParaCurso();
            } else {
                $.ajax({
                    url: URL_SISTEMA.url+"/usuario/coletar/" + usuario,
                    method: "GET",
                    success: function (result) {
                        var lista = '';
                        if (result.length == 0) {
                            lista = "<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>";
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='USUARIO.exibirModalLiberarUsuarioParaCurso(" + result[i].id + ")'>AÇÕES</button></td></tr>";
                            }
                        }
                        $("#tabelaUsuarios").html(lista);
                    },
                    error: function (result) {
                        
                    }

                })
            }
        } else {
            $("#tabelaUsuarios").html("<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>");
        }

    }

    USUARIO.buscarPorFragmento = function () {

        var usuario = $('#buscaNomeUsuario').val()

        if (INPUT.validaEspacoEmBranco(usuario) !== true) {
            if (usuario == '') {
                USUARIO.carregar();
            } else {
                $.ajax({
                    url: URL_SISTEMA.url+"/usuario/coletar/" + usuario,
                    method: "GET",
                    success: function (result) {
                        var lista = '';
                        if (result.length == 0) {
                            lista = "<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>";
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                lista += "<tr><td>" + result[i].nome + "</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='USUARIO.carregarStatus(" + result[i].id + ")'>AÇÕES</button></td></tr>";
                            }
                        }
                        $("#tabelaUsuarios").html(lista);
                    },
                    error: function (result) {
                        
                    }

                })
            }
        } else {
            $("#tabelaUsuarios").html("<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>");
        }

    }

    USUARIO.buscarPorID = function (cod_usuario) {
        $.ajax({
            url: URL_SISTEMA.url+"/usuario/buscar/" + cod_usuario,
            method: "GET",
            success: function (usuario) {

                if (usuario !== null) {
                    $("#nomeAtUsuarioCad").val(usuario.nome);
                    $("#emailAtUsuarioCad").val(usuario.email);
                    $("#nomeAtCertificadoUsuarioCad").val(usuario.nome_certificado);
                    $("#cpfAtUsuarioCad").val(usuario.cpf);
                    $("#loginAtUsuarioCad").val(usuario.username);
                    $("#permissao").html('<p style="margin:0;">Permissão Atual: ' + usuario.autoridade + '</p>')

                } else {
                    var mensagem = "<p style='font-size:13px;'>Cadastro não encontrado para atualizar!</p>";
                    $("#modal_aviso").html(USUARIO.modalAviso(mensagem))
                    $("#modal_aviso").modal("show")
                }
            },
            error: function (result) {
                
            }

        })
    }

    USUARIO.atualizar = function (cod_usuario) {
        var usuario = new Object();
        usuario.id = cod_usuario;
        usuario.nome = $("#nomeAtUsuarioCad").val();
        usuario.email = $("#emailAtUsuarioCad").val();
        usuario.nome_certificado = $("#nomeAtCertificadoUsuarioCad").val();
        usuario.cpf = $("#cpfAtUsuarioCad").val();
        usuario.autoridade = ""

        for (let i = 0; i < document.getElementsByName("inlineRadioUser").length; i++) {
            if (document.getElementsByName("inlineRadioUser")[i].checked == true && i == 0) {
                usuario.autoridade = "ADMIN"
            } else if (document.getElementsByName("inlineRadioUser")[i].checked == true && i == 1) {
                usuario.autoridade = "USER"
            }

        }

        usuario.username = $("#loginAtUsuarioCad").val();

        if (usuario.nome !== '' && usuario.email !== '' && usuario.nome_certificado !== '' && usuario.cpf !== '' && usuario.username !== '' && usuario.senha !== '' && usuario.autoridade !== '') {
            $.ajax({
                url: URL_SISTEMA.url+"/usuario/editar",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function (result) {
                    $("#modal_aviso").html(USUARIO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()
                    USUARIO.carregar();
                },
                error: function (result) {
                    
                }
            })
        } else {

            var mensagem = "";

            if (usuario.autoridade == '') {
                mensagem = "Informar permissão de acesso para atualizar cadastro.";
            } else {
                mensagem = "Todos os campos precisam ser preenchidos!";
            }


            $("#modal_aviso").html(USUARIO.modalAviso(mensagem));
            $("#modal_aviso").modal("show");
        }
    }

    USUARIO.atualizarUsuarioLogado = function (cod_usuario) {
        var usuario = new Object();
        usuario.id = cod_usuario;
        usuario.nome = $("#nomeAtUsuarioLogado").val();
        usuario.email = $("#emailAtUsuarioLogado").val();
        usuario.nome_certificado = $("#nomeAtCertificadoUsuarioLogado").val();
        usuario.cpf = $("#cpfAtUsuarioLogado").val();
        usuario.username = $("#loginAtUsuarioLogado").val();

        if (usuario.nome !== '' && usuario.email !== '' && usuario.nome_certificado !== '' && usuario.cpf !== '' && usuario.username !== '') {
            $.ajax({
                url: URL_SISTEMA.url+"/usuario/logado/editar",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function (result) {

                    $("#modal_aviso").html(USUARIO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()
                    window.location.reload(true)

                },
                error: function (result) {
                    
                }
            })
        } else {

            var mensagem = "Todos os campos precisam ser preenchidos!";
            $("#modal_aviso").html(USUARIO.modalAviso(mensagem));
            $("#modal_aviso").modal("show");
        }
    }

    USUARIO.buscarPorNome = function () {

        var token = document.getElementsByClassName("token-user")[0].textContent;

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/buscar/nome/" + token,
            method: "GET",
            success: function (usuario) {

                if (usuario !== null) {

                    USUARIO.exibirModalEditaUsuarioLogado(usuario)
                    $("#nomeAtUsuarioLogado").val(usuario.nome);
                    $("#emailAtUsuarioLogado").val(usuario.email);
                    $("#nomeAtCertificadoUsuarioLogado").val(usuario.nome_certificado);
                    $("#cpfAtUsuarioLogado").val(usuario.cpf);
                    $("#loginAtUsuarioLogado").val(usuario.username);

                } else {

                    var mensagem = "<p style='font-size:13px;'>Cadastro não encontrado para atualizar!</p>";
                    $("#modal_aviso").html(USUARIO.modalAviso(mensagem))
                    $("#modal_aviso").modal("show")
                }
            },
            error: function (result) {
                
            }

        })
    }

    USUARIO.buscarPorUsuarioID = function () {

        var token = document.getElementsByClassName("token-user")[0].textContent;

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/buscar/informacoes/cadastro/" + token,
            method: "GET",
            success: function (usuario) {

                if (usuario !== null) {

                    $("#inf-cad-user-nome-completo").html(usuario.nome)
                    $("#inf-cad-user-email").html(usuario.email)
                    $("#inf-cad-user-certificado").html(usuario.nome_certificado)
                    $("#inf-cad-user-cpf").html(usuario.cpf)
                    $("#inf-cad-user-usuario").html(usuario.username)

                } else {

                    var mensagem = "<p style='font-size:13px;'>Erro ao buscar informações de usuário.</p>";
                    $("#modal_aviso").html(USUARIO.modalAviso(mensagem))
                    $("#modal_aviso").modal("show")
                }
            },
            error: function (result) {
                
            }

        })
    }

    USUARIO.atualizarSenha = function (cod_usuario) {
        var usuario = new Object();
        usuario.id = cod_usuario;


        if (($("#passAtUsuarioCad1").val() == $("#passAtUsuarioCad2").val()) && $("#passAtUsuarioCad1").val() !== '' && $("#passAtUsuarioCad2").val() !== '') {

            usuario.password = $("#passAtUsuarioCad2").val()

            $.ajax({
                url: URL_SISTEMA.url+"/usuario/editar/cad",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function (result) {
                    $("#modal_aviso").html(USUARIO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()
                    USUARIO.carregar();
                },
                error: function (result) {
                    
                }
            })
        } else {

            var mensagem = "";

            if ($("#passAtUsuarioCad1").val() !== $("#passAtUsuarioCad2").val()) {
                mensagem = "A nova senha deve ser igual nos dois campos!";
            }
            if ($("#passAtUsuarioCad1").val() == '' && $("#passAtUsuarioCad2").val() == '') {
                mensagem = "Todos os campos precisam ser preenchidos!";
            }


            $("#modal_aviso").html(USUARIO.modalAviso(mensagem));
            $("#modal_aviso").modal("show");
        }
    }

    USUARIO.carregarStatus = function (cod_usuario) {

        var checked = "";

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/buscar/" + cod_usuario,
            method: "GET",
            success: function (result) {
                if (result.status == 0) {
                    checked = '';
                } else if (result.status == 1) {
                    checked = 'checked';
                }

                $("#modal_aviso").html(USUARIO.mocadlAtivarUsuario(cod_usuario, checked));
                $("#modal_aviso").modal("show");
            },
            error: function (result) {
                
            }
        })

    }

    USUARIO.atualizarStatus = function (cod_usuario) {

        var usuario = new Object();
        usuario.id = cod_usuario;

        if ($("#togBtn").is(":checked") == true) {
            usuario.status = 1;
        } else {
            usuario.status = 0;
        }

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/editar/status",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(usuario),
            success: function (result) {
                $("#modal_aviso").html(USUARIO.modalAviso(result));
                $("#modal_aviso").modal("show");
            },
            error: function (result) {
                
            }
        })
    }

    USUARIO.buscarUserSession = function () {
        $.ajax({
            url: URL_SISTEMA.url+'/usuario/session',
            method: 'GET',
            success: function (usuario) {

                var user = JSON.parse(usuario)

                USUARIO.buscarImagemUsuario(user.nome)
                $(".token-user").html(user.id)
                $(".nomeUsuario").html(user.nome)

            },
            error: function () {

            }
        })
    }

    USUARIO.buscarImagemUsuario = function (nomeUsuario) {

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/buscar/imagem/" + nomeUsuario,
            method: "GET",
            cache: false,
            xhr: function () {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 2) {
                        if (xhr.status == 200) {
                            xhr.responseType = "blob";
                        } else {
                            xhr.responseType = null;
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
                    window.navigator.msSaveBlob(blob, nomeMaterial);
                } else {
                    var url = window.URL || window.webkitURL;

                    link = url.createObjectURL(blob);

                    if (blob.size > 0) {
                        $(".user-img").html('<img id="imagem-usuario-logado" class="imagem-usuario-logado-sistema" src=' + link + ' alt="imagem de usuário logado">');
                    } else {
                        $(".user-img").html('<img id="imagem-usuario-logado" class="imagem-usuario-logado-sistema" src="'+URL_SISTEMA.url+'/imagens/botoes-logos/avatar-usuario.png" alt="imagem de usuário logado">');
                    }

                }

            }

        });

    }

    USUARIO.buscarUserSession();

    USUARIO.deletaUsuario = function (cod_usuario) {

        $.ajax({
            url: URL_SISTEMA.url+"/usuario/deletar/" + cod_usuario,
            method: "DELETE",
            contentType: "application/json",
            success: function (result) {
                //USUARIO.carregar();
                //$("#modal_aviso").html(USUARIO.modalAviso(result));
                //$("#modal_aviso").modal("show");
            },
            error: function (result) {
                
            }
        })
    }

    AULA.cadastrarImagemUsuario = function (id_usuario) {

        var confirme = true;
        var mensagem = "";

        var reg = /(.*?)\.(png|jpg|jpge)$/;

        var data = new FormData($("#form-imagem-user-logado")[0]);

        data.append("id", id_usuario)

        var imgarq = $("#imagem_usuario").val();

        var arquivo = $("#imagem_usuario").val();

        if (!arquivo.match(reg)) {
            mensagem = "Formato de arquivo é inválido, somente jpg, jpge, png.";
            confirme = false;
        }

        if (imgarq == '') {
            mensagem = "Inserir imagem no campo requerido!";
            confirme = false;
        }

        if (confirme) {

            data.append("imagemuser", arquivo)

            $.ajax({
                url: URL_SISTEMA.url+"/usuario/imagem/salvar",
                method: "POST",
                data: data,
                processData: false,
                contentType: false,
                enctype: "multipart/form-data",
                success: function (result) {
                    USUARIO.buscarUserSession();
                    USUARIO.limparImagemUserLogado();
                    $("#modal_aviso").html(USUARIO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    movimentarScroll(400, 100)

                },
                error: function () {
                    $("#modal_aviso").html(AULA.modalAviso("Erro ao salvar imagem de usuário."))
                    $("#modal_aviso").modal("show")

                }
            })
        } else {

            $("#modal_aviso").html(MODULO.modalAviso(mensagem))
            $("#modal_aviso").modal("show")

        }

    }

    USUARIO.modalAviso = function (mensagem) {
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

    USUARIO.exibirModalCadastrar = function () {
        $("#modal_aviso").html(USUARIO.modalCadastrar());
        $("#modal_aviso").modal("show");
    }

    USUARIO.exibirModalAtualizar = function (cod_usuario) {
        USUARIO.buscarPorID(cod_usuario)
        $("#modal_aviso").html(USUARIO.modalAtulizar(cod_usuario));
        $("#modal_aviso").modal("show");
    }

    USUARIO.exibirModalAtualizarSenha = function (cod_usuario) {

        $("#modal_aviso").html(USUARIO.modalAtulizarSenha(cod_usuario));
        $("#modal_aviso").modal("show");
    }

    USUARIO.exibirModalDeletaUsuario = function (cod_usuario) {
        $("#modal_aviso").html(USUARIO.modalDeletaUsuario(cod_usuario));
        $("#modal_aviso").modal("show");
    }

    USUARIO.exibirModalEditaUsuarioLogado = function (usuario) {

        $("#modal_aviso").html(USUARIO.modalEditaUsuarioLogado(usuario));
        $("#modal_aviso").modal("show");
    }

    USUARIO.exibirModalLiberarUsuarioParaCurso = function (cod_aluno) {

        $("#modal_aviso").html(USUARIO.mocadlAtivarUsuarioParaCurso(cod_aluno));
        
        $("#modal_aviso").modal("show");
    }

    USUARIO.modalCadastrar = function () {
        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">FINALIZAR</h5>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="mb-3">' +
            '<p style="font-size:15px;">Finalizar cadastramento de usuário?</p>' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.cadastrar()">CADASTRAR</button>' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.modalAtulizarSenha = function (cod_usuario) {
        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">ATUALIZAR SENHA USUÁRIO</h5>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Informações de usuário serão alteradas na base, o mesmo será notificado por e-mail.</p>' +
            '<div class="mb-3">' +
            '<input id="passAtUsuarioCad1" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="password" placeholder="Nova Senha:" aria-label=".form-control-lg example">' +
            '<input id="passAtUsuarioCad2" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="password" placeholder="Confirme nova Senha:" aria-label=".form-control-lg example">' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.atualizarSenha(' + cod_usuario + ')">FINALIZAR</button>' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.modalDeletaUsuario = function (cod_usuario) {
        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">DELETA USUÁRIO</h5>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Informações de usuário serão excluídas da bases.</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.deletaUsuario(' + cod_usuario + ')">FINALIZAR</button>' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.modalAtulizar = function (cod_usuario) {
        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">ATUALIZAR USUÁRIO</h5>' +
            '</div>' +
            '<div style="height:400px; overflow:auto;" class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Informações de usuário serão alteradas na base, o mesmo será notificado por e-mail.</p>' +
            '<div class="mb-3">' +
            '<input id="nomeAtUsuarioCad" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Nome Completo:" aria-label=".form-control-lg example">' +
            '<input id="emailAtUsuarioCad" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="E-mail:" aria-label=".form-control-lg example">' +
            '<input id="nomeAtCertificadoUsuarioCad" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Nome para Certificado:" aria-label=".form-control-lg example">' +
            '<input id="cpfAtUsuarioCad" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="CPF:" maxlength="11" aria-label=".form-control-lg example">' +
            '<input id="loginAtUsuarioCad" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Login:" aria-label=".form-control-lg example">' +
            '<div style="margin-top:7px;" id="permissao"></div>' +
            '<button style="margin-top:10px; width:100%;" id="atualizar_cliente" type="button" class="btn btn-primary" onclick="USUARIO.exibirModalAtualizarSenha(' + cod_usuario + ')">ALTERAR SENHA</button>' +
            '</div>' +
            '<hr>' +
            '<h5 style="color:white; margin-top:15px;">Permissão de Acesso:</h5>' +
            '<fieldset style="display:flex; color:white; padding:10px 10px; background-color:#041155; border-radius:5px;">' +
            '<div style="margin-right:20px;" class="form-check">' +
            '<input class="form-check-input" type="radio" name="inlineRadioUser" id="inlineRadioUser1">' +
            '<label style="font-weight:bold;" class="form-check-label" for="inlineRadioUser1">' +
            'ADMINISTRADOR' +
            '</label>' +
            '</div>' +
            '<div class="form-check">' +
            '<input class="form-check-input" type="radio" name="inlineRadioUser" id="inlineRadioUser2">' +
            '<label style="font-weight:bold;" class="form-check-label" for="inlineRadioUser2">' +
            'ESTUDANTE' +
            '</label>' +
            '</div>' +
            '</fieldset>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.atualizar(' + cod_usuario + ')">FINALIZAR</button>' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.modalEditaUsuarioLogado = function (usuario) {

        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">ATUALIZAR USUÁRIO</h5>' +
            '</div>' +
            '<div style="height:400px; overflow:auto;" class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Informações de usuário serão alteradas na base, o mesmo será notificado por e-mail.</p>' +
            '<div class="mb-3">' +
            '<form>' +
            '<input id="nomeAtUsuarioLogado" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Nome Completo:" aria-label=".form-control-lg example">' +
            '<input id="emailAtUsuarioLogado" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="E-mail:" aria-label=".form-control-lg example">' +
            '<input id="nomeAtCertificadoUsuarioLogado" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Nome para Certificado:" aria-label=".form-control-lg example">' +
            '<input id="cpfAtUsuarioLogado" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="CPF:" maxlength="11" aria-label=".form-control-lg example">' +
            '<input id="loginAtUsuarioLogado" class="input-cad-key-admin form-control form-control-lg" style="border:1px solid white;" type="text" placeholder="Login:" aria-label=".form-control-lg example">' +
            '<button style="margin-top:10px; width:100%;" id="atualizar_cliente" type="button" class="btn btn-primary" onclick="USUARIO.exibirModalAtualizarSenha(' + usuario.id + ')">ALTERAR MINHA SENHA</button>' +
            '</form>' +
            '<hr>' +
            '<form id="form-imagem-user-logado" enctype="multipart/form-data">' +
            '<p>INSERIR SUA IMAGEM</p>' +
            '<input style="border:1px solid #ffffff47;" name="imagemuser" id="imagem_usuario" class="materiais_aula materiais_aula_index form-input-entrada-curso form-control form-control-lg" id="formFileLg" type="file" style="margin-bottom: 10px;">' +
            '<div style="margin-top:10px; display:flex; justify-content:center;">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="AULA.cadastrarImagemUsuario(' + usuario.id + ')">UPLOAD</button>' +
            '<button type="button" class="btn btn-danger" onclick="USUARIO.limparImagemUserLogado()">LIMPAR</button>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="USUARIO.atualizarUsuarioLogado(' + usuario.id + ')">FINALIZAR</button>' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.mocadlAtivarUsuario = function name(cod_usuario, checked) {
        var modal = '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">STATUS USUÁRIO</h5>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Usuário desativado não poderá mais assistir aos cursos disponíveis.</p>' +
            '<br>' +
            '<div class="mb-3">' +
            '<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status do Usuário:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="USUARIO.atualizarStatus(' + cod_usuario + ')" ' + checked + '><div class="slider round"></div></label></div>' +
            '</div>' +
            '<hr>' +
            '<p>ALTERAR CADASTRO</p>' +
            '<div style="display:flex;">' +
            '<button type="button" class="btn-acoes-usuario btn btn-success" onclick="USUARIO.exibirModalAtualizar(' + cod_usuario + ')">EDITAR</button>' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.mocadlAtivarUsuarioParaCurso = function name(cod_aluno) {
        //
        var modal = '<script>CURSO.carregarCursosParaLiberarAoUsuario('+cod_aluno+')</script><div class="modal-dialog">' +
            '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">LIBERAR CURSO</h5>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p style="font-size:15px;">ATENÇÃO: Curso ativado ficará disponível a usuário selecionado.</p>' +
            '<br>' +
            //'<div class="mb-3">' +
            //'<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status do Usuário:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="USUARIO.atualizarStatus(' + "cod_usuario" + ')" ' + "checked" + '><div class="slider round"></div></label></div>' +
            //'</div>' +
            //'<hr>' +
            '<p>BUSCAR CURSO</p>' +

            '<input id="nomeCursoUsuarioLiberado" class="input-cad-key-admin form-control form-control-lg" type="text" placeholder="Informe Título:" aria-label=".form-control-lg example" style="border:1px solid white;" onkeyup="CURSO.buscarPorFragmentoParaLiberarAoUsuario('+cod_aluno+')">' +
            '<div style="height: 230px; overflow: auto; margin-top: 10px;">' +
            '<table style="color: white; background-image: linear-gradient(to right, #030c3a, #041157); font-size: 12px;" class="table">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">Título</th>' +
            '<th scope="col">Status</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="tabelaCursosLiberados">' +

            '</tbody>' +
            '</table>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
            '</div>' +
            '</div>' +
            '</div>"'
        return modal;
    }

    USUARIO.limparImagemUserLogado = function () {
        $('#form-imagem-user-logado')[0].reset();
    }

    USUARIO.limparImagemUserLogado = function () {
        $('#form-imagem-user-logado')[0].reset();
    }

})