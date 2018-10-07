
  ngJodha.controller('AddCtrl',function($scope,$http,myCoordinates,$rootScope,$state,$localStorage,$location,$filter,$window){





$rootScope.isHeader=true;
$rootScope.isFooter=true;
$scope.myAdd={};
$scope.LocationObjectfromMap;
$scope.userInfo={}
$scope.isToggle=false;
$scope.userData=$localStorage.users;
$rootScope.userInfo=$localStorage.users;
console.log("$rootScope.userInfo",$rootScope.userInfo);
$scope.item_name='';
$scope.mindate=new Date().toString();
$(".modal-backdrop.in").hide();

if($localStorage.users==undefined){
   $state.go('login');
}
// debugger
// $('#calender').datepicker();
$scope.chooseLocation=  function(){
  $scope.isMapOpen=true;
  $("#map-open-id").modal('show')
}


$(document).ready(function(){




  $('.profile-menu-list li').click(function(){
    $('li').removeClass("active");
    $(this).addClass("active");
   });
  
  $('.add-menu').click(function(){
    console.log("inside");
    $(this).toggleClass("active");
   });

  
  $('.share-add-img').click(function(){
    $(this).toggleClass("active");
   });

  $('.upload-new-img').click(function(){ $('#new-imgupload').trigger('click'); });
  $('.upload-new-img').click(function(){ $('#ad-img').trigger('click'); });
  $('.upload-new-img').click(function(){ $('#item-img').trigger('click'); });
  $('#write-post-upload-img').click(function(){ $('#post-upload-img').trigger('click'); });
  $("#ex12b").slider(
    { 
      id: "slider12b",
       min: 1, 
       max: 1000,
        range: true,
         value:1,
        
        });
   $(".slider-handle.round").text("");
   if($('#ex12b').slider()){

    $('#ex12b').slider().change(function(event,val) {
      var min=event.value.newValue[0];
      var max=event.value.newValue[1];
    var scope=angular.element(document.getElementById('mainMyAdd')).scope();
    scope.sellItemData =$scope.fullAddArray.filter(x=>x.price>=min && x.price<=max);
    $scope.$apply();
 
     });
   }
 
});

  $scope.priceRange =1;

 
$(window).click(function(){
  if($("#ex12b").val()){
          var price = $("#ex12b").val().split(',')
           $scope.priceRange=price[0]
          $(".slider-handle.round").text("")
          $scope.$apply()
        }
        })

 /*$scope.priceChange = function(){
  var price = $("#ex12b").val().split(',')
  $scope.priceRange=price[0]
   $(".slider-handle.round").text("")
 }*/
$('#datetimepicker1 input').click(function(event){
   $('#datetimepicker1 ').data("DateTimePicker").show();
});
//document.getElementById("calendar").focus();

 $('.upload-new-img').click(function(){ $('#new-imgupload').trigger('click'); });

$scope.myMap=function() {
var x = document.getElementById("demo");

function getLocation() {
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(geoData) {
    var mapCanvas = document.getElementById("map");
  console.log(document.getElementById("map"));
  var myCenter=new google.maps.LatLng(geoData.coords.latitude,geoData.coords.longitude);
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas, mapOptions);
 var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
     searchBox.set('map', null);
     var places = searchBox.getPlaces();
     var bounds = new google.maps.LatLngBounds();
     var i, place;
     for (i = 0; place = places[i]; i++) {
       (function(place) {
         var marker = new google.maps.Marker({

           position: place.geometry.location
         });
         marker.bindTo('map', searchBox, 'map');
         google.maps.event.addListener(marker, 'map_changed', function() {
           if (!this.getMap()) {
             this.unbindAll();
           }
         });
         bounds.extend(place.geometry.location);
       $scope.myAdd.locationName=place.formatted_address;
       $scope.locationName=place.formatted_address;;
       $scope.myAdd.lat= marker.position.lat();
       $scope.myAdd.long= marker.position.lng();
       $scope.isMapOpen=false;
       //document.getElementById("serachResult").value = $scope.locationName;
       //document.getElementById("map").style.display ="none";
       $scope.$apply()
       $("#map-open-id").modal('hide')
       }(place));
     }
     map.fitBounds(bounds);
     searchBox.set('map', map);
     map.setZoom(Math.min(map.getZoom(),12));
   });
  google.maps.event.addListener(map, 'click', function(event) {
    console.log(event)
    if(markers.length>0){
      markers[0].setMap(null)
    }
 $("#map-open-id").modal('hide')
   placeMarker(map, event.latLng);
  });

});
    }
}
getLocation();
}
var markers=[];

