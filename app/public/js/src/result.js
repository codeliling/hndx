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

function back() {
  window.location.href = "/";
}

function outputImage() {
  if (IEVersion() == -1) {
    downLoad(saveAsPNG());
  } else {
    var canvas = document.getElementById('downLoadCanvas');
    downloadURI(canvas, '学历.png');
  }

  $.post("/manage/statistics/createStatistics", {
    type: 2,
    xm: downLoadXM,
    zsbh: downLoadNumber
  });
}

function saveAsPNG() {
  var canvas = document.getElementById('downLoadCanvas');
  return canvas.toDataURL("image/png");
}

function downLoad(url) {
  var oA = document.createElement("a");
  oA.download = name; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}


function downloadURI(canvas, name) {
  if (window.navigator.msSaveOrOpenBlob) {
    var imgData = canvas.msToBlob();
    var blobObj = new Blob([imgData]);
    window.navigator.msSaveOrOpenBlob(blobObj, name);
  } else {
    var imgData = this.canvas.toDataURL();
    imgData = imgData.replace("image/png", 'image/octet-stream');
    var a = document.createElement('a')
    var event = new MouseEvent('click')

    a.download = name;
    // 将生成的URL设置为a.href属性
    a.href = imgData;
    // 触发a的单击事件
    a.dispatchEvent(event)
  }
}

function clearCanvas() {
  var c = document.getElementById("myCanvas");
  var cxt = c.getContext("2d");
  cxt.clearRect(0, 0, c.width, c.height);
}

