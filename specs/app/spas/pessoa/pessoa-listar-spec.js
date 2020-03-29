describe('PessoaListarController', function(){
    var $location, HackatonStefaniniService, $controller, $httpBackend, $q;
    var url = 'http://localhost:8080/treinamento/api/pessoas/';

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$location_, _HackatonStefaniniService_,_$rootScope_,_$controller_, _$httpBackend_, _$q_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PessoaListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Verifica se o serviço Pessoa Listar existe', function(){
        expect($controller).toBeDefined();
    });
    
    ////////////////////////RETORNO-TELA-LISTAGEM/////////////////////////////
    describe('A tela de retorno de listagem existe?', function(){
        
        it('Deve retornar a Tela Listagem quando chamar o método Cancelar', function(){
            var retornaTelaListagem = $controller.retornarTelaListagem();
    
            expect($location.url(retornaTelaListagem)).toEqual('/listarPessoas');
        });
    });
    
});