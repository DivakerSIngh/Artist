$(".gambar").attr("src", "images/upload-new-img.png");
						var $uploadCrop,
						tempFilename,
						rawImg,
						imageId;
						function readFile(input) {
                            debugger
				 			if (input.files && input.files[0]) {
				              var reader = new FileReader();
					            reader.onload = function (e) {
									$('.upload-demo').addClass('ready');
									$('#cropImagePop').modal('show');
						            rawImg = e.target.result;
					            }
					            reader.readAsDataURL(input.files[0]);
					        }
					        else {
						        swal("Sorry - you're browser doesn't support the FileReader API");
						    }
						}

						$uploadCrop = $('#upload-demo').croppie({
							viewport: {
								width: 150,
								height: 200,
							},
							enforceBoundary: false,
							enableExif: true
						});
						$('#cropImagePop').on('shown.bs.modal', function(){
							// alert('Shown pop');
							$uploadCrop.croppie('bind', {
				        		url: rawImg
				        	}).then(function(){
				        		console.log('jQuery bind complete');
				        	});
						});

						$('.item-img').on('change', function () { 
                            debugger
                            imageId = $(this).data('id'); 
                            tempFilename = $(this).val();
                            $('#cancelCropBtn').data('id', imageId); readFile(this); });
						$('#cropImageBtn').on('click', function (ev) {
							$uploadCrop.croppie('result', {
								type: 'base64',
								format: 'jpeg',
								size: {width: 150, height: 200}
							}).then(function (resp) {
                debugger
// to set base 64 code into file and dormdata
var form = document.getElementById("signupForm");

var ImageURL = resp;
// Split the base64 string in data and contentType
var block = ImageURL.split(";");
// Get the content type of the image
var contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// Convert it to a blob to upload
var blob = b64toBlob(realData, contentType);

// Create a FormData and append the file with "image" as parameter name
var formDataToUpload = new FormData(form);
formDataToUpload.append("userImage", blob);

// call api to upload cropped image
//--uploadCropedImage

debugger
blob.lastModifiedDate = new Date();
blob.name = "WP_20150330_13_28_23_Pro.jpg";
blob.lastModified=new Date().getTime();
blob.webkitRelativePath="";
var scope=angular.element(document.getElementById('signupForm')).scope();
debugger
if(scope){
    scope.$apply(function () {
    scope.uploadCropedImage(blob);
    });
}

var myAddScope=angular.element(document.getElementById('myAddDiv')).scope();
if(myAddScope){
    myAddScope.$apply(function () {
        myAddScope.uploadCropedImageForMyAdd(blob);
    });
}

var divModalSellShop=angular.element(document.getElementById('divModalSellShop')).scope();
if(divModalSellShop){
    divModalSellShop.$apply(function () {
        divModalSellShop.uploadCropedImageForMyAdd(blob);
    });
}








								$('#item-img-output').attr('src', resp);
								$('#cropImagePop').modal('hide');
							});
                        });
                        

                        function b64toBlob(b64Data, contentType, sliceSize) {
                            
                            contentType = contentType || '';
                            sliceSize = sliceSize || 512;
            
                            var byteCharacters = atob(b64Data);
                            var byteArrays = [];
            
                            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                                var slice = byteCharacters.slice(offset, offset + sliceSize);
            
                                var byteNumbers = new Array(slice.length);
                                for (var i = 0; i < slice.length; i++) {
                                    byteNumbers[i] = slice.charCodeAt(i);
                                }
            
                                var byteArray = new Uint8Array(byteNumbers);
            
                                byteArrays.push(byteArray);
                            }
            
                          var blob = new Blob(byteArrays, {type: contentType});
                          return blob;
                        }