function placeMarker(map, location) {
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });
   google.maps.event.addListener(marker, 'click', function(event) {
        this.setMap(null);
        });
   markers[0]=marker;
   //markers[0].setMap(null);
  //marker.visible=false;
 /* var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });*/
  showLocationAddress(location,marker)
  //infowindow.open(map,marker);

}
function showLocationAddress(e) {
   var latlng = { lat: e.lat(), lng: e.lng() };
   $scope.myAdd.lat= e.lat();
   $scope.myAdd.long= e.lng();
   var geocoder = new google.maps.Geocoder;
       geocoder.geocode({'location': latlng}, function(results, status) {
       console.log(results);
       $scope.myAdd.locationName=results[0].formatted_address;
       $scope.locationName=results[0].formatted_address;;
       $scope.isMapOpen=false;
       $scope.$apply()
       if($state.current.name=='near_by_ads'){
        var location_obtained={"lat":e.lat(),"long":e.lng(),"name":$scope.myAdd.locationName}
        $scope.searchNearByAd($scope.radius,location_obtained)

       }
       //$scope.searchNearByAd()
     });
}

$scope.isToggle = false;
  $scope.searchNearByAd = function(radius,locationObject){
    debugger
    $('#loading').show();
    if(locationObject){
    var latlng={lat: locationObject.lat, lng: locationObject.long,name:locationObject.name};
    }else{
      if($scope.userData==undefined){
        return false;
      }
      var latlng = { lat: $scope.userData.data.latLong[0], lng: $scope.userData.data.latLong[0] };
      var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, function(results, status) {
        console.log(results);
        //$scope.myAdd.locationName=results[0].formatted_address;
        $scope.locationName=results[0].formatted_address;
        latlng.name = results[0].formatted_address;
        $scope.isMapOpen=false;
       
        $scope.$apply()
     });
    }
      

      
    $scope.radius=radius;
    
     $http.get($rootScope.url+'api/juser/jnear-adds?limit=0&lat='+latlng.lat+'&long='+latlng.lng+'&distance='+$scope.radius+'&search='+latlng.name,{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log("res",results)
      $scope.addData=results.data;
       $('#loading').hide();
    }).error(function(){

    })
  
  }
debugger
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(geoData) {
//     geoData.coords.latitude
//     var location_obtained={"lat":e.lat(),"long":e.lng(),"name":$scope.myAdd.locationName}
//   }
// }

   $scope.searchNearByAd(6317);


$scope.myAdd.share=[];
$scope.isLinkedList=[];
$scope.linkedArtist = function(event,index,userId){
  if(event=='Link'){
    $scope.isLinkedList[index]=userId;
    $scope.myAdd.share.push({"userId":userId})
    $scope.addArtistInfo.share.push({"userId":userId})
    console.log($scope.myAdd,$scope.addArtistInfo)
 }else{
  var indexArtist = $scope.addArtistInfo.share.findIndex(function(artist) {
  return artist.userId == userId
})
   console.log(index,userId);
        $scope.addArtistInfo.share.splice(indexArtist,1)
        $scope.myAdd.share.splice(indexArtist,1)
         console.log("remove",$scope.myAdd,$scope.addArtistInfo)
       delete  $scope.isLinkedList[index]
 }
  
}

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 220) {
        $(".home-header").addClass("header-color");
    } else {
        $(".home-header").removeClass("header-color");
    }
});



