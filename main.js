angular.module('scopeExample', [])
  // Array argument to controller method
  // helps define parameters in case minification is applied
  // to JS file
  .controller('MyController', ['$scope', '$http', '$interval','$log', '$anchorScroll','$location',
   function ($scope, $http, $interval, $log, $anchorScroll, $location) {
  $scope.username = "Timothy";

  $scope.showDetails = function () {
    // Set location hash to
    // id of element you want to scroll to
    console.log("Inside")
    $location.hash("userDetails");
    $anchorScroll();
  }
  //handles data from Ajax request
  // to GitHub API for user data
  //if successful
  function handleResponse(response){
    $scope.user = response.data;
    $scope.error = "";
    $http.get($scope.user.repos_url).then(handleRepos, handleError)
  }

  // handles data from Ajax request
  // to GitHub API for user repositories
  // if successful
  function handleRepos (response) {
    $scope.repos = response.data;
  }

  // handler if Ajax calls are unsuccessful
  function handleError(reason){
    $scope.error = reason.data.message;
  }

  var url = "https://api.github.com/users/" + $scope.username;

  $scope.search = function () {
    var promise = $http.get(url);
    promise.then(handleResponse, handleError);
    if (countdownInterval) {
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
    }
    $log.info("searching for " + $scope.username);
  }

  $scope.countdown = 5;
  function decrementCountdown () {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search();
    }
  }

  var countdownInterval = null;
  function startCountdown () {
    countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown)
  }
  startCountdown();
  // window.clearInterval(setIntervalId);
  // var setIntervalId = window.setInterval(decrementCountdown,1000);



}]);
