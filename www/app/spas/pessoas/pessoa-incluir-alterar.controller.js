angular.module("hackaton-stefanini").controller("PessoaIncluirAlterarController", PessoaIncluirAlterarController);
PessoaIncluirAlterarController.$inject = [
    "$rootScope",
    "$scope",
    "$location",
    "$q",
    "$filter",
    "$routeParams",
    "HackatonStefaniniService"];

function PessoaIncluirAlterarController(
    $rootScope,
    $scope,
    $location,
    $q,
    $filter,
    $routeParams,
    HackatonStefaniniService) {

    /**ATRIBUTOS DA TELA */
    vm = this;

    vm.pessoa = {
        id: null,
        imagem: "",
        nome: "",
        email: "",
        dataNascimento: null,
        enderecos: [],
        perfils: [],
        situacao: false
    };
    vm.enderecoDefault = {
        id: null,
        idPessoa: null,
        cep: "",
        uf: "",
        localidade: "",
        bairro: "",
        logradouro: "",
        complemento: ""
    };

    vm.urlEndereco = "http://localhost:8080/treinamento/api/enderecos/";
    vm.urlPerfil = "http://localhost:8080/treinamento/api/perfils/";
    vm.urlPessoa = "http://localhost:8080/treinamento/api/pessoas/";
    vm.urlObterEnderecoPorCep = "http://localhost:8080/treinamento/api/cep/"

    vm.obterEnderecoPorCep = function () {
        HackatonStefaniniService.listar(vm.urlObterEnderecoPorCep + vm.enderecoDefault.cep).then(
            function (response) {

                vm.enderecoDefault.uf = response.data.uf;
                vm.enderecoDefault.localidade = response.data.localidade;
                vm.enderecoDefault.bairro = response.data.bairro;
                vm.enderecoDefault.logradouro = response.data.logradouro;
            }
        )
    }

    /**METODOS DE INICIALIZACAO */
    vm.init = function () {
        vm.tituloTela = "Cadastrar Pessoa";
        vm.acao = "Cadastrar";
        vm.idPessoa = $routeParams.idPessoa;

        /**Recuperar a lista de perfil */
        vm.listar(vm.urlPerfil).then(
            function (response) {
                if (response !== undefined) {
                    vm.listaPerfil = response;
                    if (idPessoa) {
                        vm.tituloTela = "Editar Pessoa";
                        vm.acao = "Editar";
                        vm.recuperarObjetoPorIDURL(idPessoa, vm.urlPessoa).then(
                            function (pessoaRetorno) {
                                if (pessoaRetorno !== undefined) {
                                    vm.pessoa = pessoaRetorno;
                                    vm.pessoa.dataNascimento = vm.formataDataTela(pessoaRetorno.dataNascimento);
                                    vm.perfil = vm.pessoa.perfils;
                                }
                            }
                        );
                    }
                }
            }
        );
    };

    /**METODOS DE TELA */
    vm.cancelar = function () {
        vm.retornarTelaListagem();
    };

    vm.retornarTelaListagem = function () {
        $location.path("listarPessoas");
    };

    vm.abrirModal = function (endereco) {
        vm.tituloTela = "Cadastrar Endereço";
        vm.enderecoModal = vm.enderecoDefault;
        if (endereco !== undefined)
            vm.enderecoModal = endereco;

        if (vm.pessoa.enderecos.length === 0)
            vm.pessoa.enderecos.push(vm.enderecoModal);

        $("#modalEndereco").modal();
    };

    vm.limparTela = function () {
        $("#modalEndereco").modal("toggle");
        vm.endereco = undefined;
    };

    vm.incluir = function () {

        vm.pessoa.imagem = document.getElementById("imagemPessoa").getAttribute("src");

        document.getElementById("imagemPessoa").src = vm.pessoa.imagem;

        var objetoDados = angular.copy(vm.pessoa, vm.endereco);
        objetoDados.dataNascimento = vm.formataDataJava(vm.pessoa.dataNascimento);

        console.log(objetoDados.dataNascimento);
        var listaEndereco = [];

        angular.forEach(objetoDados.enderecos, function (value, key) {
            if (value.complemento.length > 0) {
                value.idPessoa = objetoDados.id;
                listaEndereco.push(angular.copy(value));
            }
        });
        objetoDados.enderecos = listaEndereco;


        if (vm.perfil !== null) {

            var isNovoPerfil = true;

            angular.forEach(objetoDados.perfils, function (value, key) {
                if (value.id === vm.perfil.id) {
                    isNovoPerfil = false;
                }
            });
            if (isNovoPerfil)
                objetoDados.perfils = vm.perfil;
        }
        if (vm.acao == "Cadastrar") {

            vm.salvar(vm.urlPessoa, objetoDados).then(
                function (pessoaRetorno) {
                    vm.retornarTelaListagem();
                });

        } else if (vm.acao == "Editar") {
            vm.alterar(vm.urlPessoa, objetoDados).then(
                function (pessoaRetorno) {
                    vm.retornarTelaListagem();
                });

        }

        document.getElementById("imagemPessoa").src = '';
    };

    vm.remover = function (objeto, tipo) {
        var url = vm.urlPessoa + objeto.id;
        if (tipo === "ENDERECO")
            url = vm.urlEndereco + objeto.id;

        vm.excluir(url).then(
            function (ojetoRetorno) {
                vm.retornarTelaListagem();
            });
    };

    /**METODOS DE SERVICO */
    vm.recuperarObjetoPorIDURL = function (id, url) {
        var deferred = $q.defer();
        HackatonStefaniniService.listarId(url + id).then(
            function (response) {
                if (response.data !== undefined)
                    deferred.resolve(response.data);
                else
                    deferred.resolve(vm.enderecoDefault);
            }
        );
        return deferred.promise;
    };

    vm.listar = function (url) {

        var deferred = $q.defer();
        HackatonStefaniniService.listar(url).then(
            function (response) {
                if (response.data !== undefined) {
                    deferred.resolve(response.data);
                }
            }
        );
        return deferred.promise;
    }

    vm.salvar = function (url, objeto) {
        var deferred = $q.defer();
        var obj = JSON.stringify(objeto);
        HackatonStefaniniService.incluir(url, obj).then(
            function (response) {
                if (response.status == 200) {
                    deferred.resolve(response.data);
                }
            }
        );
        return deferred.promise;
    }

    vm.alterar = function (url, objeto) {

        var deferred = $q.defer();
        var obj = JSON.stringify(objeto);
        HackatonStefaniniService.alterar(url, obj).then(
            function (response) {
                if (response.status == 200) {
                    deferred.resolve(response.data);
                }
            }
        );
        return deferred.promise;
    }

    vm.excluir = function (url, objeto) {

        var deferred = $q.defer();
        HackatonStefaniniService.excluir(url).then(
            function (response) {
                if (response.status == 200) {
                    deferred.resolve(response.data);
                }
            }
        );
        return deferred.promise;
    }

    // Método da imagem
    vm.visualizarImg = function () {
        var preview = document.querySelectorAll('img').item(0);
        var file = document.querySelector('input[type=file').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result; // Carrega a imagem em base64
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    /**METODOS AUXILIARES */
    vm.formataDataJava = function (data) {
        var dia = data.slice(0, 2);
        var mes = data.slice(2, 4);//3, 5
        var ano = data.slice(4, 8);//4, 8

        return ano + "-" + mes + "-" + dia;
    };

    vm.formataDataTela = function (data) {
        var ano = data.slice(0, 4);
        var mes = data.slice(5, 7);
        var dia = data.slice(8, 10);

        return dia + mes + ano;
    };


    vm.listaUF = [
        { "id": "RO", "desc": "RO" },
        { "id": "AC", "desc": "AC" },
        { "id": "AM", "desc": "AM" },
        { "id": "RR", "desc": "RR" },
        { "id": "PA", "desc": "PA" },
        { "id": "AP", "desc": "AP" },
        { "id": "TO", "desc": "TO" },
        { "id": "MA", "desc": "MA" },
        { "id": "PI", "desc": "PI" },
        { "id": "CE", "desc": "CE" },
        { "id": "RN", "desc": "RN" },
        { "id": "PB", "desc": "PB" },
        { "id": "PE", "desc": "PE" },
        { "id": "AL", "desc": "AL" },
        { "id": "SE", "desc": "SE" },
        { "id": "BA", "desc": "BA" },
        { "id": "MG", "desc": "MG" },
        { "id": "ES", "desc": "ES" },
        { "id": "RJ", "desc": "RJ" },
        { "id": "SP", "desc": "SP" },
        { "id": "PR", "desc": "PR" },
        { "id": "SC", "desc": "SC" },
        { "id": "RS", "desc": "RS" },
        { "id": "MS", "desc": "MS" },
        { "id": "MT", "desc": "MT" },
        { "id": "GO", "desc": "GO" },
        { "id": "DF", "desc": "DF" }
    ];

}