$scope.createAdd= function(event){
  $('#loading').show();
	if(event=='cancel'){
    if(confirm("Are you sure?")){
		 $scope.myAdd={};
     $('#loading').hide();
    }
       $('#loading').hide();
		}else if(event=='cancel1'){
      $("#add-item-for-sell-sss").modal('hide') 
      $scope.getAllAdd();
    }
    else{
  	console.log($scope.myAdd)
    var d = new Date($scope.myAdd.expire);
      	$scope.myAdd.expire=d.getTime();
     	$http.post($rootScope.url+'api/juser/jcreate-add',$scope.myAdd, {
        headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}
    }).success(function(responseData) {
        console.log(responseData);
        $scope.myAdd={};
        $('#loading').hide();

    }).error(function(err){
    	alert(err);
      $('#loading').hide();
    })
 }

 }


  $scope.profileImageUplaod=function(){
    $('#loading').show();
	 var imageFiles = document.getElementById("imgupload");
	 var fd = new FormData();
        fd.append('userImage',imageFiles.files[0]);
        $http.post($rootScope.url+'api/juser/jimage-upload',fd, {
        headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
    }).success(function(responseData) {
        console.log(responseData);
        //$scope.myAdd.mediaData=[{"mediaUrl":responseData.imageURL,"mediaType":1}]
        //http://52.24.101.77:3001/images-view/1523038549867.jpg
        $scope.userInfo.profileImage = responseData.imageURL;
        $('#loading').hide();
    }).error(function(err){
    	console.log(err)
      $('#loading').hide();
    })

}

  $scope.linkyourself=function(temp){
      $('#loading').show();
    $http.post($rootScope.url+'api/juser/jadd-artist',{"share":[{"userId":$localStorage.users.data._id}],"addId":temp},{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
       $('#loading').hide();
        //$scope.getAllAdd();
        $window.location.reload();
    }).error(function(){
     $('#loading').hide();
    })
  }


$scope.fillArtist = function(event,index,artist){
   console.log("$scope.isLinkedList",$scope.isLinkedList)
  $('#loading').show();
   if(event=='Link'){
    $scope.isLinkedList[index]=artist.userId._id;
    $scope.addArtistInfo.share.push({"shareId":artist._id})
    var artistData ={"shareId":artist._id,"addId":$scope.addArtistInfo.addId}
    console.log($scope.addArtistInfo);
     $http.post($rootScope.url+'api/juser/jfill-artist',artistData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      //$("#link-artist-modal-id-3").modal('hide')
      $scope.getAllAdd()
       $('#loading').hide();
    }).error(function(){
     $('#loading').hide();
    })
 }else{
  var indexArtist = $scope.addArtistInfo.share.findIndex(function(artist) {
  return artist.userId == artist._id
    })  
  $scope.isLinkedList.splice(index,1)
  console.log("$scope.isLinkedList",$scope.isLinkedList)
       $scope.addArtistInfo.share.splice(indexArtist,1)
        var artistData ={"shareId":artist._id,"addId":$scope.addArtistInfo.addId}
        console.log(artistData)
       
       $http.post($rootScope.url+'api/juser/jremove-artist',artistData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
       console.log("results",results)
       $("#link-artist-modal-id-3").modal('hide')
      $scope.getAllAdd()
       $('#loading').hide();
    }).error(function(err){
        console.log("err",err)
     $('#loading').hide();
    })
 }
 
}

$scope.logout=function(){
  delete $localStorage.users;
  //$state.go('login',{reload:true})
  $location.path('/login')
}

