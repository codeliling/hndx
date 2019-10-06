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

  function tips(text){
    $.toast({
        heading: 'Error',
        text: text,
        showHideTransition: 'fade',
        position: 'mid-center',
        icon: 'error'
    })
  }

  $("#searchBtn").click(function() {
    // 点击按钮触发get请求
    var requestUrl = "";

    if (undergraduateType == 1){
      requestUrl = "/website/undergraduate/searchUndergraduateByCondition";
    }
    else{
      requestUrl = "/website/postgraduate/searchPostgraduateByCondition";
    }

    var username = $("#username").val();
    var number = $("#number").val();

    if(number == '' || number == null){
      tips('证书编号不能为空!');
      return;
    }

    if(username == '' || username == null){
      tips('姓名不能为空!');
      return;
    }

    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    if (!re.test(username)){
      tips('姓名请填写中文!');
      return;
    }

    $.get(requestUrl, {
      // 向服务器传递参数，encodeURI进行完整编码
      username: username,
      number: number,
      vertifyCode: $("#verificationCode").val()
    }, function(data, textStatus) {

      if(textStatus){
        if (data.status == 200){
          if (data.data.length > 0){

            if(undergraduateType == 1){
              window.location.href = '/result?' + 'type=1&number='+$("#number").val();
            }
            else{
              window.location.href = '/result?' + 'type=2&number='+$("#number").val();
            }
          }
          else{
            window.location.href = '/noResult';
          }
        }
        else{
          tips(data.data);
        }
      }
      else{
        tips('查询失败，请重试!');
      }

    })
  });
});