function loadPostCertifate(xm, bgbh, bgrq, xb, sfzh, start_year, start_month, end_year, end_month,
  zy, xh, xz, graduate_year, graduate_month, zsbh, Pic) {
  var browser = whyun.browser || {};
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;
  var ctx = canvas.getContext('2d');
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var UserAgent = navigator.userAgent.toLowerCase();

  if (screenWidth != document.body.offsetWidth && screenWidth > document.body.offsetWidth) {
    canvas.width = document.getElementById('rPanel').offsetWidth + 15;
  }

  if (screenWidth > 1600) {

    var myImage = new Image();
    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {

      var scale = canvas.width / myImage.width;
      var ieVersion = IEVersion();
      if(screenWidth == 1920){
        if (ieVersion == 9 || ieVersion == 10) {
          ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height / 1.02);
        }else if(ieVersion == 11){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.02, scale * myImage.height / 1.025);
        }
        else if(/metasr/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.02, scale * myImage.height / 1.02);
        }else if(/360se/.test(UserAgent) || /360ee/.test(JSON.stringify(browser.browser))){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.02, scale * myImage.height / 1.02);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
        }
      }
      else if(screenWidth == 2560){
        if(/firefox/.test(UserAgent) || /chrome/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.04, scale * myImage.height / 1.04);
        }
        else if(/safari/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.01, scale * myImage.height / 0.99);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.04, scale * myImage.height / 1.04);
        }

      }
      else{
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }


      if (Pic != '' && Pic != null) {
        var headIcon = new Image();
        if(Pic.indexOf('pic') > 0){
          headIcon.src = '/public/images/postgraduateImages/' + Pic;
        }
        else{
          headIcon.src = Pic;
        }
        headIcon.onload = function() {
          if (screenWidth == 2560) {
            ctx.drawImage(headIcon, 230, 280, 70, 85);
          } else {
            ctx.drawImage(headIcon, 240, 280, 70, 85);
          }

        }
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 300, 490, sealImg.width / 7, sealImg.height / 7);

        ctx.font = "12px bold SimSun";
        ctx.fillText(bgbh, 375, 325);
        ctx.fillText(bgrq, 375, 342);

        ctx.font = "12px bold SimSun";
        ctx.fillText(xm, 100, 392);

        ctx.fillText(xb, 210, 392);
        ctx.fillText(sfzh, 305, 392);
        ctx.fillText(start_year, 85, 415);
        ctx.fillText(start_month, 140, 415);

        ctx.fillText(end_year, 190, 415);
        ctx.fillText(end_month, 245, 415);

        ctx.fillText(zy, 290, 415);
        ctx.fillText(xh, 120, 441);
        //ctx.fillText(xz, 425, 438);

        ctx.fillText(graduate_year, 320, 466);
        ctx.fillText(graduate_month, 370, 466);

        ctx.fillText(zsbh, 265, 518);
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth > 1280 && screenWidth <= 1600) {

    var myImage = new Image();

    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";

    myImage.onload = function() {

      var scale = canvas.width / myImage.width;

      if (screenWidth == 1360 || screenWidth == 1366) {
        ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.04, scale * myImage.height/1.01);
      } else if (screenWidth == 1440) {
        if(/firefox/.test(UserAgent) || /chrome/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.05, scale * myImage.height/1.02);
        }
        else if(/safari/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.01, scale * myImage.height / 0.99);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.05, scale * myImage.height/1.02);
        }

      }else if (screenWidth == 1400) {
        if(IEVersion() != -1){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.07, scale * myImage.height/1.04);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.05, scale * myImage.height/1.02);
        }
      }else if (screenWidth == 1600) {
        ctx.drawImage(myImage, 0, 0, scale * myImage.width /1.07, scale * myImage.height / 1.03);
      } else {
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }

      if (Pic != '' && Pic != null) {
        var headIcon = new Image();
        if(Pic.indexOf('pic') > 0){
          headIcon.src = '/public/images/postgraduateImages/' + Pic;
        }
        else{
          headIcon.src = Pic;
        }
        headIcon.onload = function() {
          if (screenWidth == 1440){
            ctx.drawImage(headIcon, 180, 235, 65, 75);
          }
          else{
            ctx.drawImage(headIcon, 180, 225, 65, 75);
          }

        }
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 240, 420, sealImg.width / 8, sealImg.height / 8);

        if (screenWidth == 1440) {
          ctx.font = "10px SimSun";
          ctx.fillText(bgbh, 315, 280);
          ctx.fillText(bgrq, 315, 295);

          ctx.font = "12px SimSun";
          ctx.fillText(xm, 80, 340);
          ctx.fillText(xb, 175, 340);
          ctx.fillText(sfzh, 255, 340);
          ctx.fillText(start_year, 65, 360);
          ctx.fillText(start_month, 120, 360);

          ctx.fillText(end_year, 160, 360);
          ctx.fillText(end_month, 203, 360);

          ctx.fillText(zy, 233, 361);
          ctx.fillText(xh, 100, 385);
          //ctx.fillText(xz, 363, 380);

          ctx.fillText(graduate_year, 265, 405);
          ctx.fillText(graduate_month, 310, 406);

          ctx.font = "11px SimSun";
          ctx.fillText(zsbh, 227, 448);
        } else {
          ctx.font = "10px SimSun";
          ctx.fillText(bgbh, 295, 265);
          ctx.fillText(bgrq, 295, 279);

          ctx.font = "10px SimSun";
          ctx.fillText(xm, 80, 320);
          ctx.fillText(xb, 165, 320);
          ctx.fillText(sfzh, 245, 320);
          ctx.fillText(start_year, 70, 340);
          ctx.fillText(start_month, 110, 340);

          ctx.fillText(end_year, 155, 340);
          ctx.fillText(end_month, 195, 340);

          ctx.fillText(zy, 220, 340);
          ctx.fillText(xh, 90, 360);
          //ctx.fillText(xz, 340, 360);

          ctx.fillText(graduate_year, 260, 382);
          ctx.fillText(graduate_month, 295, 382);

          ctx.fillText(zsbh, 220, 425);
        }
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth <= 1280) {

    var myImage = new Image();
    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.onload = function() {

      var scale = canvas.width / myImage.width;
      ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.19, scale * myImage.height / 1.19);
      if (Pic != '' && Pic != null) {
        var headIcon = new Image();
        if(Pic.indexOf('pic') > 0){
          headIcon.src = '/public/images/postgraduateImages/' + Pic;
        }
        else{
          headIcon.src = Pic;
        }
        headIcon.onload = function() {
          ctx.drawImage(headIcon, 145, 180, 45, 60);
        }
      }
      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 200, 320, sealImg.width / 5, sealImg.height / 5);

        ctx.font = "9px SimSun";
        ctx.fillText(bgbh, 247, 214);
        ctx.fillText(bgrq, 247, 224);

        ctx.font = "10px SimSun";
        ctx.fillText(xm, 60, 256);

        ctx.fillText(xb, 133, 256);
        ctx.fillText(sfzh, 199, 256);
        ctx.fillText(start_year, 50, 272);
        ctx.fillText(start_month, 90, 272);

        ctx.fillText(end_year, 126, 272);
        ctx.fillText(end_month, 158, 272);

        ctx.fillText(zy, 180, 272);
        ctx.fillText(xh,75, 290);
        //ctx.fillText(xz, 278, 287);

        ctx.fillText(graduate_year, 206, 306);
        ctx.fillText(graduate_month, 245, 306);

        ctx.fillText(zsbh, 175, 340);
      }
      sealImg.src = '/public/images/seal3@1x.png';
    };
  }
}