$scope.userInfo.media=[]
$scope.changeFile= function(fle,event,id){
  
  console.log(id);
  $('#loading').show(); 
   var imageFiles = document.getElementById(id);
	     console.log(imageFiles.files[0]);
        var fd = new FormData();
        fd.append('userImage',imageFiles.files[0]);

	$http.post($rootScope.url+'api/juser/jimage-upload',fd, {
        headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
    }).success(function(responseData) {
        console.log(responseData);
        $('#loading').hide();
        //$scope.myAdd.mediaData=[{"mediaUrl":responseData.imageURL,"mediaType":1}]
       // $scope.userInfo.profileImage = responseData.imageURL;
       if(event=='file3'){
           $scope.myAdd.mediaData=[{"mediaUrl":responseData.imageURL,"mediaType":1}]
           console.log($scope.myAdd)
       }else if(event=='other'){
           $scope.myAdd.image=responseData.imageURL;
       }
       else{
           $scope.userInfo.media.push({"url":responseData.imageURL,"type":true,"thumnail":responseData.imageURL});
       }
       

    }).error(function(err){
    	console.log(err)
      $('#loading').hide();
    })	
 }


 
 $scope.addArtist = function(){
  console.log($scope.addArtistInfo)
    if($scope.addArtistInfo.share.length>0){
      $('#loading').show();
 // {"share":[{"userId":"5ac0cca080937a042d893eeb"}],"addId":"5ac3cedf2759fb2374389f8d"}
   $http.post($rootScope.url+'api/juser/jadd-artist',$scope.addArtistInfo,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      $("#link-artist-modal-id-2").modal('hide')
      $scope.getAllAdd()
       $('#loading').hide();
    }).error(function(){
     $('#loading').hide();
    })
  }else{
    alert("At Least One Artist Link")
  }
  }
 
 $scope.linkYurFun = function(addData){
var m = 0;
for (var i = 0; i < addData.length; i++) {
  if (addData[i].userId._id===$localStorage.users.data._id){
  m=1;
  }
}
if (m){
return false
}else{
return true
}
}

 $scope.aldyLinkFun = function(addData){
var m = 0;
for (var i = 0; i < addData.length; i++) {
  if (addData[i].userId._id===$localStorage.users.data._id){
  m=1;
  }
}
if (m){
return true
}else{
return false
}
}


 $scope.linkArtistList = function(add_data){
  console.log(add_data.isComplete)
  $scope.isCompleted=add_data.isComplete;
    $("#link-artist-modal-id-3").modal('show')
    $scope.linkedArtistList =add_data.share;
    $scope.addArtistInfo={share:[],addId:add_data._id}
    $scope.isLinkedList=[];
    //$scope.getAllAdd();
 }

$scope.reopenAdd = function(add_data){
   $('#loading').show();
    $scope.isCompleted=false;
    var completedAddData ={"addId":add_data._id}
       $http.post($rootScope.url+'api/juser/jreopen-add',completedAddData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
       console.log(results)
       //$scope.linkMoreArtist(add_data)
        $scope.linkedArtistList = add_data.share;
        $scope.getAllAdd();
         $('#loading').hide();
    }).error(function(){
     $('#loading').hide();
    })
   
   //$("#link-artist-modal-id-3").modal('show')
    //$("#link-artist-modal-id-2").modal('show')
    //$scope.linkedArtistList = add_data.share;
    //$scope.addArtistInfo={share:[],addId:add_data._id}
    //$scope.isLinkedList=[];
}

$scope.completedAndClosedAd = function(){
   $('#loading').show();
   var completedAddData ={"addId": $scope.addArtistInfo.addId}
   $http.post($rootScope.url+'api/juser/jcomplete-add',completedAddData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
       $scope.getAllAdd()
        $("#link-artist-modal-id-3").modal('hide')
       $('#loading').hide();
    }).error(function(){
     $('#loading').hide();
    })

}

  function getArtist(){
      $('#loading').show();
    $http.get($rootScope.url+'api/juser/jnear-users',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log("all artists",results.data.length)
      $scope.artistData=results.data;
      /*for(var i=0;i<$scope.artistData.length;i++){
       if(i=2){
        $scope.artistData[i].isLinked = true;
        }
      }*/
      $('#loading').hide();
    }).error(function(err){
       $('#loading').hide();
    })
 }

$scope.getAllAdd=  function(){
   $('#loading').show();
  $http.get($rootScope.url+'api/juser/jmy-add?limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
   console.log("result",results)
   $('#loading').hide();
   $scope.allAdd=results.data;
    }).error(function(err){
      console.log(err)
      $('#loading').hide();

    }) 
}


