angular.module('FitLyfe')
.controller('homeCtrl', ['$scope', 'RootFactory', 'AuthFactory', '$location', '$cookies', '$timeout', function($scope, RootFactory, AuthFactory, $location, $cookies, $timeout){
  $scope.title = "Home Page";
  $scope.currentUsername = AuthFactory.getUsername();

  let currentUser = AuthFactory.getUserObject();
  console.log('currentUserObject', currentUser.user_type + ' is here!');

  // let lifts_that_match_criteria = []
  // console.log('lifts_that_match_criteria out of promise', lifts_that_match_criteria);
  // let power_lift_array = [];
  // let strength_lift_array = [];
  // let endurance_lift_array = [];
  // let hypertrophy_lift_array = [];
  // $scope.workout = []

  RootFactory.getExerciseTypes().then(types => {
    $scope.generateWorkout = () => {
      // let lifts_that_match_criteria = [];
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
      // if($scope.chest){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Pectorals"){
      //           console.log('lift', types[i].associated_lifts);
      //           if($scope.lifts_that_match_criteria.indexOf(types[i].associated_lifts) === -1){
      //             $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //             $timeout();
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.back){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Back"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.shoulders){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Shoulders"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.biceps){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Biceps"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.triceps){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Triceps"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.glutes){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Glutes"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.quadriceps){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Quadriceps"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.hamstrings){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Hamstrings"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // if($scope.calves){
      //   for(var i = 0; i < types.length; i++){
      //     for(var a = 0; a < types[i].associated_lifts.length; a++){
      //       for(var b = 0; b < types[i].associated_lifts[a].muscles_used.length; b++){
      //         if(types[i].associated_lifts[a].muscles_used[b].name === "Calves"){
      //           $scope.lifts_that_match_criteria.push(types[i].associated_lifts)
      //           $timeout();
      //         }
      //       }
      //     }
      //   }
      // }
      // console.log('lifts_that_match_criteria', lifts_that_match_criteria)
      console.log('power_lift_array', power_lift_array)
      console.log('power_exercise_limit', power_exercise_limit);
      console.log('strength_lift_array', strength_lift_array)
      console.log('strength_exercise_limit', strength_exercise_limit);
      console.log('endurance_lift_array', endurance_lift_array)
      console.log('endurance_exercise_limit', endurance_exercise_limit);
      console.log('hypertrophy_lift_array', hypertrophy_lift_array)
      console.log('hypertrophy_exercise_limit', hypertrophy_exercise_limit);

      function randomGenerator(arrayLength){
        return Math.floor(Math.random() * (arrayLength))
      }

      // if($scope.power && !$scope.strength && !scope.endurance && !scope.hypertrophy){
      //   power_exercise_limit = 4;
      // }
      // if($scope.strength && !$scope.power && !scope.endurance && !scope.hypertrophy){
      //   strength_exercise_limit = 6;
      // }
      // if($scope.endurance && !$scope.strength && !scope.power && !scope.hypertrophy){
      //   endurance_exercise_limit = 10;
      // }
      // if($scope.hypertrophy && !$scope.power && !scope.endurance && !scope.strength){
      //   hypertrophy_exercise_limit = 10;
      // }
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
      // if($scope.power && $scope.strength && !scope.endurance & !scope.hypertrophy){
      //   power_exercise_limit = 3;
      //   strength_exercise_limit = 4;
      // }

      for(var h = 0; h < power_exercise_limit; h++){
        randomNumber = randomGenerator(power_lift_array.length)
        if($scope.workout.indexOf(power_lift_array[randomNumber]) === -1){
          $scope.workout.push(power_lift_array[randomNumber])
          console.log("scope.workout.length: power = ", $scope.workout.length);
        } else {
          console.log('ignored lift', power_lift_array[randomNumber]);
          h -= 1;
        }
      }
      for(var h = 0; h < strength_exercise_limit; h++){
        randomNumber = randomGenerator(strength_lift_array.length)
        if($scope.workout.indexOf(strength_lift_array[randomNumber]) === -1){
          $scope.workout.push(strength_lift_array[randomNumber])
          console.log("scope.workout.length: strength = ", $scope.workout.length);
        } else {
          console.log('ignored lift', strength_lift_array[randomNumber]);
          h -= 1;
        }
      }
      for(var h = 0; h < endurance_exercise_limit; h++){
        randomNumber = randomGenerator(endurance_lift_array.length)
        if($scope.workout.indexOf(endurance_lift_array[randomNumber]) === -1){
          $scope.workout.push(endurance_lift_array[randomNumber])
          console.log("scope.workout.length: endurance = ", $scope.workout.length);
        } else {
          console.log('ignored lift', endurance_lift_array[randomNumber]);
          h -= 1;
        }
      }
      for(var h = 0; h < hypertrophy_exercise_limit; h++){
        randomNumber = randomGenerator(hypertrophy_lift_array.length)
        if($scope.workout.indexOf(hypertrophy_lift_array[randomNumber]) === -1){
          $scope.workout.push(hypertrophy_lift_array[randomNumber])
          console.log("scope.workout.length: hypertrophy = ", $scope.workout.length);
        } else {
          console.log('ignored lift', hypertrophy_lift_array[randomNumber]);
          h -= 1;
        }
      }

      // $timeout();
      console.log('endurance_lift_array', endurance_lift_array);
      console.log('$scope.workout', $scope.workout);
    }
  })

  $scope.logout = () => {
    AuthFactory.logout();
  }
}])
