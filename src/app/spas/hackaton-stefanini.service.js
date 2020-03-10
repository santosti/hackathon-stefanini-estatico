(function () {
    "use strict";

    angular
        .module("hackaton-stefanini")
        .factory("HackatonStefaniniService", HackatonStefaniniService);

    HackatonStefaniniService.$inject = ["$http"];
    var baseAPIPath = "";

    function HackatonStefaniniService($http) {
        var service = {

            /**METODOS DO CONTROLLER */
            listarPessoas: function (dados) {

                var urlServico = "http://localhost:8080/treinamento/api/pessoas";
                return executarServicoIIB_GET(urlServico, dados);
            },

            listarPessoaId: function (id) {

                var urlServico = "http://localhost:8080/treinamento/api/pessoas/"+id;
                return $http.get(urlServico).then(tratarResposta, tratarErro);
                //return executarServicoIIB_GET(urlServico, dados);
            },

            alterarPessoa: function (pessoa) {
                //var urlServico = "http://localhost:8080/treinamento/api/enderecos/";
                var urlServico = "http://localhost:8080/treinamento/api/pessoas/";
               // return $http.get(urlServico).then(tratarResposta, tratarErro);
                return executar_POST(urlServico, pessoa);
            }
        };

        function executar_POST(url, dados){
            $http({
                method: 'POST',
                url: url,
                data: dados
              }).then(function successCallback(response) {
                dados.push(response.data);
                alert("Deu bom")
              }, function errorCallback(response) {
                alert("Deu ruim!");
              });
        }

        /**METODOS REST */
        function executarServicoIIB_GET(urlServico, params) {

            var url = "{basePath}" + urlServico;
            url = url.replace("{basePath}", baseAPIPath);

            return $http.get(url, params).then(tratarResposta, tratarErro);
        }

        function executarServicoIIB_POST(urlServico, dados) {

            var url = "{basePath}" + urlServico;
            url = url.replace("{basePath}", baseAPIPath);

            return $http.post(urlServico, dados).then(tratarResposta, tratarErro);
        }

        /**METODOS TRATAMENTO ERROS */
        function tratarResposta(response) {
            return response;
        }

        function tratarErro(error) {
            return error.data;
        }

        return service;

    }

})(angular);