$scope.viewArtists = function(artistsData){
  var object_index = $scope.artistData.map(function (x) { return x._id; }).indexOf(artistsData._id);
  if(object_index>-1){
     $scope.viewArtistsData = $scope.artistData[object_index];
  }else{
    $scope.viewArtistsData = artistsData;
  }
  
  console.log($scope.viewArtistsData);
}





var add_item={"category":'Please select the category'};
$scope.addItem1 = function(data,location_name){
  add_item=data;
  add_item.locationName=location_name;
  add_item.lat=$scope.myAdd.lat;
  add_item.long=$scope.myAdd.long;
  add_item.visibilityType=1;
  add_item.image=$scope.myAdd.image;
   console.log(add_item);
  if((add_item.name==undefined || add_item.name =='') || (add_item.price==undefined || add_item.price =='')
          || (add_item.description==undefined || add_item.description =='') || (add_item.isFree==undefined || add_item.isFree =='')
          || (add_item.category==undefined || add_item.category =='' ||  add_item.category =='Please select the category')){
         alert("All the fields are required to fill");
  }else{
      $http.post($rootScope.url+'api/juser/jadd-item',add_item,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      $("#add-item-for-sell").modal('hide')
       add_item={};
       $scope.getAllItem();
    }).error(function(err){
      console.log(err)
    })
  }
}





 $scope.getAllItem =  function(){
   
   $scope.isSaved=false;
  $('#loading').show();
  $http.get($rootScope.url+'api/juser/jview-items?limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
   console.log("result>>>>>>>>>>>>>>>>>",results)
   $scope.sellItemData=results.data;
   $scope.fullAddArray=results.data;
   $('#loading').hide();
    }).error(function(err){
      console.log(err)
      $('#loading').hide();

    }) 
}

 $scope.getAllItemPrice =  function(param){
console.log('==============>>>',param)
 }

$scope.save_add_Item=function(id,index){
  console.log(id);
   $('#loading').show();
  var saveData={"itemId":id}
   $http.post($rootScope.url+'api/juser/jsave-item',saveData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      $scope.sellItemData[index].isSaved=true;
       $('#loading').hide();
    }).error(function(err){
      console.log(err)
      $('#loading').hide();

    })
}

$scope.getSaveItem = function(){
  $scope.isSaved=false;
  $('#loading').show();
  $http.get($rootScope.url+'api/juser/jsave-item?limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
   $scope.saveItem=results.data;
   if($scope.saveItem==undefined){
    $scope.saveItem=[];
   }else{
     $scope.saveItem=results.data;
   }
     $('#loading').hide();
     $scope.isSaved=true;
    }).error(function(err){
      console.log(err)
        $('#loading').hide();
    }) 
}

 $scope.getChats = function(){
  $('#loading').show();
   $http.get($rootScope.url+'api/juser/jmychat-rooms?limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    $scope.allChats=results.data;
   if($scope.allChats==undefined){
    $scope.allChats=[];
   }else{
    $scope.allChats=results.data;
   }
   console.log("$scope.allChats",$scope.allChats)
    $('#loading').hide();
    }).error(function(err){
      $('#loading').hide();
    }) 
 }

$scope.communication=function(artist,users_id){
  console.log(artist)
  $scope.isToggle=true;
   $scope.chatUserName=artist.userId.firstName;
   $scope.chatName=artist.name
  $("#link-artist-modal-id-3").modal('hide')
   $('#loading').show();
  $localStorage.userId=users_id;
   $http.get($rootScope.url+'api/juser/jmy-chats?chatId='+users_id+'&limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      if(results.data){
        $scope.chats=results.data;

      }else{
         $scope.chats=[];
      }
    
     $('#loading').hide();
    }).error(function(err){
      console.log(err)
      $('#loading').hide();
    }) 
 }
 
 $scope.toggle = function(){
    $scope.isStatus=1000;
 }

$scope.linkEditArtist = function(addInfo){
   //$("#add-item-for-sell-sss").modal('hide');
   //$("#link-artist-modal-id").modal('show') 
    $scope.linkMoreArtist(addInfo)
}
$scope.closeEditModal = function(){
  $("#add-item-for-sell-sss").modal('hide') 
  $scope.getAllAdd();
}


