// angular.module('FitLyfe')
app.controller('workoutsCtrl', [
  '$scope',
  '$location',
  '$http',
  'API_URL',
  '$cookies',
  'AuthFactory',
  'RootFactory',
  function($scope,
           $location,
           $http,
           API_URL,
           $cookies,
           AuthFactory,
           RootFactory){

    $scope.title = 'workout tracker page'
    $scope.user_workouts = [];

    // if($scope.user_workouts.length === 0){
    //   $scope.user_workouts = "You currently don't have any workouts saved!";
    // }

    let currentUser = AuthFactory.getUserObject();
    console.log('currentUser', currentUser);

    RootFactory.getAllWorkouts().then(workouts => {
      // console.log('workouts', workouts);
      for(var i = 0; i < workouts.length; i++){
        let workoutObject = {};
        if(currentUser.username === workouts[i].athlete.username){
          workoutObject = {
            name: workouts[i].name,
            date: workouts[i].date,
            exercises_completed: []
          }
          for(var b = 0; b < workouts[i].exercises_completed.length; b++){
            console.log('exercises[b] in loop', workouts[i].exercises_completed[b])
            lift_completed = {
              name: workouts[i].exercises_completed[b].lift.name,
              sets_completed: workouts[i].exercises_completed[b].sets_completed,
              total_reps_achived: workouts[i].exercises_completed[b].total_reps_completed
            }
          }
          workoutObject.exercises_completed.push(lift_completed);
        }
        $scope.user_workouts.push(workoutObject);
        console.log("$scope.user_workouts after loop", $scope.user_workouts);
      }
      if($scope.user_workouts.length === 0){
        let noWorkouts = {
          name: "You currently don't have any workouts saved!"
        }
        $scope.user_workouts.push(noWorkouts);
      }
    })
}])
