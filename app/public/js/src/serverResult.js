function back() {
  window.location.href = "/";
}


var downLoadXM = '';
var downLoadNumber = "";

var certifacateImageUrl = '';

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

function downLoad(url,name) {
  var oA = document.createElement("a");
  oA.download = name; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}

function outputImage() {

  if(certifacateImageUrl != null){
    var ie = IEVersion();
    if ( ie == -1 || ie == 'edge') {
      downLoad(certifacateImageUrl,downLoadXM+'.png');
    } else {
      var oPop = window.open(certifacateImageUrl,"","width=1, height=1, top=5000, left=5000");
       for(; oPop.document.readyState != "complete"; ){ 
        if (oPop.document.readyState == "complete")
          break; 
       }

      oPop.document.execCommand("SaveAs");
      oPop.close(); 
    }

    $.post("/manage/statistics/createStatistics", {
      type: 2,
      xm: downLoadXM,
      zsbh: downLoadNumber
    });
  }
  else{
    $.toast({
      heading: 'Error',
      text: '无证书可以下载，请稍后重试!',
      showHideTransition: 'fade',
      position: 'mid-center',
      icon: 'error'
    })
  }

}


function searchFailure() {
  $.toast({
    heading: 'Error',
    text: '查询失败，返回重试!',
    showHideTransition: 'fade',
    position: 'mid-center',
    icon: 'error'
  })
  setTimeout(function() {
    window.location.href = '/';
  }, 2000);
}

function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}

(function() {
  var type = getQueryStringByName('type');
  var number = getQueryStringByName('number');
  downLoadNumber = number;
  // 点击按钮触发get请求
  var requestUrl = "";
  if (type == 1) {
    requestUrl = "/website/undergraduate/getDetailByNumber?number=" + number;
  } else {
    requestUrl = "/website/postgraduate/getDetailByNumber?number=" + number;
  }

  $.get(requestUrl, function(data, textStatus) {
    if (textStatus) {
      if (data.status == 200 && data.data != null) {

        certifacateImageUrl = '/website/certificate/createCertificate?type='+type+'&number='+number;

        var load = new Loading();
      	load.init({
      		target: "#rPanel"
      	});
	      load.start();

        var certifacteImg = new Image();
        certifacteImg.src = certifacateImageUrl;
        certifacteImg.className = "certificateImage";
        certifacteImg.onload = function(){
          document.getElementById('rPanel').appendChild(certifacteImg);
          load.stop();
        }

        var xm = "";
        var byzh = "";
        var bysj = "";
        var rxsj = "";
        var xxmc = "";
        var zymc = "";
        var bj = "";
        var bylb = "";
        var bz = "";
        var xxxs = "";
        var xsf = "";
        var Pic = "";
        var Sfzh = "";
        var xb = "";
        var Xh = "";

        if (type == 1) {
          xm = data.data.xm; //姓名
          byzh = data.data.byzh; //毕业证号
          zymc = data.data.zymc; //专业名称

          bysj = data.data.bysj; //毕业时间
          rxsj = data.data.rxsj; //入学时间
          xxmc = data.data.xxmc; //学校名称
          bj = data.data.bj; //班级
          bylb = data.data.bylb; //毕业类别
          bz = data.data.bz; //备注
          xxxs = data.data.xxxs; //学习形式
          xsf = data.data.xsf;

          $("#byrqValue").text(bysj);
          $("#xxxsValue").text(xxxs);

          $("#xbTitle").text('毕业类别');
          $("#xbValue").text(bylb);

          $("#rxrqTitle").text('入学时间');
          $("#rxrqValue").text(rxsj);

          $("#xllbValue").text(bj);
        } else {
          byzh = data.data.Byzh; //毕业证号
          Pic = data.data.Pic; //图像
          xm = data.data.Xm; //姓名
          var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (regIdNo.test(data.data.Sfzh)) {
            Sfzh = data.data.Sfzh; //身份证号
          }

          $("#byrqTitle").text('身份证号');
          $("#byrqValue").text(Sfzh);

          xb = data.data.Xb; //性别
          $("#xbValue").text(xb);

          rxsj = data.data.Rxsj; //入学时间
          $("#rxrqValue").text(rxsj);
          bysj = data.data.Bysj;

          Xh = data.data.Xh; //学号
          $("#xllbTitle").text('学号');
          $("#xllbValue").text(Xh);

          zymc = data.data.Zymc; //专业名称
          xsf = data.data.Xsf;
        }

        $("#xmValue").text(xm);
        $("#zsbhValue").text(byzh);
        $("#zymcValue").text(zymc);

        downLoadXM = xm;


      } else {
        $.toast({
          heading: 'Error',
          text: '获取数据失败，请稍后重试!',
          showHideTransition: 'fade',
          position: 'mid-center',
          icon: 'error'
        })
      }
    } else {
      $.toast({
        heading: 'Error',
        text: '获取数据失败，请稍后重试!',
        showHideTransition: 'fade',
        position: 'mid-center',
        icon: 'error'
      })
    }
  })


})();
