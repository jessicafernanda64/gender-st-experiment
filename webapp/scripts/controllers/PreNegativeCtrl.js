angular.module('tutor').controller("PreNegativeCtrl", function($scope, $location, User) {

    $scope.questions = ["Penso em como estou me saindo mal", "Penso no que outros acham de mim.", "Penso em como devo ser mais cuidadoso", "Penso em como outros podem estar se saindo bem no que estou tentando fazer", "Penso em como é difícil o que estou fazendo", "Penso sobre meu nível de habilidade", "Penso sobre o propósito do que estou fazendo.", "Penso em como eu me sentiria se soubesse como foi meu desempenho", "Penso em quão frequentemente fiquei confuso"];
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

            var resp = User.getResponse();
            User.setPre(resp.pre.concat(ans));
			User.setPretestPoints(resp.pretestPoints + sum);

            console.dir(User.getResponse().pre);
            console.dir(User.getResponse().pretestPoints);

            $location.path("/home");

        };
    }

});
