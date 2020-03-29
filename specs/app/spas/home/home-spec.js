describe('HomeController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_,_$rootScope_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('HomeController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Verifica se o serviço HomeController existe', function(){
        expect($controller).toBeDefined();
    });
});