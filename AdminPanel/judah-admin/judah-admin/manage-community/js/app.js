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

  $("#ex12b").slider({ id: "slider12b", min: 0, max: 10, range: true, value: [3, 7] });

 $(".slider-handle.round").text("$20")






























});