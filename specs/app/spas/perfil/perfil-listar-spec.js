describe('PerfilListarController', function(){
    var $location, HackatonStefaniniService, $scope;
    var url = 'http://localhost:8080/treinamento/api/perfils/';

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PerfilListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('Serviço Perfil Listar existe?', function(){
        expect($controller).toBeDefined();
    });
});