/*$scope.closeModal=function(){
  $("#add-item-for-sell-sss").modal('show');
   $("#link-artist-modal-id-2").modal('hide') 
}*/


/*var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myBtn").click(function(){
          alert("inside")
        });
    }
});*/


        

 $scope.editAdd = function(edit_add){
  $scope.myAdd=edit_add;
  $scope.isStatus=1000;
   $scope.myMap();
  var d=$filter('date')(new Date($scope.myAdd.expire),'yyyy-MM-dd');
      $scope.myAdd.expire=d;
      $("#add-item-for-sell-sss").modal('show')
 }

$scope.selectedEdit =function(){
  console.log("dhvhjdhdh",$scope.myAdd)
  var d = new Date($scope.myAdd.expire);
  $('#loading').show();
   $scope.myAdd.expire=d.getTime();
   $scope.myAdd.addId=$scope.myAdd._id;
   $scope.myAdd.lat= $scope.myAdd.latLong[0]
   $scope.myAdd.long=$scope.myAdd.latLong[0]
   //delete $scope.myAdd._id;
   //delete $scope.myAdd.latLong
   console.log(isNaN($scope.myAdd.expire));
   if(($scope.myAdd.title=='' ||  $scope.myAdd.title==undefined) || ($scope.myAdd.locationName=='' ||  $scope.myAdd.locationName==undefined)|| isNaN($scope.myAdd.expire)){
      alert("Location,title and Date is required");
      $('#loading').hide();
    return true
   }
   console.log($scope.myAdd);
   $http.post($rootScope.url+'api/juser/jedit-add',$scope.myAdd, {
        headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}
    }).success(function(responseData) {
        console.log(responseData);
        $scope.myAdd={};
        $('#loading').hide();
        $("#add-item-for-sell-sss").modal('hide')

    }).error(function(err){
      alert(err);
      $('#loading').hide();
    })

}

$scope.checkStatus = function($index,add,e){
  console.log(add.isComplete)
   e.stopPropagation();
   $scope.isStatus =$index;
   var d1 = new Date();
   var d2 = new Date(add.expire);
   if(add.isComplete){
     $scope.isEdit=false;
         $scope.isDelete=false;
   }else{
   if(add.isCancel){
         $scope.isEdit=false;
         $scope.isDelete=true;
       }else{
          if(d1.getTime()==d2.getTime()){
         $scope.isEdit=true;
         $scope.isDelete=false;
      }else if(d1.getTime()>d2.getTime()){
       $scope.isDelete=true;
       $scope.isEdit=false;
      }else{
          $scope.isDelete=false;
         $scope.isEdit=true;
      }
       }
     }
      
}

$scope.deleteAdd = function(requestTtype,add_id){
  console.log(requestTtype);
   $('#loading').show();
  var deleteAddData={"addId":add_id}
  if(requestTtype =='jcancel-add'){
    if(confirm("Are you sure you would like to cancel this ad?")){
       $http.post($rootScope.url+'api/juser/'+requestTtype,deleteAddData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      $scope.getAllAdd();
      $('#loading').hide();
    }).error(function(err){
      console.log(err)
      $('#loading').hide();

    })
    }
  }else{
    $http.post($rootScope.url+'api/juser/'+requestTtype,deleteAddData,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
      $scope.getAllAdd();
      $('#loading').hide();
    }).error(function(err){
      console.log(err)
      $('#loading').hide();

    })
  }
 
  
}