function loadUnderCertifate(xm, bgbh, bgrq, xb, sfzh, start_year, start_month, end_year, end_month,
  zy, xh, xz, graduate_year, graduate_month, zsbh, xxmc, xxxs) {
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;
  var ctx = canvas.getContext('2d');
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var UserAgent = navigator.userAgent.toLowerCase();
  var browser = whyun.browser || {};

  if (screenWidth != document.body.offsetWidth && screenWidth > document.body.offsetWidth) {
    canvas.width = document.getElementById('rPanel').offsetWidth + 15;
  }

  if (screenWidth > 1600) {
    var myImage = new Image();
    if(xxmc == '中央党校函授学院' || xxmc == '中共中央党校函授学院'){
      myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
    }
    else{
      myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
    }
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      if(screenWidth == 1920){
        var ieVersion = IEVersion();
        if (ieVersion == 9 || ieVersion == 10) {
          ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height / 1.02);
        }else if(ieVersion == 11){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.02, scale * myImage.height / 1.025);
        }else if(/metasr/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.02, scale * myImage.height / 1.02);
        }else if(/360se/.test(UserAgent) || /360ee/.test(JSON.stringify(browser.browser))){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.02, scale * myImage.height / 1.02);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
        }
      }
      else if(screenWidth == 2560){
        if(/firefox/.test(UserAgent) || /chrome/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.04, scale * myImage.height / 1.04);
        }
        else if(/safari/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/0.92, scale * myImage.height / 0.92);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.04, scale * myImage.height / 1.04);
        }
      }
      else{
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 300, 450, sealImg.width / 7, sealImg.height / 7);

        ctx.font = "12px bold SimSun";
        ctx.fillText(bgbh, 350,286);
        ctx.fillText(bgrq, 350,302);

        ctx.font = "16px bold SimSun";
        ctx.fillText(xm, 110, 357);

        ctx.fillText(end_year, 206,356);

        ctx.fillText(zy, 88,390);

        ctx.fillText(zsbh, 310, 420);
      }
      if (xxmc == '湖南行政学院') {
        if (xxxs == '函授') {
          sealImg.src = '/public/images/seal2@2x.png';
        } else {
          sealImg.src = '/public/images/seal1@2x.png';
        }
      } else if (xxmc == '中共湖南省委党校') {
        sealImg.src = '/public/images/seal3@2x.png';
      } else if (xxmc == '中央党校函授学院') {
        sealImg.src = '/public/images/seal4@2x.png';
      } else if (xxmc == '中共中央党校函授学院') {
        sealImg.src = '/public/images/seal4@2x.png';
      } else {
        sealImg.src = '/public/images/seal2@2x.png';
      }
    };

  } else if (screenWidth > 1280 && screenWidth <= 1600) {
    var myImage = new Image();

    myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";

    myImage.onload = function() {

      var scale = canvas.width / myImage.width;

      if (screenWidth == 1360 || screenWidth == 1366) {
        ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.03, scale * myImage.height);
      }else if(screenWidth == 1600){
        var ieVersion = IEVersion();
        if(ieVersion != -1){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.06, scale * myImage.height / 1.04);
        }else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.05, scale * myImage.height / 1.04);
        }

      } else if (screenWidth == 1440) {
        if(/firefox/.test(UserAgent) || /chrome/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.03, scale * myImage.height/1.07);
        }
        else if(/safari/.test(UserAgent)){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width/1.01, scale * myImage.height / 1.03);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.03, scale * myImage.height/1.07);
        }

      }else if (screenWidth == 1400) {
        if(IEVersion() != -1){
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.06, scale * myImage.height/1.03);
        }
        else{
          ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.04, scale * myImage.height/1.01);
        }
      } else {
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        if (screenWidth == 1440) {
          ctx.drawImage(sealImg, 240, 360, sealImg.width / 6, sealImg.height / 6);
        } else {
          ctx.drawImage(sealImg, 250, 370, sealImg.width / 8, sealImg.height / 8);
        }

        ctx.font = "10px bold SimSun";
        if (screenWidth == 1440) {
          ctx.fillText(bgbh, 300, 237);
          ctx.fillText(bgrq, 300, 251);
        } else {
          ctx.fillText(bgbh, 280, 237);
          ctx.fillText(bgrq, 280, 251);
        }


        ctx.font = "14px SimSun";
        ctx.fillText(xm, 80, 295);

        if (screenWidth == 1440) {
          ctx.fillText(zy, 73, 322);
          ctx.fillText(end_year, 177, 296);
          ctx.fillText(zsbh, 255, 348);
        } else {
          ctx.fillText(zy, 70, 322);
          ctx.fillText(end_year, 168, 295);
          ctx.fillText(zsbh, 240, 347);
        }
      }
      if (xxmc == '湖南行政学院') {
        if (xxxs == '函授') {
          sealImg.src = '/public/images/seal2@2x.png';
        } else {
          sealImg.src = '/public/images/seal1@2x.png';
        }
      } else if (xxmc == '中共湖南省委党校') {
        sealImg.src = '/public/images/seal3@2x.png';
      } else if (xxmc == '中央党校函授学院') {
        sealImg.src = '/public/images/seal4@2x.png';
      } else if (xxmc == '中共中央党校函授学院') {
        sealImg.src = '/public/images/seal4@2x.png';
      } else {
        sealImg.src = '/public/images/seal2@2x.png';
      }
    };

  } else if (screenWidth <= 1280) {
    var myImage = new Image();
    myImage.src = '/public/images/Undergraduate_Certificate@1x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      var ieVersion = IEVersion();
      if(ieVersion != -1){
        ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.2, scale * myImage.height / 1.2);
      }else{
        ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.17, scale * myImage.height / 1.18);
      }


      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 200, 290, sealImg.width / 5, sealImg.height / 5);

        ctx.font = "10px SimSun";
        ctx.fillText(bgbh, 230, 190);
        ctx.fillText(bgrq, 230, 200);

        ctx.font = "11px SimSun";
        ctx.fillText(xm, 70, 237);

        ctx.fillText(end_year, 140, 237);

        ctx.fillText(zy, 60, 257);
        ctx.fillText(xh, 310, 425);

        ctx.fillText(zsbh, 200, 279);
      }
      if (xxmc == '湖南行政学院') {
        if (xxxs == '函授') {
          sealImg.src = '/public/images/seal2@1x.png';
        } else {
          sealImg.src = '/public/images/seal1@1x.png';
        }

      } else if (xxmc == '中共湖南省委党校') {
        sealImg.src = '/public/images/seal3@1x.png';
      } else if (xxmc == '中央党校函授学院') {
        sealImg.src = '/public/images/seal4@1x.png';
      } else if (xxmc == '中共中央党校函授学院') {
        sealImg.src = '/public/images/seal4@1x.png';
      } else {
        sealImg.src = '/public/images/seal2@2x.png';
      }
    };

  }

}

