describe('MenuController', function () {
    var PessoaTeste;
    var $location, HackatonStefaniniService, $httpBackend, $scope;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function (_$location_, _HackatonStefaniniService_, _$controller_, _$httpBackend_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_('MenuController', { $scope: $scope });
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço Menu existe?', function () {
        expect($controller).toBeDefined();
    });
    
    describe('Deve retornar rotas do MenuController', function () {
        var urlBase = "http://localhost:8300/#!";

        it('Deve retornar rota de CadastrarPessoa', function () {
            var url = $controller.chamarPagina('cadastrarPessoa');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/cadastrarPessoa');
        });

        it('Deve retornar rota de EditarPessoas', function () {
            var url = $controller.chamarPagina('EditarPessoa');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/EditarPessoas');
        });

        it('Deve retornar rota de listarPessoas', function () {
            var url = $controller.chamarPagina('listarPessoa');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/listarPessoas');
        });

        it('Deve retornar a rota de cadastrarPerfis', function () {
            var url = $controller.chamarPagina('cadastrarPerfis');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/cadastrarPerfis');
        });

        it('Deve retornar a rota de listarPerfis', function () {
            var url = $controller.chamarPagina('listarPerfis');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/listarPerfis')
        });

        it('Deve retornar a rota de home', function () {
            var url = $controller.chamarPagina('home');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/');
        });

        it('Deve retornar a rota de home', function () {
            var url = $controller.chamarPagina('');
            var retorno = $location.url(url);

            expect(urlBase + retorno).toBe('http://localhost:8300/#!/');
        });
    });
});