var ngJodha = angular.module('ngJodha',['ui.router','ngStorage','720kb.datepicker','angucomplete-alt']);
    
    ngJodha.run(function($state,$location,$rootScope,$localStorage){
        $rootScope.url='http://52.24.101.77:3002/';
        $rootScope.authrization='Basic dGltZWxpbmVhdXRoOjEyMzQ1Njc4OQ==';
        $rootScope.isHeader=false;
        $rootScope.userInfo=$localStorage.users;
        if($localStorage.users){
            $state.go('my_add');
        }else{
              $state.go('login')       
        }
       
     
    })

    ngJodha.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('login',{
        	url:'/login',
        	templateUrl:'templates/main.html',
        	controller:'AppCtrl'
        })
        .state('sell_and_shop',{
            url:'/sell_and_shop',
            templateUrl:'templates/sell-and-shop.html',
            controller:'AddCtrl'
        })
        .state('artists',{
            url:'/artists',
            templateUrl:'templates/artists.html',
            controller:'AddCtrl'
        })
        .state('place_myAdd',{
         	url:'/place_myAdd',
         	templateUrl:'templates/place_myAdd.html',
         	controller:'AddCtrl'
         })
        .state('my_add',{
            url:'/my_add',
            templateUrl:'templates/my_add.html',
            controller:'AddCtrl'
         })
         .state('about-us',{
            url:'/about-us',
            templateUrl:'templates/about-us.html'
         })
         .state('contact-us',{
            url:'/contact-us',
            templateUrl:'templates/contact-us.html'
         })
          .state('profile',{
            url:'/my_profile',
            templateUrl:'templates/my_profile.html',
            controller:'AppCtrl'
         })
           .state('posted-adss',{
            url:'/posted-adss',
            templateUrl:'templates/posted_add.html',
            controller:'AppCtrl'
         })
           .state('saved-ads',{
            url:'/saved-ads',
            templateUrl:'templates/saved_post.html',
            controller:'AddCtrl'
         })
           .state('communication',{
            url:'/communication',
            templateUrl:'templates/communication.html',
            controller:'AddCtrl'
         })

         .state('community',{
            url:'/community',
            templateUrl:'templates/community.html',
            controller:'AddCtrl'
         })

         .state('community1',{
            url:'/community1',
            templateUrl:'templates/community1.html',
            controller:'communityCtrl'
         })


         
          .state('near_by_ads',{
            url:'/near_by_ads',
            templateUrl:'templates/near_by_ads.html',
            controller:'AddCtrl'
         })

        //$urlRouterProvider.otherwise('login')
})