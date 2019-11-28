function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}

window.onload=function(){
  var ieVersion = IEVersion();
  if(ieVersion > 0 && ieVersion <= 9){
    alert('您的浏览器版本过低，请更换IE10及以上浏览器，或者使用最新版谷歌浏览器');
  }
}

$(document).ready(function() {
  var undergraduateType = 1;
  var postgraduateType = 0;

  $("#number").placeholder();
  $("#username").placeholder();
  $("#verificationCode").placeholder();

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
      requestUrl = "/public/website/undergraduate/searchUndergraduateByCondition";
    }
    else{
      requestUrl = "/public/website/postgraduate/searchPostgraduateByCondition";
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
              window.location.href = '/public/result?' + 'type=1&number='+$("#number").val();
            }
            else{
              window.location.href = '/public/result?' + 'type=2&number='+$("#number").val();
            }
          }
          else{
            window.location.href = '/public/noResult';
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
