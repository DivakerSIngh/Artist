ngJodha.controller('headerCtrl',function($scope,$localStorage,$state){
	$scope.userData=$localStorage.users;

	$scope.logout=function(){
     delete $localStorage.users;
    $state.go('login')
  }

})
