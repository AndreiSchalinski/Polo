var CURSO = new Object();

$(document).ready(function () {
    
    CURSO.carregar = function () {
        $.ajax({
            url:URL_SISTEMA.url+"/curso/carregar",
            method:"GET",
            success:function (result) {

                var lista = '';

                if (result == true) {
                    lista = "<h4 style='border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Ainda não tem cursos cadastrados na plataforma.</h4>";
                } else {
                    for (let i = 0; i < result.length; i++) {
                        lista += "<tr><td>"+result[i].tituloCurso+"</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='CURSO.carregarStatus("+result[i].id+")'>AÇÕES</button></td></tr>";
                    }
                }
                $("#tabelaCursos").html(lista);
            },
            error:function (result) {
                
            }
        })
    }

    var lista = "";
    

    CURSO.carregarCursosParaLiberarAoUsuario = function (cod_aluno) {
        
        $.ajax({
            url:URL_SISTEMA.url+"/curso/liberar/carregar",
            method:"GET",
            success:function (result) {
                
                if (result == true) {
                    lista = "<p style='font-size:17px; border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Veridicar se existem cursos cadastrados ou que precisam ser ativados.</p>";
                    $("#tabelaCursosLiberados").html(lista)
                } else {

                    for (let i = 0; i < result.length; i++) {
                        
                        CURSO.carregarStatusCursoLiberado(cod_aluno,result[i].id,result[i].tituloCurso)
                        
                    } 
                    
                }
                
            },
            error:function (result) {
                
            }
        })

        
    }

    USUARIO.liberarAcesso = function (cod_usuario,cod_curso) {
        //método está ok
        var status = -1;

        if ($(".curso-"+cod_curso).is(":checked") == true) {
            status = 1;
        } else {
            status = 0;
        }

        $.ajax({
            url:URL_SISTEMA.url+"/permissao/curso/liberado/salvar/"+cod_curso+"/"+cod_usuario+"/"+status,
            method:"POST",
            success:function (result) {
                $("#modal_aviso").html(CURSO.modalAviso(result))
                $("#modal_aviso").modal("show")
            },
            error:function () {
                
            }
        })
    }

    var checked2 = "";

    CURSO.carregarStatusCursoLiberado = function (cod_usuario,cod_curso,nome,confirm) {
        //função está ok
        $.ajax({
            url:URL_SISTEMA.url+"/permissao/curso/liberado/buscar/"+cod_usuario+"/"+cod_curso,
            method:"GET",
            success:function (result) {

                if (result.liberado == 0 || result.liberado == undefined) {
                    checked2 = ""
                    
                } else if(result.liberado == 1 && result.liberado !== undefined) {
                    checked2 = "checked"
                    
                }
                
                $("#tabelaCursosLiberados").append("<tr><td>"+nome+"</td><td><div style='display:flex; justifycontent:center;'><label style='margin-left:10px;' class='switch'><input id='check-curso-liberado' class='curso-"+cod_curso+"' type='checkbox' onclick='USUARIO.liberarAcesso(" + cod_usuario + ","+cod_curso+")' "+checked2+"><div class='slider round'></div></label></div></td></tr>")
                
            },
            error:function (result) {
                
            }
        
        })
        
    }

    CURSO.carregarCategoria = function () {
        $.ajax({
            url:URL_SISTEMA.url+"/categoria/carregar",
            method:"GET",
            success:function (result) {

                var lista = '';

                if (result == true) {
                    lista = "<option value='null'>Ainda não tem categorias cadastradas na plataforma.</option>";
                } else {

                    lista += '<option value="null" selected>SELECIONE UMA CATEGORIA</option>';

                    for (let i = 0; i < result.length; i++) {
                
                        lista += '<option value="'+result[i].id+'">'+result[i].nome+"</option>";
                    }
                }
                $("#lista-categoria-novo-curso").html(lista);
            },
            error:function (result) {
                
            }
        })
    }

    CURSO.cadastrar = function () {

        var curso = new Object();

        curso.tituloCurso = $("#input-titulo-trabalho").val()
        curso.resultadoAprendizado = $("#input-resultadoAprendizado").val()
        curso.preRequisito = $("#input-preRequisito").val()
        curso.destinatario = $("#input-destinatario").val()
        curso.titulo = $("#input-titulo").val()
        curso.subTitulo = $("#input-subTitulo").val()
        curso.descricao = $("#input-descricao").val()
        curso.conteudoAAprender = $("#input-conteudoAAprender").val()
        curso.cargaHoraria = $("#input-carga-horaria").val()
        curso.preco = $("#input-preco").val()
        curso.categoria = $("#lista-categoria-novo-curso option:selected").val();
        curso.status = 1;
        imagem_capa_curso = $("#formFileLg").val()
        imagem_abertura_curso = $("#imagemAberturaCurso").val()

        var validArquivo = false;

        var reg = /(.*?)\.(jpg|jpeg|png)$/;
        if(!imagem_capa_curso.match(reg) || !imagem_abertura_curso.match(reg) || (!imagem_capa_curso.match(reg) && !imagem_abertura_curso.match(reg))){
    	   validArquivo = true
        }

        if (validArquivo !== true && curso.cargaHoraria !== '' && curso.preco !== '' && curso.tituloCurso !== '' && curso.resultadoAprendizado !== '' && curso.preRequisito !== '' && curso.destinatario !== '' && curso.titulo !== '' && curso.subTitulo !== '' && curso.descricao !== '' && curso.conteudoAAprender !== '' && curso.categoria !== 'null') {
            
            var  data  =  new  FormData ( $ ( "#form-cad-novo-curso" ) [ 0 ] ) ;

            data.append("imagem_abertura_curso", imagem_abertura_curso)
            data.append("imagem_capa_curso", imagem_capa_curso)
            data.append("tituloCurso", curso.tituloCurso)
            data.append("resultadoAprendizado", curso.resultadoAprendizado)
            data.append("preRequisito", curso.preRequisito)
            data.append("destinatario", curso.destinatario)
            data.append("titulo", curso.titulo)
            data.append("subTitulo", curso.subTitulo)
            data.append("descricao", curso.descricao)
            data.append("conteudoAAprender", curso.conteudoAAprender)
            data.append("cargaHoraria", curso.cargaHoraria)
            data.append("preco", curso.preco)
            data.append("categoria", curso.categoria)
            data.append("status", 1)

            $.ajax({
                url:URL_SISTEMA.url+"/curso/salvar",
                method:"POST",
                data:data,
                processData : false ,
                contentType : false ,
                success:function (result) {
                    $('#form-cad-novo-curso')[0].reset();
                    $("#modal_aviso").html(CURSO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    
                },
                error:function (result) {
                    
                }
            })
        } else {

            var mensagem = "Preencher todos os campos para finalizar cadastro!";

            if (curso.categoria == 'null') {
                mensagem = "Escolher uma categoria para o seu curso!"
            }

            if (validArquivo) {
                mensagem = "Tipo de arquivo inserido é inválido, somente imagens são permitidas!"
            }
            
            $("#modal_aviso").html(CURSO.modalAviso(mensagem))
            $("#modal_aviso").modal("show")
        }

    }

    CURSO.buscarPorFragmento = function () {
    
        var titulo = $('#buscaNomeCurso').val()

        if (INPUT.validaEspacoEmBranco(titulo) !== true) {
            if (titulo == '') {
                CURSO.carregar();
            } else {
                $.ajax({
                    url:URL_SISTEMA.url+"/curso/coletar/"+titulo,
                    method:"GET",
                    success:function (result) {
                        var lista = '';
                        if (result.length == 0) {
                            lista = "<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>";
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                lista += "<tr><td>"+result[i].tituloCurso+"</td><td><button type='button' class='btn-acoes-usuario btn btn-primary' onclick='CURSO.carregarStatus("+result[i].id+")'>AÇÕES</button></td></tr>";
                            }
                        }
                        $("#tabelaCursos").html(lista);
                    },
                    error:function (result) {
                        
                    }
        
                })
            }
        } else {
            $("#tabelaCursos").html("<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>");
        }
      
    }

    CURSO.buscarPorFragmentoParaLiberarAoUsuario = function (cod_usuario) {

        var titulo = $('#nomeCursoUsuarioLiberado').val()

        if (INPUT.validaEspacoEmBranco(titulo) !== true) {
            if (titulo == '') {
                $("#tabelaCursosLiberados").html("")
                CURSO.carregarCursosParaLiberarAoUsuario(cod_usuario);
            } else {
                $.ajax({
                    url:URL_SISTEMA.url+"/curso/liberado/coletar/"+titulo,
                    method:"GET",
                    success:function (result) {
                        
                        if (result.length == 0) {
                            lista = "<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>";
                            $("#tabelaCursosLiberados").html(lista)
                        } else {

                            $("#tabelaCursosLiberados").html("")

                            if (result == true) {
                                lista = "<p style='font-size:17px; border-radius:5px; padding:10px 10px; margin:10px 0 10px 10px;'>Veridicar se existem cursos cadastrados ou que precisam ser ativados.</p>";
                                $("#tabelaCursosLiberados").html(lista) 
                            } else {
                                var confirm = false
                            
                                for (let i = 0; i < result.length; i++) {
    
                                    if ((i+1) == result.length) {
                                        confirm = true
                                    }
                                    
                                    CURSO.carregarStatusCursoLiberado(cod_usuario,result[i].id,result[i].tituloCurso,confirm)
                                } 
                            }

                            
                        }
                        
                        
                    },
                    error:function (result) {
                        
                    }
        
                })
            }
        } else {
            $("#tabelaCursosLiberados").html("<h4 id='usu-nao-enc' style='border-radius:5px; background-color:red; padding:10px 10px; margin:10px 0 10px 10px;'>Registro não encontrado!</h4>");
        }
    }

    CURSO.buscarPorID = function (cod_curso) {
        $.ajax({
            url:URL_SISTEMA.url+"/curso/buscar/"+cod_curso,
            method:"GET",
            success:function (curso) {
                
                if (curso !== null) {
                    $("#input-atualiza-titulo-trabalho").val(curso.tituloCurso ) 
                    $("#input-atualiza-resultadoAprendizado").val(curso.resultadoAprendizado ) 
                    $("#input-atualiza-preRequisito").val(curso.preRequisito ) 
                    $("#input-atualiza-destinatario").val(curso.destinatario ) 
                    $("#input-atualiza-titulo").val(curso.titulo) 
                    $("#input-atualiza-subTitulo").val(curso.subTitulo ) 
                    $("#input-atualiza-descricao").val(curso.descricao ) 
                    $("#input-atualiza-conteudoAAprender").val(curso.conteudoAAprender )
                    $("#input-atualiza-carga-horaria").val(curso.cargaHoraria )
                    $("#input-atualiza-preco").val(curso.preco ) 
                } else {
                    var mensagem = "<p style='font-size:13px;'>Cadastro não encontrado para atualizar!</p>";
                    $("#modal_aviso").html(CURSO.modalAviso(mensagem))
                    $("#modal_aviso").modal("show")
                }
            },
            error:function (result) {
               
            }
        })
    }

    
    CURSO.atualizar = function (cod_curso) {
        var curso = new Object();
        curso.id = cod_curso;
        curso.tituloCurso = $("#input-atualiza-titulo-trabalho").val();
        curso.resultadoAprendizado = $("#input-atualiza-resultadoAprendizado").val();
        curso.preRequisito = $("#input-atualiza-preRequisito").val();
        curso.destinatario = $("#input-atualiza-destinatario").val();
        curso.titulo = $("#input-atualiza-titulo").val();
        curso.subTitulo = $("#input-atualiza-subTitulo").val();
        curso.descricao = $("#input-atualiza-descricao").val();
        curso.conteudoAAprender = $("#input-atualiza-conteudoAAprender").val();
        curso.cargaHoraria = $("#input-atualiza-carga-horaria").val();
        curso.preco = $("#input-atualiza-preco").val();

        if (curso.cargaHoraria !== '' && curso.preco !== '' && curso.tituloCurso !== '' && curso.resultadoAprendizado !== '' && curso.preRequisito !== '' && curso.destinatario !== '' && curso.titulo !== '' && curso.subTitulo !== '' && curso.descricao !== '' && curso.conteudoAAprender !== '') {
            $.ajax({
                url:URL_SISTEMA.url+"/curso/editar",
                method:"PUT",
                contentType:"application/json",
                data:JSON.stringify(curso),
                success:function (result) {
                    $("#modal_aviso").html(CURSO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    $(".form-cad-user").hide()
                    CURSO.carregar();  
                },
                error:function (result) {
                    
                }
            })
        } else {
            var mensagem = "<p style='font-size:13px;'>Todos os campos precisam ser preenchidos!</p>";
            $("#modal_aviso").html(CURSO.modalAviso(mensagem));
            $("#modal_aviso").modal("show");
        }
    }

    CURSO.carregarStatus = function (cod_curso) {

        var checked = "";

        $.ajax({
            url:URL_SISTEMA.url+"/curso/buscar/"+cod_curso,
            method:"GET",
            success:function (result) {
                if (result.status == 0) {
                    checked = '';
                } else if(result.status == 1) {
                    checked = 'checked';
                }
                
                $("#modal_aviso").html(CURSO.alterarCadastro(cod_curso,checked));
                $("#modal_aviso").modal("show");
            },
            error:function (result) {
                
            }
        })

    }

    CURSO.atualizarStatus = function (cod_curso) {

        var curso = new Object();
        curso.id = cod_curso;

        if ($("#togBtn").is(":checked") == true) {
            curso.status = 1;
        } else {
            curso.status = 0;
        }

        $.ajax({
            url:URL_SISTEMA.url+"/curso/editar/status",
            method:"PUT",
            contentType:"application/json",
            data:JSON.stringify(curso),
            success:function (result) {
                $("#modal_aviso").html(CURSO.modalAviso(result));
                $("#modal_aviso").modal("show"); 
            },
            error:function (result) {
                 
            }
        })
    }

    CURSO.deletaCurso = function (cod_curso) {

        $.ajax({
            url:URL_SISTEMA.url+"/curso/deletar/"+cod_curso,
            method:"DELETE",
            contentType:"application/json",
            success:function (result) {
                CURSO.carregar();
                $("#modal_aviso").html(CURSO.modalAviso(result));
                $("#modal_aviso").modal("show"); 
            },
            error:function (result) {
                 
            }
        })
    }

    CURSO.exibirModalCadastrar = function () {
        $("#modal_aviso").html(CURSO.modalCadastrar());
        $("#modal_aviso").modal("show");
    }

    CURSO.exibirModalAtualizar = function (cod_curso) {
        $("#modal_aviso").html(CURSO.modalAtulizar(cod_curso));
        CURSO.buscarPorID(cod_curso);
        $("#modal_aviso").modal("show");
    }

    CURSO.exibirModalDeletar = function (cod_curso) {
        $("#modal_aviso").html(CURSO.modalDeletar(cod_curso));
        $("#modal_aviso").modal("show");
    }

    CURSO.modalDeletar = function (cod_curso) {
        var modal = '<div class="modal-dialog">'+
        '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
          '<div class="modal-header">'+
            '<h5 class="modal-title">EXLUIR CURSO</h5>'+
          '</div>'+
          '<div class="modal-body">'+
            '<div class="mb-3">'+
                '<p style="font-size:15px;">Excluir curso da platadorma?</p>'+
            '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CURSO.deletaCurso('+cod_curso+')">FINALIZAR</button>'+
          '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>'+
          '</div>'+
        '</div>'+
      '</div>"'
      return modal;
    }

    CURSO.modalCadastrar = function () {
        var modal = '<div class="modal-dialog">'+
        '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
          '<div class="modal-header">'+
            '<h5 class="modal-title">FINALIZAR</h5>'+
          '</div>'+
          '<div class="modal-body">'+
            '<div class="mb-3">'+
                '<p style="font-size:15px;">Finalizar cadastramento de curso?</p>'+
            '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CURSO.cadastrar()">CADASTRAR</button>'+
          '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>'+
          '</div>'+
        '</div>'+
      '</div>"'
      return modal;
    }

    CURSO.modalAviso = function (mensagem) {
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

    CURSO.modalAtulizar = function (cod_curso) {
        var modal = '<div class="modal-dialog">'+
        '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
          '<div class="modal-header">'+
            '<h5 class="modal-title">ATUALIZAR</h5>'+
          '</div>'+
          '<div class="modal-body">'+
          '<p style="font-size:15px;">ATENÇÃO: Informações de curso serão alteradas na base.</p>'+
            '<div style="height:315px; overflow:auto; border-radius:5px; padding:20px 13px;" class="mb-3">'+
            '<input style="border:1px solid white;" id="input-atualiza-titulo-trabalho" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Título de Trabalho: ex (aprenda a programar do zero)" maxlength="30" aria-label=".form-control-lg example">' +
            '<input style="border:1px solid white;" id="input-atualiza-resultadoAprendizado" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Do que será capaz: ex (Definir funções ao gerente de empresa)" aria-label=".form-control-lg example">' +
            '<input style="border:1px solid white;" id="input-atualiza-preRequisito" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Pré - requisitos: ex (Saber conceitos básicos de administração de empresas)" aria-label=".form-control-lg example">' +
            '<input style="border:1px solid white;" id="input-atualiza-destinatario" class="input-novo-curso form-control form-control-lg" type="text" placeholder="Indicações: ex (Esse curso se destina para quem deseja ser técnico em administração)" aria-label=".form-control-lg example">' +
            '<input style="border:1px solid white;" id="input-atualiza-titulo" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Título do Curso:" aria-label=".form-control-lg example">' +
            '<input style="border:1px solid white;" id="input-atualiza-subTitulo" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Subtítulo do Curso:" aria-label=".form-control-lg example">' +
            '<textarea style="height: 200px; resize: none;border:1px solid white;" id="input-atualiza-descricao" class="input-inf-curso form-control" placeholder="Descrição do Seu Curso:" id="floatingTextarea2"></textarea>' +
            '<input style="border:1px solid white;" id="input-atualiza-conteudoAAprender" class="input-inf-curso form-control form-control-lg" type="text" placeholder="O que aprenderá essencialmente:" aria-label=".form-control-lg example" style="margin-top: -5px;">' +
            '<input style="border:1px solid white;" id="input-atualiza-carga-horaria" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Carga Horária: ex 5.23" aria-label=".form-control-lg example" style="margin-top: -5px;">' +
            '<input style="border:1px solid white;" id="input-atualiza-preco" class="input-inf-curso form-control form-control-lg" type="text" placeholder="Preço: ex 23.32" aria-label=".form-control-lg example" style="margin-top: -5px;">' +
            '<hr>'+
            '<form enctype:"multipart/form-data" id="form-edita-imagens-capa-curso">'+
            '<p>EDITAR IMAGEM CAPA</p>'+
            '<p style="font-weight: unset; color:yellow; margin:0;">ATENÇÃO: Dimencionamento de imagem deve ser 425 largura x 294 altura.</p>'+
            '<input style="border:1px solid white;" name="imagem_capa_curso" class="form-input-entrada-curso form-control form-control-lg" id="form-image-capa" type="file" style="margin-bottom: 10px;">' +
            '<div style="display:flex; justify-content:center; margin-top:10px;">' +
               '<button style="margin-right:5px;" type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="CURSO.atualizarImagensCapaCurso('+cod_curso+')">UPLOAD</button>' +
               '<button type="button" class="btn btn-danger">LIMPAR</button>' +
            '</div>' +
            '</form>'+
            '<hr>'+
            '<form enctype:"multipart/form-data" id="form-edita-imagens-abertura-curso">'+
            '<p>EDITAR IMAGEM ABERTURA</p>'+
            '<p style="font-weight: unset; color:yellow; margin:0;">ATENÇÃO: Dimencionamento de imagem deve ser 314 largura x 210 altura.</p>'+
            '<input style="border:1px solid white;" name="imagem_abertura_curso" class="form-input-entrada-curso form-control form-control-lg" id="form-image-abertura" type="file" style="margin-bottom: 10px;">' +
            '<div style="display:flex; justify-content:center; margin-top:10px;">' +
               '<button style="margin-right:5px;" type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="CURSO.atualizarImagensAberturaCurso('+cod_curso+')">UPLOAD</button>' +
               '<button type="button" class="btn btn-danger">LIMPAR</button>' +
               '</div>' +
            '</form>'+
            '</div>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button id="atualizar_cliente" type="button" class="btn btn-success" style="margin-right: 10px;" onclick="CURSO.atualizar('+cod_curso+')">FINALIZAR</button>'+
          '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>'+
          '</div>'+
        '</div>'+
      '</div>"'
      return modal;
    }

    CURSO.atualizarImagensAberturaCurso = function (cod_curso) {

       var imagem = $("#form-image-abertura").val()
        

        var validArquivo = false;

        var reg = /(.*?)\.(jpg|jpeg|png)$/;
        if(!imagem.match(reg)){
    	   validArquivo = true
        }

        if (validArquivo !== true) {
            
            var  data  =  new  FormData ( $ ( "#form-edita-imagens-abertura-curso" ) [ 0 ] ) ;

            data.append("id",cod_curso);
            data.append("imagem_abertura_curso", imagem)
            
            $.ajax({
                url:"/curso/atualizar/imagem/abertura/curso",
                method:"POST",
                data:data,
                processData : false ,
                contentType : false ,
                success:function (result) {
                    $('#form-edita-imagens-abertura-curso')[0].reset();
                    $("#modal_aviso").html(CURSO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    
                },
                error:function (result) {
                   
                }
            })
        } else {

            var mensagem = "Preencher todos os campos para finalizar cadastro!";

            if (validArquivo) {
                mensagem = "Tipo de arquivo inserido é inválido, somente jpg, jpeg, png."
            }
            
            $("#modal_aviso").html(CURSO.modalAviso(mensagem))
            $("#modal_aviso").modal("show")
        }

    }

    CURSO.atualizarImagensCapaCurso = function (cod_curso) {

        var imagem = $("#form-image-capa").val()
        

        var validArquivo = false;

        var reg = /(.*?)\.(jpg|jpeg|png)$/;
        if(!imagem.match(reg)){
    	   validArquivo = true
        }

        if (validArquivo !== true) {
            
            var  data  =  new  FormData ( $ ( "#form-edita-imagens-capa-curso" ) [ 0 ] ) ;

            data.append("id",cod_curso);
            data.append("imagem_capa_curso", imagem)
            

            $.ajax({
                url:"/curso/atualizar/imagens/capa/curso",
                method:"POST",
                data:data,
                processData : false ,
                contentType : false ,
                success:function (result) {
                    $('#form-edita-imagens-capa-curso')[0].reset();
                    $("#modal_aviso").html(CURSO.modalAviso(result))
                    $("#modal_aviso").modal("show")
                    
                },
                error:function (result) {
                    
                }
            })
        } else {

            var mensagem = "Preencher todos os campos para finalizar cadastro!";

            if (validArquivo) {
                mensagem = "Tipo de arquivo inserido é inválido, somente jpg, jpeg, png."
            }
            
            $("#modal_aviso").html(CURSO.modalAviso(mensagem))
            $("#modal_aviso").modal("show")
        }

    }

    CURSO.alterarCadastro = function name(cod_curso, checked) {
        var modal = '<div class="modal-dialog">'+
        '<div class="modal-content" style="background-color: #041155eb; color:white; font-weight:bold; font-size:18px;">'+
          '<div class="modal-header">'+
            '<h5 class="modal-title">STATUS CURSO</h5>'+
          '</div>'+
          '<div class="modal-body">'+
          '<p style="font-size:15px;">ATENÇÃO: Curso desativado não poderá mais ser distribuido aos usuários.</p>'+
          '<br>'+  
          '<div class="mb-3">'+
          '<br><div style="display:flex; justifycontent:center;"><div style="font-size:13px;">Status do Curso:</div><label style="margin-left:10px;" class="switch"><input type="checkbox" id="togBtn" onclick="CURSO.atualizarStatus('+cod_curso+')" '+checked+'><div class="slider round"></div></label></div>'+
           '</div>'+
          '</div>'+
          '<div style="border-top:1px solid white;" class="modal-body">'+
          '<p style="font-size:15px;">OPÇÕES DE CADASTRO:</p>'+
          '<button type="button" class="btn-acoes-usuario btn btn-primary" onclick="CURSO.exibirModalAtualizar('+cod_curso+')">EDITAR</button>'+
          //'<button type="button" class="btn-acoes-usuario btn btn-danger" onclick="CURSO.exibirModalDeletar('+cod_curso+')">EXCLUIR</button>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>'+
          '</div>'+
        '</div>'+
      '</div>"'
      return modal;
    }

})