function loadPostgraduateBigCertifate(xm, bgbh, bgrq, xb, sfzh, start_year, start_month, end_year, end_month,
  zy, xh, xz, graduate_year, graduate_month, zsbh, Pic) {
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  myImage.src = '/public/images/Postgraduate_Certificate@2x.png';

  myImage.onload = function() {

    ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);

    if (Pic != '' && Pic != null) {
      var headIcon = new Image();
      if(Pic.indexOf('pic') > 0){
        headIcon.src = '/public/images/postgraduateImages/' + Pic;
      }
      else{
        headIcon.src = Pic;
      }
      headIcon.onload = function() {
        ctx.drawImage(headIcon, 360, 450, 110, 145);
      }
    }

    var sealImg = new Image();
    sealImg.onload = function() {
      ctx.drawImage(sealImg, 500, 800, sealImg.width / 5, sealImg.height / 5);

      ctx.font = "16px bold SimSun";
      ctx.fillText(bgbh, 600, 520);
      ctx.fillText(bgrq, 600, 547);

      ctx.font = "21px SimSun";
      ctx.fillText(xm, 180, 628);
      ctx.fillText(xb, 333, 628);

      ctx.fillText(sfzh, 486, 629);
      ctx.fillText(start_year, 138, 666);
      ctx.fillText(start_month, 220, 666);

      ctx.fillText(end_year, 310, 666);
      ctx.fillText(end_month,395, 666);

      ctx.fillText(zy, 460, 668);
      ctx.fillText(xh, 190, 708);
      //ctx.fillText(xz, 680, 700);

      ctx.fillText(graduate_year, 500, 750);
      ctx.fillText(graduate_month, 595, 750);

      ctx.fillText(zsbh, 425, 833);
    }
    sealImg.src = '/public/images/seal3@2x.png';
  };
}

