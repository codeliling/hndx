$(document).ready(function() {
  var undergraduateType = 1;
  var postgraduateType = 0;

  $("#vertifyCode").click(function() {
    $(this).attr('src', '/getCaptcha?rnd=' + Math.random());
  });

  $("#undergraduateType").click(function() {
    if (undergraduateType == 1) {
      undergraduateType = 0;
      $(this).removeClass('graduateTypeBtnSelectStyle');
      $(this).addClass('graduateTypeBtnNormalStyle');
      $("#postgraduateType").removeClass('graduateTypeBtnNormalStyle');
      $("#postgraduateType").addClass('graduateTypeBtnSelectStyle');
      postgraduateType = 1;
    } else {
      undergraduateType = 1;
      $(this).removeClass('graduateTypeBtnNormalStyle');
      $(this).addClass('graduateTypeBtnSelectStyle');
      $("#postgraduateType").removeClass('graduateTypeBtnSelectStyle');
      $("#postgraduateType").addClass('graduateTypeBtnNormalStyle');
      postgraduateType = 0;
    }
  });

  $("#postgraduateType").click(function() {
    if (postgraduateType == 1) {
      postgraduateType = 0;
      $(this).removeClass('graduateTypeBtnSelectStyle');
      $(this).addClass('graduateTypeBtnNormalStyle');
      $("#undergraduateType").removeClass('graduateTypeBtnNormalStyle');
      $("#undergraduateType").addClass('graduateTypeBtnSelectStyle');
      undergraduateType = 1;
    } else {
      postgraduateType = 1;
      $(this).removeClass('graduateTypeBtnNormalStyle');
      $(this).addClass('graduateTypeBtnSelectStyle');
      $("#undergraduateType").removeClass('graduateTypeBtnSelectStyle');
      $("#undergraduateType").addClass('graduateTypeBtnNormalStyle');
      undergraduateType = 0;
    }
  });

  $("#searchBtn").click(function() {
    // 点击按钮触发get请求
    var requestUrl = "";

    if (undergraduateType == 1){
      requestUrl = "'/website/undergraduate/searchUndergraduateByCondition";
    }
    else{
      requestUrl = "/website/postgraduate/searchPostgraduateByCondition";
    }

    $.get(requestUrl, {
      // 向服务器传递参数，encodeURI进行完整编码
      username: encodeURI($("#username").val()),
      number: encodeURI($("#number").val()),
      vertifyCode: encodeURI($("#vertifyCode").val())
    }, function(data, textStatus) {
      if (data){
        if(undergraduateType == 1){
          window.location.href = '/result?' + 'type=1&Id=';
        }
        else{
          window.location.href = '/result?' + 'type=2&Id=';
        }
      }
      else{
        window.location.href = '/noResult';
      }
    })
  });
});
