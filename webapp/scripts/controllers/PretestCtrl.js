angular.module('tutor').controller("PretestCtrl", function($scope, $window, $location, configService, User) {

    var themes = ["default", "stFemale", "stMale"];

    var random = Math.floor((Math.random() * 10000)) % 3;

    $scope.questions = ["Minhas habilidades combinam com o desafio que estou experimentando", "Realizo a atividade automaticamente sem pensar muito", "Sei o que quero alcançar", "É muito claro para mim como estou me saindo na atividade", "Estou completamente focado na tarefa em questão", "Tenho um sentimento de total controle sobre o que estou fazendo", "Não estou preocupado com o que os outros podem estar pensando de mim", "A forma como o tempo passa parece ser diferente da normal", "A experiência é extremamente recompensadora"];
    $scope.answers = [];

    $scope.setTime = function() {
        var time = new Date().getTime();
        User.setStartTime(time);
    };

    $scope.processAnswers = function() {

        //console.log($scope.answers);
        //  validation
        if ($scope.answers.length <  $scope.questions.length) {
            $scope.msg = "Por favor, responda todas as perguntas!"
        } else {
            function add(a, b) {
                return parseInt(a) + parseInt(b);
            };

            var ans = $scope.answers;
            console.log(ans);

            //invert positive answers
            

            var sum = ans.reduce(add, 0);

            console.log(ans);
            console.log("PRETEST: " + sum);

            configService.setTheme(themes[random]);
            User.setGender($scope.gender);
            User.setAge($scope.age);
            User.setTestType(themes[random]);
            User.setPretestPoints(sum);
            User.setPre(ans);

            console.log(User.getResponse());
            // User.save();
            $location.path("/prenegative");

        };

    };
});