$scope.chat={};

 $scope.sendMessage = function(user_id){
  console.log(user_id);
  console.log($localStorage.userId)
  $scope.isDisabled=true;
  $scope.chat.userId= $localStorage.userId;
  if($scope.chat.message==undefined || $scope.chat.message==''){
      alert("Please Enter Message");
      return true;
  }else{
        $http.post($rootScope.url+'api/juser/jsend-message',$scope.chat,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      if(results){
         //$scope.chats[lastIndex]={senderId:user_id,message:$scope.chat.message}
          $scope.chat.message='';
          $scope.getChats()
          getUserChat(user_id);
          $scope.isDisabled=false;
      }
      
      console.log($scope.chats);
     
    }).error(function(err){
      console.log(err)

    })
  }
}
var getUserChat = function (users_id){
   $http.get($rootScope.url+'api/juser/jmy-chats?chatId='+$localStorage.userId+'&limit=0',{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      if(results.data){
        $scope.chats=results.data;
      }else{
         $scope.chats=[];
      }
    }).error(function(err){
      console.log(err)
    })
}

$scope.addArtistInfo={share:[],addId:''}
$scope.linkMoreArtist = function(linked_artist){
   $scope.addArtistInfo={share:[],addId:linked_artist._id}
   $http.get($rootScope.url+'api/juser/jadd-more-artist?addId='+linked_artist._id,{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
   $scope.unlinked=results.data;
   $scope.isLinkedList=[];
   console.log("$scope.unlinked",$scope.unlinked);
   if($scope.unlinked.length==0){
    alert("There is No Artist")
    return true;
   }
     $("#link-artist-modal-id-2").modal('show')
    }).error(function(err){
      console.log(err)
    }) 
  
}




$scope.removeItem = function(index,item){
  $('#loading').show();
  var removeItem ={itemId:item.itemId._id}
  $http.post($rootScope.url+'api/juser/jremove-save-item',removeItem,{headers:{'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
      console.log(results)
       $scope.saveItem.splice(index,1)
      $('#loading').hide();
    }).error(function(){
    $('#loading').hide();

    }) 
}

if($state.current.name=='my_add' || $state.current.name=='near_by_ads' || $state.current.name=='sell_and_shop' || $state.current.name=='saved-ads'){
   $scope.myMap();
   getArtist();
   $scope.getAllAdd();
   $scope.getAllItem();
   $rootScope.toggle=1;
}else if($state.current.name=='place_myAdd' ||  $state.current.name=='artists'){
   getArtist();
   $scope.getAllAdd();
   $rootScope.toggle=1;
}
else{
   $rootScope.toggle=2;
}


  //#region community Section
  $scope.allCommunity=[];
  $scope.allFavCommunity=[];
  $scope.mediaType="";
  $scope.communityImage="";
  $scope.modeType="Add";
  $scope.chatText="";
  var arr = new Array();
  $scope.comments=[];
  $scope.userId;
  $scope.postId="";
  $scope.communityObject={
    "userId":"","tagId":"","title":"","message":"" ,"medialType":"0","medialUrl":""
  }
  $scope.isFavClick=true;
  $scope.faviorateCommunity;
$scope.getAllCommunity=function(){
  debugger
  $scope.userId=$rootScope.userInfo.data._id;
  $('#loading').show();
  $http.get($rootScope.url+'api/juser/jcommunity-all?userId='+$rootScope.userInfo.data._id,{headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    debugger
    $('#loading').hide();
    if(results.data){
      $scope.allCommunity=results.data;
      $scope.allFavCommunity=results.data.filter(x=>x.isFav==true);
      angular.forEach(results.artists, function (item) {
        arr.push({ artistName: item.firstName,artistId:item._id });
    });

    $scope.myArray = arr;
    }else{
       $scope.allCommunity=[];
    }
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })

}

$scope.updateCommunity=function(item){

  debugger 
  $('#loading').show();
  var data={"userId":item._id,"title":$scope.communityObject.title,"message":$scope.communityObject.message ,"postId":$rootScope.userInfo.data._id }
  $http.post($rootScope.url+'api/juser/jupdate-post',data, {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    debugger
    $('#loading').hide();
    $scope.getAllCommunity();
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })
}

$scope.makeFaviorateCommunity=function(item){
debugger
  $('#loading').show();
  var data={"postId":item._id,"isFav":item.isFav}
  $http.post($rootScope.url+'api/juser/jfav',data, {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    debugger
    $('#loading').hide();
    $scope.getAllCommunity();
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })
}

$scope.likeCommunity=function(item){
  debugger
  $('#loading').show();
  var data={"postId":item._id,"isLike":item.isLike}
  $http.post($rootScope.url+'api/juser/jlike',data, {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    debugger
    $('#loading').hide();
    $scope.getAllCommunity();
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })
}

$scope.shareCommunity=function(item){
  
}

$scope.selectResult=function(obj){
  if(obj){
    $scope.communityObject.tagId= obj.originalObject.artistId
  }
}
$scope.communityImageUplaod=function(test,imageId){
  debugger
  console.log(imageId)
  $('#loading').show();
	 var imageFiles = document.getElementById(imageId);
	 var fd = new FormData();
        fd.append('userImage',imageFiles.files[0]);
        $scope.mediaType=imageFiles.files[0].type;
        $http.post($rootScope.url+'api/juser/jimage-upload',fd, {
        
       headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
    }).success(function(responseData) {
        console.log(responseData);
        $scope.communityObject.medialUrl = responseData.imageURL;
        $('#loading').hide();
    }).error(function(err){
    	console.log(err)
      $('#loading').hide();
    })

}

$scope.saveCommunity=function(){
debugger
if($scope.modeType=="Add"){


// var asas= selectedItem.artistId;
$('#loading').show();
$scope.communityObject.userId=$rootScope.userInfo.data._id;
$scope.communityObject.medialType= $scope.mediaType=="video/mp4"?1:0;
if($scope.communityObject.title=="" || $scope.communityObject.message=="" ){
  alert("Title or Message reuired please fill first");
  return false;
}
if($scope.communityObject.medialUrl==""){
  alert("Please upload image first");
  return false;
}
 
  $http.post($rootScope.url+'api/juser/jcommunity',$scope.communityObject, {
  //  headers: { 'Content-Type': undefined,'Authorization':$rootScope.authrization}, transformRequest: angular.identity
  headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}
}).success(function(responseData) {
    console.log(responseData);
    $scope.communityImage = responseData.imageURL;
    $('#write-post-modal-id').modal('hide');
    $('#loading').hide();
    $scope.getAllCommunity();
}).error(function(err){
  console.log(err)
  $('#loading').hide();
})
}
else{

  $('#loading').show();
  var data={"userId":$rootScope.userInfo.data._id ,"title":$scope.communityObject.title,"message":$scope.communityObject.message ,"postId":$scope.communityObject._id}
  $http.post($rootScope.url+'api/juser/jupdate-post',data, {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    $('#loading').hide();
    $('#write-post-modal-id').modal('hide');
    $scope.getAllCommunity();
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })
}


}

