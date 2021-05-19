angular
  .module("tutor")
  .controller("QuestionaryCtrl", function ($scope, $location, User) {
    $scope.questions = [];
    $scope.answers = [];

    $scope.processAnswers = function () {
      var ans = $scope.answers;
      console.log(ans);

      var sum = ans.reduce(add, 0);

      function add(a, b) {
        return parseInt(a) + parseInt(b);
      }

      User.setAge($scope.age);
      User.setName($scope.name);
      User.setGender($scope.gender);
      User.setEmail($scope.email);
      User.setEthnicity($scope.ethnicity);
      User.setCivilState($scope.civilState);
      User.setCity($scope.city);
      User.setWhatsapp($scope.whatsapp);

      User.setEconomicState($scope.economicState);
      User.setInstitucion($scope.institucion);
      User.setEducationLevel($scope.educationLevel);
      User.setGrade($scope.grade);
      
      User.save();

      $location.path(" /finish");

      /** $location.path("/finish"); */
    };
  });