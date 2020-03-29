
describe('PessoaIncluirAlterarController', function () {

    var $rootScope, $location, HackatonStefaniniService, $controller, $httpBackend, $scope, $q;

    var pessoa = {
        id: null,
        nome: "JOAO",
        email: "joaom.dev@hotmail.com",
        dataNascimento: "25-08-1995",
        enderecos: [null],
        perfils: [null],
        situacao: true
    }
    var perfils = {
        id: 1,
        nome: "ADMIN",
        descricao: "PERFIL ADMINISTRADOR",
        dataHoraInclusao: "2020-03-09 23:25:53.482586",
        dataHoraAlteracao: ""
    }
    var enderecos = {
        id: 1,
        idPessoa: 1,
        cep: "12345678",
        uf: "GO",
        localidade: "Luziânia",
        bairro: "Mandu",
        logradouro: "Rua SRC",
        complemento: "Casa 2"
    }
    var obj = {
        id: 1,
        nome: "Farofa Temperada",
        email: "FT@hotmail.com",
        dataNascimento: "2018-12-05",
        enderecos: [
            {
                id: 1,
                idPessoa: 1,
                cep: "12345678",
                uf: "GO",
                localidade: "Luziânia",
                bairro: "Mandu",
                logradouro: "Rua SRC",
                complemento: "Casa 2"
            }
        ],
        perfils: [
            {
                id: 1,
                nome: "ADMIN",
                descricao: "PERFIL DE ADMINISTRADOR",
                dataHoraInclusao: "2020-03-09 23:25:53.482586",
                dataHoraAlteracao: ""
            }
        ],
        situacao: true,
        acao: ""
    }
    var error = {
        'id': undefined
    }

    var url = "http://localhost:8080/treinamento/api/pessoas/";
    var urlPerfil = "http://localhost:8080/treinamento/api/perfils/";
    var urlEndereco = "http://localhost:8080/treinamento/api/enderecos/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _HackatonStefaniniService_, _$httpBackend_, _$q_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PessoaIncluirAlterarController', { $scope: $scope });
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    beforeEach(function () {
        spyOn($controller, 'recuperarObjetoPorIDURL').and.callThrough();
        spyOn($controller, 'init').and.callThrough();
        spyOn($controller, 'incluir').and.callThrough();
        spyOn($controller, 'remover').and.callThrough();
        spyOn($controller, 'listar').and.callThrough();
        spyOn($controller, 'salvar').and.callThrough();
        spyOn($controller, 'alterar').and.callThrough();
        spyOn($controller, 'excluir').and.callThrough();
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Verifica se o serviço Pessoa Incluir Alterar Controller existe', function () {
        expect($controller).toBeDefined();
    });

    ////////////////////////////MÉTODO CANCELAR/////////////////////////////////////
    describe('Método Cancelar de pessoa', function () {

        it('Deve retornar a tela com uma lista de pessoas', function () {
            var retornoCancelar = $controller.cancelar();

            expect($location.url(retornoCancelar)).toEqual('/listarPessoas');
        });
    });

    ////////////////////////////MÉTODO INCLUIR///////////////////////////////////////
    

    ////////////////////////////MÉTODO-LISTAR///////////////////////////////////////
    describe('Método listar objetos', function () {

        it('Deve retornar uma lista de pessoas', function () {

            retorno = {};

            $httpBackend.whenGET(url).respond(200, $q.when(pessoa));

            expect($controller.listar).not.toHaveBeenCalled();
            expect(retorno).toEqual({});

            $controller.listar(url).then(function (response) {
                retorno = response;
            });

            $httpBackend.flush();

            expect($controller.listar).toHaveBeenCalledWith(url);
            expect(retorno.id).toBe(pessoa.id);
            expect(retorno.nome).toBe(pessoa.nome);
            expect(retorno.email).toBe(pessoa.email);
            expect(retorno.dataNascimento).toBe(pessoa.dataNascimento);
            expect(retorno.situacao).toBe(pessoa.situacao);
        });
    });

    ////////////////////////////MÉTODO-SALVAR///////////////////////////////////////
    describe('Método salvar objeto', function () {

        it('Deve salvar um objeto pessoa', function () {

            retorno = {};

            expect($controller.salvar).not.toHaveBeenCalled();
            expect(retorno).toEqual({});
            $httpBackend.whenPOST(url).respond(200, $q.when(pessoa));

            $controller.salvar(url, pessoa).then(function (response) {
                retorno = response;
            });

            $httpBackend.flush();

            expect($controller.salvar).toHaveBeenCalledWith(url, pessoa);
            expect(retorno.id).toBe(pessoa.id);
            expect(retorno.nome).toBe(pessoa.nome);
            expect(retorno.email).toBe(pessoa.email);
            expect(retorno.dataNascimento).toBe(pessoa.dataNascimento);
            expect(retorno.situacao).toBe(pessoa.situacao);
        });
    });

    ///////////////////////MÉTODO-ALTERAR///////////////////////////////////////////
    describe('Método Alterar objeto', function () {

        it('Deve alterar um objeto', function () {

            retorno = {};

            $httpBackend.whenPUT(url).respond(200, $q.when(pessoa));

            expect($controller.alterar).not.toHaveBeenCalled();
            expect(retorno).toEqual({});

            $controller.alterar(url, pessoa).then(function (response) {
                retorno = response;
            });

            $httpBackend.flush();

            expect($controller.alterar).toHaveBeenCalledWith(url, pessoa);
            expect(retorno.id).toBe(pessoa.id);
            expect(retorno.nome).toBe(pessoa.nome);
            expect(retorno.email).toBe(pessoa.email);
            expect(retorno.dataNascimento).toBe(pessoa.dataNascimento);
            expect(retorno.situacao).toBe(pessoa.situacao);
        });
    });

    ///////////////////////MÉTODO-EXCLUIR///////////////////////////////////////////
    describe('Método Excluir objeto', function () {

        it('Deve excluir um objeto', function () {

            retorno = {};

            $httpBackend.whenDELETE(url).respond(200, $q.when(pessoa));

            expect($controller.excluir).not.toHaveBeenCalled();
            expect(retorno).toEqual({});

            $controller.excluir(url, pessoa).then(function (response) {
                retorno = response;
            });

            $httpBackend.flush();

            expect($controller.excluir).toHaveBeenCalledWith(url, pessoa);
            expect(retorno.id).toBe(pessoa.id);
            expect(retorno.nome).toBe(pessoa.nome);
            expect(retorno.email).toBe(pessoa.email);
            expect(retorno.dataNascimento).toBe(pessoa.dataNascimento);
            expect(retorno.situacao).toBe(pessoa.situacao);
        });
    });

    ////////////////////////////FORMATA-DATA///////////////////////////////////////
    describe('Verifica o formato da data', function () {

        it('Deve retornar Formata Data Tela', function () {
            var data = "1995-08-25";
            var dataTela = $controller.formataDataTela(data);

            expect(dataTela).toBe('25081995');
        });

        it('Deve retornar Formata Data Java', function () {
            var data = "25-08-1995";
            var dataJava = $controller.formataDataJava(data);

            expect(dataJava).toBe('8-19--0-25');
        });
    });
});