$scope.editCommunity=function(item){
  $scope.modeType="Update";
  $scope.communityObject=item;
  $('#write-post-modal-id').modal('show');
}

$scope.clickOnCommunity=function(item){
  debugger
  $scope.postId=item._id;
  $scope.comments=item.comments;
  $('#chatBox').slideToggle();

}


$scope.sendChat=function(){
  debugger
  $('#loading').show();
  var data={"postId":$scope.postId,"comment":$scope.chatText}
  $http.post($rootScope.url+'api/juser/jpost-comment',data,
   {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}})
   .success(function(results){
    debugger
   
  }).error(function(err){
    console.log(err);
   
  })

}
$scope.deleteCommunity=function(item){
  debugger
  $('#loading').show();
  var data={"postId":item._id }
  $http.post($rootScope.url+'api/juser/jdelete-post',data, {headers: {'Content-Type': 'application/json','Authorization':$rootScope.authrization,"authtoken":$localStorage.users.authtoken}}).success(function(results){
    $('#loading').hide();
    $scope.getAllCommunity();
  }).error(function(err){
    console.log(err);
    $('#loading').hide();
  })
}

  //#endregion

})


ngJodha.directive('scroll', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
         element[0].scrollTop = element[0].scrollHeight;
         
        });
      });
    }
  }
});

ngJodha.filter("trustUrl", ['$sce', function ($sce) {
  return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
  };
}]);


