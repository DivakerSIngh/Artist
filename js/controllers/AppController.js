ngJodha.controller('AppCtrl',function($scope,$http,myCoordinates,$state,$rootScope,$localStorage){
	$rootScope.isHeader=false;
	$rootScope.isFooter=false;
  $scope.userInfo={"media":[]}
  $scope.subscriptionDetails={};
  $scope.changePasswordInfo={};
   $(".modal-backdrop.in").hide();
  
  if($localStorage.users){
     if( $localStorage.users.roleId=='1'){
       $state.go('my_add');
     }else{
        if($state.current.name=='profile'){

        }else{
         $state.go('place_myAdd',{reload:true})   
        }
       
     }
  }else{
    $state.go('login');
  }
  

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 220) {
        $(".home-header").addClass("header-color");
    } else {
        $(".home-header").removeClass("header-color");
    }
});
$('#OpenImgUpload').click(function(){ $('#imgupload').trigger('click'); });
$('#OpenImgUpload1').click(function(){ $('#imgupload').trigger('click'); });
$('#OpenImgUpload5').click(function(){ $('#imgupload5').trigger('click'); });
$('#OpenImgUpload6').click(function(){ $('#imgupload6').trigger('click'); });
$('#OpenImgUpload7').click(function(){ $('#imgupload6').trigger('click'); });
$('#OpenImgUpload2').click(function(){
$('#imgupload2').trigger('click'); });




$scope.checkLoginByRole =function(event){
     if(event=='Artists'){
        $scope.userInfo.roleId="1";
     }else{
        $scope.userInfo.roleId="2";
     }
     $scope.checkRole=event;
}




$scope.profileImageUplaod=function(test,imageId){
  console.log(imageId)
  $('#loading').show();
	 var imageFiles = document.getElementById(imageId);
	 var fd = new FormData();
        fd.append('userImage',imageFiles.files[0]);
        $http.post($rootScope.url+'api/juser/jimage-upload',fd, {
        headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
    }).success(function(responseData) {
        console.log(responseData);
        $scope.userInfo.profileImage = responseData.imageURL;
        $('#loading').hide();
    }).error(function(err){
    	console.log(err)
      $('#loading').hide();
    })
}


$('#loading').hide();
$scope.changeFile= function(fle,event){
   $('#loading').show();
	 var imageFiles = document.getElementById("imgupload2");
    var fd = new FormData();
        fd.append('userImage',imageFiles.files[0]);
      	$http.post($rootScope.url+'api/juser/jimage-upload',fd, {
        headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
    }).success(function(responseData) {
        console.log(responseData);
        $scope.userInfo.media.push({"url":responseData.imageURL,"type":true,"thumnail":responseData.imageURL});
        $('#loading').hide();
    }).error(function(err){
    	console.log(err)
      $('#loading').hide();
    })
}  

