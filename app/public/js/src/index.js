$(document).ready(function(){
  $("#vertifyCode").click(function(){
    $(this).attr('src','/getCaptcha?rnd=' + Math.random());
  });
});
