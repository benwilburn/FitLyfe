angular.module('FitLyfe')
.controller('homeCtrl',
  ['$scope',
  'RootFactory',
  'AuthFactory',
  '$location',
  '$cookies',
  '$timeout',
  function($scope,
           RootFactory,
           AuthFactory,
           $location,
           $cookies,
           $timeout){

  $scope.title = "Home Page";
  $scope.currentUsername = AuthFactory.getUsername();
  console.log('$scope.currentUsername', $scope.currentUsername);

  if($scope.currentUsername === null){
    $scope.greeting = "Welcome to FitLyfe, Guest!";
  } else {
    $scope.greeting = "Welcome to FitLyfe, " + $scope.currentUsername;
  }

  let currentUser = AuthFactory.getUserObject();

  $scope.workoutExists = false;

  function randomGenerator(arrayLength){
    return Math.floor(Math.random() * (arrayLength))
  }

  function workoutBuilder (exercise_limit, lift_array, rep_range, set_range, percentage_range, rest_time, total_ideal_rep_range) {
    for(var h = 0; h < exercise_limit; h++){
      randomNumber = randomGenerator(lift_array.length)
      let foundLift = false;
      console.log('workout length', $scope.workout.length);
      for(var a = 0; a < $scope.workout.length; a++){
        if($scope.workout[a].name  === lift_array[randomNumber].name){
          foundLift = true;
        }
      }
      if(!foundLift){
        lift_array[randomNumber].rep_range_per_set = rep_range;
        lift_array[randomNumber].set_range = set_range;
        lift_array[randomNumber].percentage_range = percentage_range;
        lift_array[randomNumber].rest_time = rest_time;
        lift_array[randomNumber].total_rep_range = total_ideal_rep_range;
        $scope.workout.push(lift_array[randomNumber])
        console.log("scope.workout.length: power = ", $scope.workout.length);
      } else {
        console.log('ignored lift', lift_array[randomNumber]);
        h -= 1;
      }
    }
  }

  RootFactory.getExerciseTypes().then(types => {
    $scope.generateWorkout = () => {
      let power_lift_array = [];
      let power_exercise_limit = '';
      let strength_lift_array = [];
      let strength_exercise_limit = '';
      let endurance_lift_array = [];
      let endurance_exercise_limit = '';
      let hypertrophy_lift_array = [];
      let hypertrophy_exercise_limit = '';

      $scope.workout = [];



      if($scope.power){
        for(var a = 0; a < types.length; a++){
          if(types[a].name === "Power") {
            power_exercise_limit = types[a].exercise_limit;
            for(var b = 0; b < types[a].associated_lifts.length; b++){
              if(power_lift_array.indexOf(types[a].associated_lifts[b]) === -1){
                types[a].associated_lifts[b].exercise_type = types[a];
                types[a].associated_lifts[b].exercise_type.rep_range_per_set = types[a].rep_range_per_set.split(',').join(' - ');
                power_lift_array.push(types[a].associated_lifts[b])
                $timeout();
              }
            }
          }
        }
      }
      if($scope.strength){
        for(var z = 0; z < types.length; z++){
          if(types[z].name === "Strength"){
            strength_exercise_limit = types[z].exercise_limit;
            for(var b = 0; b < types[z].associated_lifts.length; b++){
              if(strength_lift_array.indexOf(types[z].associated_lifts[b]) === -1){
                types[z].associated_lifts[b].exercise_type = types[z];
                types[z].associated_lifts[b].exercise_type.rep_range_per_set = types[z].associated_lifts[b].exercise_type.rep_range_per_set.split(',').join(' - ');
                strength_lift_array.push(types[z].associated_lifts[b])
                $timeout();
              }
            }
          }
        }
      }
      if($scope.endurance){
        for(var i = 0; i < types.length; i++){
          if(types[i].name === "Endurance"){
            endurance_exercise_limit = types[i].exercise_limit
            console.log('lift', types[i].associated_lifts);
            for(var b = 0; b < types[i].associated_lifts.length; b++){
              if(endurance_lift_array.indexOf(types[i].associated_lifts[b]) === -1){
                types[i].associated_lifts[b].exercise_type = types[i];
                types[i].associated_lifts[b].exercise_type.rep_range_per_set = types[i].associated_lifts[b].exercise_type.rep_range_per_set.split(',').join(' - ');
                endurance_lift_array.push(types[i].associated_lifts[b])
                $timeout();
              }
            }
          }
        }
      }
      if($scope.hypertrophy){
        for(var i = 0; i < types.length; i++){
          if(types[i].name === "Hypertrophy"){
            hypertrophy_exercise_limit = types[i].exercise_limit;
            console.log('lift', types[i].associated_lifts);
            for(var b = 0; b < types[i].associated_lifts.length; b++){
              if(hypertrophy_lift_array.indexOf(types[i].associated_lifts[b]) === -1){
                types[i].associated_lifts[b].exercise_type = types[i];
                types[i].associated_lifts[b].exercise_type.rep_range_per_set = types[i].associated_lifts[b].exercise_type.rep_range_per_set.split(',').join(' - ');
                hypertrophy_lift_array.push(types[i].associated_lifts[b])
                $timeout();
              }
            }
          }
        }
      }

      if($scope.power && $scope.strength && $scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 2;
        strength_exercise_limit = 3;
        hypertrophy_exercise_limit = 3;
        endurance_exercise_limit = 4;
      }

      if($scope.power && $scope.strength && !$scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 2;
        strength_exercise_limit = 3;
        hypertrophy_exercise_limit = 5;
        endurance_exercise_limit = 0;
      }

      if($scope.power && $scope.strength && $scope.endurance && !$scope.hypertrophy){
        power_exercise_limit = 2;
        strength_exercise_limit = 4;
        hypertrophy_exercise_limit = 0;
        endurance_exercise_limit = 5;
      }

      if($scope.power && !$scope.strength && $scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 2;
        strength_exercise_limit = 0;
        hypertrophy_exercise_limit = 4;
        endurance_exercise_limit = 5;
      }

      if(!$scope.power && $scope.strength && $scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 0;
        strength_exercise_limit = 3;
        hypertrophy_exercise_limit = 4;
        endurance_exercise_limit = 5;
      }

      if($scope.power && !$scope.strength && !$scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 3;
        strength_exercise_limit = 0;
        hypertrophy_exercise_limit = 5;
        endurance_exercise_limit = 0;
      }

      if($scope.power && $scope.strength && !$scope.endurance && !$scope.hypertrophy){
        power_exercise_limit = 4;
        strength_exercise_limit = 5;
        hypertrophy_exercise_limit = 0;
        endurance_exercise_limit = 0;
      }

      if($scope.power && !$scope.strength && $scope.endurance && !$scope.hypertrophy){
        power_exercise_limit = 4;
        strength_exercise_limit = 0;
        hypertrophy_exercise_limit = 0;
        endurance_exercise_limit = 6;
      }

      if(!$scope.power && $scope.strength && $scope.endurance && !$scope.hypertrophy){
        power_exercise_limit = 0;
        strength_exercise_limit = 5;
        hypertrophy_exercise_limit = 0;
        endurance_exercise_limit = 6;
      }
      
      if(!$scope.power && $scope.strength && !$scope.endurance && $scope.hypertrophy){
        power_exercise_limit = 0;
        strength_exercise_limit = 5;
        hypertrophy_exercise_limit = 6;
        endurance_exercise_limit = 0;
      }

      workoutBuilder(power_exercise_limit, power_lift_array, '3 - 6', '4 - 6', '82% - 87%', '3:00', '18 - 20');
      workoutBuilder(strength_exercise_limit, strength_lift_array, '1 - 4', '4 - 6', '92% - 98%', '5:00', '6-20');
      workoutBuilder(hypertrophy_exercise_limit, hypertrophy_lift_array, '8 - 12', '5 - 6', '65% - 75%', '2:30', '48 - 60');
      workoutBuilder(endurance_exercise_limit, endurance_lift_array, '12 - 20', '4 - 6', '55% - 65%', '0:45', '72 - 80');

      $scope.workoutExists = true;
    }
  })
}])