$(document).ready(function(){
  $('.profile-menu-list li').click(function(){
    $('li').removeClass("active");
    $(this).addClass("active");
   });
  
  $('.add-menu').click(function(){
    $(this).toggleClass("active");
   });

  
  $('.share-add-img').click(function(){
    $(this).toggleClass("active");
   });

  $('.upload-new-img').click(function(){ $('#new-imgupload').trigger('click'); });
  
  $('#write-post-upload-img').click(function(){ $('#post-upload-img').trigger('click'); });

 // $("#ex12b").slider({ id: "slider12b", min: 0, max: 10, range: true, value: [3, 7] });

 $(".slider-handle.round").text("$20")

});

   
 $scope.signUp = function(){
      $scope.userInfo.lastName='';
      myCoordinates.then(function(data){
           $scope.userInfo.lat=data.lat;
           $scope.userInfo.long=data.lng;
         })
       $('#loading').show();
if(($scope.userInfo.password==undefined || $scope.userInfo.password =='') || ($scope.userInfo.email==undefined || $scope.userInfo.email =='')
          || ($scope.userInfo.firstName==undefined || $scope.userInfo.firstName =='') || ($scope.userInfo.state==undefined || $scope.userInfo.state =='')
          || ($scope.userInfo.city==undefined || $scope.userInfo.city  =='')){ 
           $scope.isValidate=true; 
          $('#loading').hide();
           return true;        
}
  if($scope.userInfo.roleId=='1' && $scope.userInfo.media.length==0){
         alert("please uplaod image");
         $('#loading').hide();
         return true;
    }
  $scope.isValidate=false;;   
    console.log($scope.userInfo);
      $http.post($rootScope.url+'api/juser/jregistration',$scope.userInfo, {
        headers: { 'Content-Type': 'application/json','Authorization':$rootScope.authrization}
         }).success(function(responseData) {
        if(responseData.code==510){
           alert(responseData.message)
        }else{
        var userData={'authtoken':responseData.token,'data':responseData.UserInfo}
         $localStorage.users=userData;
          if($scope.userInfo.roleId=='2'){
          $("#artist-signup-modal-id").modal('hide')
              $state.go('place_myAdd'); }
          else{
            if(!responseData.UserInfo.subscription){
               $("#signup-modal-id").modal('hide')
                $('#subscribe-modale-id').modal('show');
              }else{
              $state.go('my_add');
            }
            /*$('#subscribe-modale-id').modal('show');
             $state.go('my_add'); */
          }
        }
          $('#loading').hide();
    }).error(function(err){
    	console.log(err)
      alert(err.message)
    	$("#signup-modal-id").modal('hide')
      $('#loading').hide();
    })
 }



 $scope.signIn = function(){
  console.log($scope.userInfo)
  if($scope.userInfo.email==undefined || $scope.userInfo.password==undefined){
     $scope.isSubmit = true;
  }else{
    $scope.isSubmit = false;
 	  $('#loading').show();
     $http.post($rootScope.url+'api/juser/jlogin',$scope.userInfo, {
        headers: { 'Content-Type': 'application/json','Authorization':$rootScope.authrization}
    }).success(function(responseData) {
      console.log(responseData);
        if(responseData.code==510){
          alert(responseData.message);
        }else{
          var userData={'authtoken':responseData.authtoken,'data':responseData.data}
            $localStorage.users=userData;

            $('#login-modal-id').modal('hide');
            if(responseData.data.roleId=='2'){

               $state.go('place_myAdd');  
            }else{
              if(!responseData.data.subscription){
                $('#subscribe-modale-id').modal('show');
              }else{
              $state.go('my_add');
            }
           }
       }
      $('#loading').hide();
    }).error(function(err){
    	  alert(err)
    })
  }
}

  

  $scope.subscription = function(plan_id){
	 $scope.planId=plan_id;
   $('#loading').show();
     $scope.subscriptionDetails.subscriptionInfo={"planId":'2'}
     $('#subscribe-modale-id').modal('hide');
     $state.go('my_add');
     $http.post($rootScope.url+'api/juser/jupdate-plan',$scope.subscriptionDetails, {
        headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken": $localStorage.users.authtoken}
    }).success(function(responseData) {
        console.log(responseData);
        $('#loading').hide();
    }).error(function(err){
    	  alert(err);
      $('#loading').hide();
    })
 }
 

$scope.changePassword = function(){
    $('#loading').show();
       $http.post($rootScope.url+'api/juser/jchange-paassword',$scope.changePasswordInfo, {
        headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}
    }).success(function(responseData) {
        if(responseData.code==510){
          $scope.isValidPassord=true;
        }else{
         $('#change-password-id').modal('hide');
         $scope.changePasswordInfo={};
         $scope.isValidPassord=false;
       }
         $('#loading').hide();
    }).error(function(err){
      alert(err);
      $('#loading').hide();
    })
  }

   if($state.current.name=='profile'){
      	$rootScope.isHeader=true;
	      $rootScope.isFooter=true;
	      $scope.userData=$localStorage.users;
	      $scope.userInfo=angular.copy($localStorage.users.data);    
   }

$scope.forgotPassword=function(emailId){
  var forgotData={"email":emailId};
   $http.post($rootScope.url+'api/juser/jforgot-password',forgotData,{
        headers: { 'Content-Type': 'application/json','Authorization':$rootScope.authrization}
    }).success(function(responseData) {
        console.log(responseData);
        if(responseData.code==404){
          alert(responseData.message);
        }else{
          alert(responseData.message);
            $('#forget-modal-id').modal('hide');
      }
      $('#loading').hide();
    }).error(function(err){
        alert(err)
    })
}




   $scope.editProfile = function(){
   	    $('#loading').show();
   	    delete $scope.userInfo.roleId;
   	    delete $scope.userInfo.subscription;
   	    delete $scope.userInfo.subscriptionInfo;
   	    delete $scope.userInfo._id;
   	    delete $scope.userInfo.status;
   	    delete $scope.userInfo.updated;
   	    delete $scope.userInfo.isDelete;
   	    delete $scope.userInfo.created;
   	    delete $scope.userInfo._v;
   	    delete $scope.userInfo.latLong;
   	    delete $scope.userInfo.password;
   	    delete $scope.userInfo.emailApproved;
   	       	    myCoordinates.then(function(data){
           $scope.userInfo.lat=data.lat;
           $scope.userInfo.long=data.lng;
         })
   	     console.log($scope.userInfo)
   	    $http.post($rootScope.url+'api/juser/jupdate-profile',$scope.userInfo, {
        headers: { 'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}
    }).success(function(responseData) {
        console.log(responseData);
        $localStorage.users["data"]=responseData.data;
        	$("#signup-modal-id").modal('hide')
         $('#loading').hide();
    }).error(function(err){
    	  alert(err);
      $('#loading').hide();
    })

   }

});