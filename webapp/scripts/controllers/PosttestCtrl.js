angular.module('tutor').controller("PosttestCtrl", function($scope, $location, User) {

    $scope.questions = ["Estava muito claro para mim como eu estava me saindo na atividade", "Não estava preocupado com o que os outros podiam estar pensando de mim", "Minhas habilidades combinavam com o desafio da atividade que estava fazendo", "As coisas pareciam estar acontecendo automaticamente", "A forma como o tempo passou parecia ser diferente do normal", "Eu sabia o que queria alcançar", "Tive uma sensação de total controle sobre o que estava fazendo", "A experiência me deixou com uma ótima sensação", "Estava completamente focado na tarefa em questão"];
    $scope.answers = [];

    $scope.processAnswers = function() {

        if ($scope.answers.length < $scope.questions.length) {
            $scope.msg = "Por favor, responda todas as perguntas!"
        } else {

            var time = new Date().getTime();

            var ans = $scope.answers;
            console.log(ans);

            //invert positive answers
        

            var sum = ans.reduce(add, 0);

            function add(a, b) {
                return parseInt(a) + parseInt(b);
            }

            User.setPosttestPoints(sum);
            User.setPost(ans);
            

            $location.path("/postnegative");

        };
    }

});
