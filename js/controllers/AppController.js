ngJodha.controller('AppCtrl', function ($scope, $http, myCoordinates, $state, $rootScope, $localStorage) {

    $rootScope.isHeader = false;
    $rootScope.isFooter = false;
    $scope.userInfo = { "media": [] }
    $scope.subscriptionDetails = {};
    $scope.changePasswordInfo = {};
    $(".modal-backdrop.in").hide();
    if ($localStorage.users) {
        if ($localStorage.users.roleId == '1') {
            $state.go('my_add');
        } else {
            if ($state.current.name == 'profile') {

            } else {
                $state.go('place_myAdd', { reload: true })
            }

        }
    } else {
        $state.go('login');
    }


    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 220) {
            $(".home-header").addClass("header-color");
        } else {
            $(".home-header").removeClass("header-color");
        }
    });
    $('#OpenImgUpload').click(function () { $('#imgupload').trigger('click'); });
    $('#OpenImgUpload1').click(function () { $('#imgupload').trigger('click'); });
    $('#OpenImgUpload5').click(function () { $('#imgupload5').trigger('click'); });
    $('#OpenImgUpload6').click(function () { $('#imgupload6').trigger('click'); });
    $('#OpenImgUpload7').click(function () { $('#imgupload6').trigger('click'); });
    $('#OpenImgUpload2').click(function () {
        $('#imgupload2').trigger('click');
    });




    $scope.checkLoginByRole = function (event) {
        if (event == 'Artists') {
            $scope.userInfo.roleId = "1";
        } else {
            $scope.userInfo.roleId = "2";
        }
        $scope.checkRole = event;
    }




    $scope.profileImageUplaod = function (test, imageId) {
        console.log(imageId)
        $('#loading').show();
        var imageFiles = document.getElementById(imageId);
        var fd = new FormData();
        fd.append('userImage', imageFiles.files[0]);
        $http.post($rootScope.url + 'api/juser/jimage-upload', fd, {
            headers: { 'Content-Type': undefined, 'Authorization': $rootScope.authrization }, transformRequest: angular.identity
        }).success(function (responseData) {
            console.log(responseData);
            $scope.userInfo.profileImage = responseData.imageURL;
            $('#loading').hide();
        }).error(function (err) {
            console.log(err)
            $('#loading').hide();
        })
    }



    $scope.uploadCropedImage = function (file) {
        debugger
        console.log(imageId)
        $('#loading').show();
        var fd = new FormData();
        fd.append('userImage', file);
        $http.post($rootScope.url + 'api/juser/jimage-upload', fd, {
            headers: { 'Content-Type': undefined, 'Authorization': $rootScope.authrization }, transformRequest: angular.identity
        }).success(function (responseData) {
            console.log(responseData);
            $scope.userInfo.profileImage = responseData.imageURL;
        debugger
            var scope=angular.element(document.getElementById('myAddDiv')).scope();
            scope.$apply(function () {
                $scope.myAdd.mediaData=[{"mediaUrl":responseData.imageURL,"mediaType":1}]
                });



            $('#loading').hide();
        }).error(function (err) {
            console.log(err)
            $('#loading').hide();
        })
    }


    $('#loading').hide();
    $scope.changeFile = function (fle, event) {
        debugger
        $('#loading').show();
        var imageFiles = document.getElementById("imgupload2");
        var fd = new FormData();
        fd.append('userImage', imageFiles.files[0]);
        $http.post($rootScope.url + 'api/juser/jimage-upload', fd, {
            headers: { 'Content-Type': undefined, 'Authorization': $rootScope.authrization }, transformRequest: angular.identity
        }).success(function (responseData) {
            console.log(responseData);
            $scope.userInfo.media.push({ "url": responseData.imageURL, "type": true, "thumnail": responseData.imageURL });
            $('#loading').hide();
        }).error(function (err) {
            console.log(err)
            $('#loading').hide();
        })
    }

    $(document).ready(function () {
        $('.profile-menu-list li').click(function () {
            $('li').removeClass("active");
            $(this).addClass("active");
        });

        $('.add-menu').click(function () {
            $(this).toggleClass("active");
        });


        $('.share-add-img').click(function () {
            $(this).toggleClass("active");
        });

        $('.upload-new-img').click(function () { $('#new-imgupload').trigger('click'); });

        $('#write-post-upload-img').click(function () { $('#post-upload-img').trigger('click'); });

        // $("#ex12b").slider({ id: "slider12b", min: 0, max: 10, range: true, value: [3, 7] });

        $(".slider-handle.round").text("$20")

    });


    $scope.signUp = function () {
        $scope.userInfo.lastName = '';
        myCoordinates.then(function (data) {
            $scope.userInfo.lat = data.lat;
            $scope.userInfo.long = data.lng;
        })
        $('#loading').show();
        if (($scope.userInfo.password == undefined || $scope.userInfo.password == '') || ($scope.userInfo.email == undefined || $scope.userInfo.email == '')
                  || ($scope.userInfo.firstName == undefined || $scope.userInfo.firstName == '') || ($scope.userInfo.state == undefined || $scope.userInfo.state == '')
                  || ($scope.userInfo.city == undefined || $scope.userInfo.city == '')) {
            $scope.isValidate = true;
            $('#loading').hide();
            return true;
        }
        if ($scope.userInfo.roleId == '1' && $scope.userInfo.media.length == 0) {
            alert("please uplaod image");
            $('#loading').hide();
            return true;
        }
        $scope.isValidate = false;;
        console.log($scope.userInfo);
        $http.post($rootScope.url + 'api/juser/jregistration', $scope.userInfo, {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization }
        }).success(function (responseData) {
            if (responseData.code == 510) {
                alert(responseData.message)
            } else {
                var userData = { 'authtoken': responseData.token, 'data': responseData.UserInfo }
                $localStorage.users = userData;
                if ($scope.userInfo.roleId == '2') {
                    $("#artist-signup-modal-id").modal('hide')
                    $state.go('place_myAdd');
                }
                else {
                    if (!responseData.UserInfo.subscription) {
                        $("#signup-modal-id").modal('hide')
                        $('#subscribe-modale-id').modal('show');
                    } else {
                        $state.go('my_add');
                    }
                    /*$('#subscribe-modale-id').modal('show');
                     $state.go('my_add'); */
                }
            }
            $('#loading').hide();
        }).error(function (err) {
            console.log(err)
            alert(err.message)
            $("#signup-modal-id").modal('hide')
            $('#loading').hide();
        })
    }



    $scope.signIn = function () {
        console.log($scope.userInfo)
        if ($scope.userInfo.email == undefined || $scope.userInfo.password == undefined) {
            $scope.isSubmit = true;
        } else {
            $scope.isSubmit = false;
            $('#loading').show();
            $http.post($rootScope.url + 'api/juser/jlogin', $scope.userInfo, {
                headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization }
            }).success(function (responseData) {
                console.log(responseData);
                if (responseData.code == 510) {
                    alert(responseData.message);
                } else {
                    var userData = { 'authtoken': responseData.authtoken, 'data': responseData.data }
                    $localStorage.users = userData;

                    $('#login-modal-id').modal('hide');
                    if (responseData.data.roleId == '2') {

                        $state.go('place_myAdd');
                    } else {
                        if (!responseData.data.subscription) {
                            $('#subscribe-modale-id').modal('show');
                        } else {
                            $state.go('my_add');
                        }
                    }
                }
                $('#loading').hide();
            }).error(function (err) {
                alert(err)
            })
        }
    }



    $scope.subscription = function (plan_id) {
        $scope.planId = plan_id;
        $('#loading').show();
        $scope.subscriptionDetails.subscriptionInfo = { "planId": '2' }
        $('#subscribe-modale-id').modal('hide');
        $state.go('my_add');
        $http.post($rootScope.url + 'api/juser/jupdate-plan', $scope.subscriptionDetails, {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization, "authtoken": $localStorage.users.authtoken }
        }).success(function (responseData) {
            console.log(responseData);
            $('#loading').hide();
        }).error(function (err) {
            alert(err);
            $('#loading').hide();
        })
    }


    $scope.changePassword = function () {
        $('#loading').show();
        $http.post($rootScope.url + 'api/juser/jchange-paassword', $scope.changePasswordInfo, {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization, "authtoken": $localStorage.users.authtoken }
        }).success(function (responseData) {
            if (responseData.code == 510) {
                $scope.isValidPassord = true;
            } else {
                $('#change-password-id').modal('hide');
                $scope.changePasswordInfo = {};
                $scope.isValidPassord = false;
            }
            $('#loading').hide();
        }).error(function (err) {
            alert(err);
            $('#loading').hide();
        })
    }

    if ($state.current.name == 'profile') {
        $rootScope.isHeader = true;
        $rootScope.isFooter = true;
        $scope.userData = $localStorage.users;
        $scope.userInfo = angular.copy($localStorage.users.data);
    }

    $scope.forgotPassword = function (emailId) {
        var forgotData = { "email": emailId };
        $http.post($rootScope.url + 'api/juser/jforgot-password', forgotData, {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization }
        }).success(function (responseData) {
            console.log(responseData);
            if (responseData.code == 404) {
                alert(responseData.message);
            } else {
                alert(responseData.message);
                $('#forget-modal-id').modal('hide');
            }
            $('#loading').hide();
        }).error(function (err) {
            alert(err)
        })
    }




    $scope.editProfile = function () {
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
        myCoordinates.then(function (data) {
            $scope.userInfo.lat = data.lat;
            $scope.userInfo.long = data.lng;
        })
        console.log($scope.userInfo)
        $http.post($rootScope.url + 'api/juser/jupdate-profile', $scope.userInfo, {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization, "authtoken": $localStorage.users.authtoken }
        }).success(function (responseData) {
            console.log(responseData);
            $localStorage.users["data"] = responseData.data;
            $("#signup-modal-id").modal('hide')
            $('#loading').hide();
        }).error(function (err) {
            alert(err);
            $('#loading').hide();
        })

    }



    var crop_max_width = 200;
    var crop_max_height = 200;
    var jcrop_api;
    var canvas;
    var context;
    var image;

    var prefsize;

    $("#file").change(function () {
        debugger
        loadImage(this);

    });

    function loadImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            canvas = null;
            reader.onload = function (e) {
                image = new Image();
                image.onload = validateImage;
                image.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function dataURLtoBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);

            return new Blob([raw], {
                type: contentType
            });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {
            type: contentType
        });
    }

    function validateImage() {
        if (canvas != null) {
            image = new Image();
            image.onload = restartJcrop;
            image.src = canvas.toDataURL('image/png');
        } else restartJcrop();
    }

    function restartJcrop() {
        if (jcrop_api != null) {
            jcrop_api.destroy();
        }
        $("#views").empty();
        $("#views").append("<canvas id=\"canvas\">");
        canvas = $("#canvas")[0];
        context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        $("#canvas").Jcrop({
            onSelect: selectcanvas,
            onRelease: clearcanvas,
            boxWidth: crop_max_width,
            boxHeight: crop_max_height
        }, function () {
            jcrop_api = this;
        });
        clearcanvas();
    }

    function clearcanvas() {
        prefsize = {
            x: 0,
            y: 0,
            w: canvas.width,
            h: canvas.height,
        };
    }

    function selectcanvas(coords) {
        prefsize = {
            x: Math.round(coords.x),
            y: Math.round(coords.y),
            w: Math.round(coords.w),
            h: Math.round(coords.h)
        };
    }

    function applyCrop() {
        debugger
        canvas.width = prefsize.w;
        canvas.height = prefsize.h;
        context.drawImage(image, prefsize.x, prefsize.y, prefsize.w, prefsize.h, 0, 0, canvas.width, canvas.height);
        validateImage();
    }

    function applyScale(scale) {
        if (scale == 1) return;
        canvas.width = canvas.width * scale;
        canvas.height = canvas.height * scale;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        validateImage();
    }

    function applyRotate() {
        canvas.width = image.height;
        canvas.height = image.width;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(image.height / 2, image.width / 2);
        context.rotate(Math.PI / 2);
        context.drawImage(image, -image.width / 2, -image.height / 2);
        validateImage();
    }

    function applyHflip() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(image.width, 0);
        context.scale(-1, 1);
        context.drawImage(image, 0, 0);
        validateImage();
    }

    function applyVflip() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(0, image.height);
        context.scale(1, -1);
        context.drawImage(image, 0, 0);
        validateImage();
    }

    $("#cropbutton").click(function (e) {
        applyCrop();

    });
    $("#scalebutton").click(function (e) {
        var scale = prompt("Scale Factor:", "1");
        applyScale(scale);
    });
    $("#rotatebutton").click(function (e) {
        applyRotate();
    });
    $("#hflipbutton").click(function (e) {
        applyHflip();
    });
    $("#vflipbutton").click(function (e) {
        applyVflip();
    });

    $("#form").submit(function (e) {
        e.preventDefault();
        formData = new FormData($(this)[0]);
        var blob = dataURLtoBlob(canvas.toDataURL('image/png'));
        //---Add file blob to the form data
        formData.append("cropped_image[]", blob);
        $.ajax({
            url: "whatever.php",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                alert("Success");
            },
            error: function (data) {
                alert("Error");
            },
            complete: function (data) { }
        });
    });



//#region RK Chauhan
    getUserList();
    getAddList();
    function getUserList() {
        debugger
        $http.get($rootScope.url + 'api/juser/homenear-user', {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization }
        }).success(function (responseData) {
            console.log(responseData.data);
            $scope.userListData = responseData.data;
            $('#loading').hide();
        }).error(function (err) {
            $('#loading').hide();
        })
    }

    function getAddList() {
        $http.get($rootScope.url + 'api/juser/homenear-add', {
            headers: { 'Content-Type': 'application/json', 'Authorization': $rootScope.authrization }
        }).success(function (responseData) {

            debugger
            $scope.addListData = responseData.data;

            $('#loading').hide();
        }).error(function (err) {
            $('#loading').hide();
        })
    }
    //End Region


});