function loadUndergraduateBigCertifate(xm, bgbh, bgrq, xb, sfzh, start_year, start_month, end_year, end_month,
  zy, xh, xz, graduate_year, graduate_month, zsbh, xxmc, xxxs) {
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  if(xxmc == '中央党校函授学院' || xxmc == '中共中央党校函授学院'){
    myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
  }
  else{
    myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
  }


  myImage.onload = function() {

    ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);

    var sealImg = new Image();
    sealImg.onload = function() {
      ctx.drawImage(sealImg, 500, 720, sealImg.width / 5, sealImg.height / 5);

      ctx.font = "16px bold SimSun";
      ctx.fillText(bgbh, 570, 456);
      ctx.fillText(bgrq, 570, 485);

      ctx.font = "26px SimSun";
      ctx.fillText(xm, 180,575);

      ctx.fillText(end_year, 335, 571);

      ctx.fillText(zy, 140, 625);
      ctx.fillText(xh, 530, 715);

      ctx.fillText(zsbh, 490, 675);
    }
    if (xxmc == '湖南行政学院') {
      if (xxxs == '函授') {
        sealImg.src = '/public/images/seal2@2x.png';
      } else {
        sealImg.src = '/public/images/seal1@2x.png';
      }
    } else if (xxmc == '中共湖南省委党校') {
      sealImg.src = '/public/images/seal3@2x.png';
    } else if (xxmc == '中央党校函授学院') {
      sealImg.src = '/public/images/seal4@2x.png';
    } else if (xxmc == '中共中央党校函授学院') {
      sealImg.src = '/public/images/seal4@2x.png';
    }
  };
}

var downLoadXM = '';
var downLoadNumber = "";

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

          $("#xllbValue").text(bylb);
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

        var date = new Date();

        var bgbh = byzh;
        var bgrq_year = date.getFullYear();
        var bgrq_month = date.getMonth() + 1;
        var bgrq_day = date.getDate();
        var bgrq = bgrq_year +' 年 ' + bgrq_month +' 月 ' + bgrq_day + ' 日'
        var start_year = "";
        var start_month = "";
        if (rxsj != "" && rxsj != null) {
          var rxsjDate = rxsj.split('-');
          start_year = rxsjDate[0];
          start_month = rxsjDate[1];
        }
        var end_year = "";
        var end_month = "";
        var graduate_year = "";
        var graduate_month = "";
        if (bysj != "" && bysj != null) {
          var bysjDate = bysj.split('-');
          end_year = bysjDate[0];
          graduate_year = bysjDate[0];
          end_month = bysjDate[1];
          graduate_month = bysjDate[1];
        }

        var xz = "3";

        downLoadXM = xm;

        if (type == 1) //本科
        {
          loadUnderCertifate(xm, bgbh, bgrq, xb, Sfzh, start_year,
            start_month, end_year, end_month, zymc, Xh, xz, graduate_year, graduate_month, byzh, xxmc, xxxs);

          loadUndergraduateBigCertifate(xm, bgbh, bgrq, xb, Sfzh, start_year,
            start_month, end_year, end_month, zymc, Xh, xz, graduate_year, graduate_month, byzh, xxmc, xxxs);

        } else {

          loadPostCertifate(xm, bgbh, bgrq, xb, Sfzh, start_year,
            start_month, end_year, end_month, zymc, Xh, xz, graduate_year, graduate_month, byzh, Pic);

          loadPostgraduateBigCertifate(xm, bgbh, bgrq, xb, Sfzh, start_year,
            start_month, end_year, end_month, zymc, Xh, xz, graduate_year, graduate_month, byzh, Pic);
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
