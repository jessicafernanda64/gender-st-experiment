angular.module('tutor').controller("PostNegativeCtrl", function($scope, $location, User) {

    $scope.questions = ["Pensei em como estava me saindo mal", "Pensei no que o experimentador acharia de mim", "Pensei em como deveria ser mais cuidadoso efetuando a atividade", "Pensei em como outros se saíram na atividade", "Pensei na dificuldade dos problemas", "Pensei no meu nível de habilidade", "Pensei no propósito do experimento", "Pensei em como me sentiria se soubesse como foi meu desempenho", "Pensei em quão frequentemente fiquei confuso"];
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
            User.setPost(resp.post.concat(ans));
            User.setPosttestPoints(resp.posttestPoints + sum);
            
            console.dir(User.getResponse().post);
            console.dir(User.getResponse().posttestPoints);

            User.setEndTime(time);

            $location.path("/questionary");

        };
    }

});
