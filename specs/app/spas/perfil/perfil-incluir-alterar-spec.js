describe('PerfilIncluirAlterarController', function(){
    var $rootScope, $location, HackatonStefaniniService, $controller, $httpBackend, $scope, $q;
    var url = "http://localhost:8080/treinamento/api/perfils/";

    var perfil = {
        id: null,
        nome: '',
        descricao: ''
    };

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function (_$rootScope_, _$location_, _HackatonStefaniniService_, _$controller_, _$httpBackend_, _$q_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PerfilIncluirAlterarController', { $scope: $scope });
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = $q;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('Verifica se o serviço Pessoa Incluir Alterar Controller existe', function () {
        expect($controller).toBeDefined();
    });

    //////////////////////////MÉTODO-CANCELAR//////////////////////////////////
    it('Método Cancelar de perfil', function(){
        var retornaTelaListagem = $controller.cancelar();

        expect($location.url(retornaTelaListagem)).toEqual('/listarPerfis');
    });
});