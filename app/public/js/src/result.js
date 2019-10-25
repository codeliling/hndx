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

function back(){
  window.location.href = "/";
}

function outputImage() {
  if (IEVersion() == -1) {
    downLoad(saveAsPNG());
  } else {
    var canvas = document.getElementById('downLoadCanvas');
    downloadURI(canvas, '学历.png');
  }

  $.post("/manage/statistics/createStatistics",{type:2,xm:downLoadXM,zsbh:downLoadNumber});
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
  if (navigator.msSaveBlob) { // IE10+
    let blob = canvas.msToBlob();
    return navigator.msSaveBlob(blob, name);
  } else {
    let uri = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    if (link.click) {
      link.click();
    } else {
      let event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window);
      link.dispatchEvent(event);
    }
    document.body.removeChild(link);
  }
}

function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}

function clearCanvas() {
  var c = document.getElementById("myCanvas");
  var cxt = c.getContext("2d");
  cxt.clearRect(0, 0, c.width, c.height);
}

function loadPostCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,Pic) {
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;
  var ctx = canvas.getContext('2d');
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;

  if (screenWidth > 1600) {
    if(Pic != '' && Pic != null){
      var headIcon = new Image();
      headIcon.src = Pic;
      headIcon.onload = function(){
        ctx.drawImage(headIcon, 260, 260, 80, 105);
      }
    }

    var myImage = new Image();
    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 260, 490, sealImg.width / 6, sealImg.height / 6);

        ctx.font = "10px Arial";
        ctx.fillText(bgbh, 375, 345);
        ctx.fillText(bgrq_year, 375, 362);
        ctx.fillText(bgrq_month, 420, 362);
        ctx.fillText(bgrq_day, 440, 362);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 100, 390);
        ctx.font = "12px Arial";
        ctx.fillText(xb, 210, 390);
        ctx.fillText(sfzh, 300, 390);
        ctx.fillText(start_year, 110, 410);
        ctx.fillText(start_month, 170, 410);

        ctx.fillText(end_year, 260, 410);
        ctx.fillText(end_month, 310, 410);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 100, 438);
        ctx.fillText(xh, 317, 438);
        ctx.fillText(xz, 425, 438);

        ctx.fillText(graduate_year, 110, 485);
        ctx.fillText(graduate_month, 180, 485);

        ctx.fillText(zsbh, 265, 510);
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth > 1280 && screenWidth <= 1600) {
    if(Pic != '' && Pic != null){
      var headIcon = new Image();
      headIcon.src = Pic;
      headIcon.onload = function(){
        ctx.drawImage(headIcon, 260, 260, 80, 105);
      }
    }

    var myImage = new Image();

    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";

    myImage.onload = function() {

      var scale = canvas.width / myImage.width;

      if(screenWidth == 1360 || screenWidth == 1366){
        ctx.drawImage(myImage, 0, 0, scale * myImage.width , (scale + 0.015) * myImage.height  );
      }
      else if (screenWidth == 1440){
        ctx.drawImage(myImage, 0, 0, scale * myImage.width , (scale + 0.005) * myImage.height  );
      }
      else{
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 240, 420, sealImg.width / 8, sealImg.height / 8);

        ctx.font = "10px Arial";
        ctx.fillText(bgbh, 295, 285);
        ctx.fillText(bgrq_year, 295, 299);
        ctx.fillText(bgrq_month, 331, 299);
        ctx.fillText(bgrq_day, 352, 299);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 80, 320);
        ctx.font = "10px Arial";
        ctx.fillText(xb, 165, 320);
        ctx.fillText(sfzh, 245, 320);
        ctx.fillText(start_year, 90, 338);
        ctx.fillText(start_month, 140, 338);

        ctx.fillText(end_year, 210, 338);
        ctx.fillText(end_month, 250, 338);

        ctx.font = "12px Arial";
        ctx.fillText(zy, 70, 360);
        ctx.fillText(xh, 255, 360);
        ctx.fillText(xz, 340, 360);

        ctx.fillText(graduate_year, 100, 400);
        ctx.fillText(graduate_month, 145, 400);

        ctx.font = "11px Arial";
        ctx.fillText(zsbh, 220, 422);
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth <= 1280) {
    if(Pic != '' && Pic != null){
      var headIcon = new Image();
      headIcon.src = Pic;
      headIcon.onload = function(){
        ctx.drawImage(headIcon, 260, 260, 80, 105);
      }
    }
    var myImage = new Image();
    myImage.src = '/public/images/Postgraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.15, scale * myImage.height / 1.15);
      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 200, 320, sealImg.width / 5, sealImg.height / 5);

        ctx.font = "10px Arial";
        ctx.fillText(bgbh, 242, 228);
        ctx.fillText(bgrq_year, 242, 237);
        ctx.fillText(bgrq_month, 272, 237);
        ctx.fillText(bgrq_day, 290, 237);

        ctx.font = "13px Arial";
        ctx.fillText(xm, 60, 255);
        ctx.font = "8px Arial";
        ctx.fillText(xb, 133, 253);
        ctx.fillText(sfzh, 195, 255);
        ctx.fillText(start_year, 70, 270);
        ctx.fillText(start_month, 110, 270);

        ctx.fillText(end_year, 170, 270);
        ctx.fillText(end_month, 200, 270);

        ctx.font = "11px Arial";
        ctx.fillText(zy, 60, 285);
        ctx.font = "10px Arial";
        ctx.fillText(xh, 210, 287);
        ctx.fillText(xz, 278, 287);

        ctx.fillText(graduate_year, 70, 319);
        ctx.fillText(graduate_month, 115, 319);

        ctx.font = "10px Arial";
        ctx.fillText(zsbh, 175, 336);
      }
      sealImg.src = '/public/images/seal3@1x.png';
    };
  }
}

function loadUnderCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,xxmc,xxxs) {
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;
  var ctx = canvas.getContext('2d');
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;

  if (screenWidth > 1600) {
    var myImage = new Image();
    myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 300, 480, sealImg.width / 6, sealImg.height / 6);

        ctx.font = "12px Arial";
        ctx.fillText(bgbh, 350, 305);
        ctx.fillText(bgrq_year, 350, 320);
        ctx.fillText(bgrq_month, 408, 320);
        ctx.fillText(bgrq_day, 430, 320);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 130, 380);
        ctx.fillText(xb, 230, 380);
        ctx.fillText("", 310, 380);
        ctx.font = "12px Arial";

        ctx.fillText(sfzh, 100, 405);
        ctx.fillText(end_year, 245, 410);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 130, 445);
        ctx.fillText(xh, 310, 445);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 310, 480);
      }
      if(xxmc == '湖南行政学院'){
        if(xxxs == '函授'){
          sealImg.src = '/public/images/seal2@2x.png';
        }
        else{
          sealImg.src = '/public/images/seal1@2x.png';
        }
      }
      else if (xxmc == '中共湖南省委党校'){
        sealImg.src = '/public/images/seal3@2x.png';
      }
      else if (xxmc == '中央党校函授学院'){
        sealImg.src = '/public/images/seal4@2x.png';
      }
      else if (xxmc == '中共中央党校函授学院'){
        sealImg.src = '/public/images/seal4@2x.png';
      }

    };

  } else if (screenWidth > 1280 && screenWidth <= 1600) {
    var myImage = new Image();

    myImage.src = '/public/images/Undergraduate_Certificate@2x.png';
    myImage.style.cssText = "transform:scale(0.5)";

    myImage.onload = function() {

      var scale = canvas.width / myImage.width;

      if(screenWidth == 1360 || screenWidth == 1366){
        ctx.drawImage(myImage, 0, 0, scale * myImage.width , (scale + 0.015) * myImage.height  );
      }
      else if (screenWidth == 1440){
        ctx.drawImage(myImage, 0, 0, scale * myImage.width , (scale - 0.02) * myImage.height  );
      }
      else{
        ctx.drawImage(myImage, 0, 0, scale * myImage.width, scale * myImage.height);
      }

      var sealImg = new Image();
      sealImg.onload = function() {
        if(screenWidth == 1440){
          ctx.drawImage(sealImg, 240, 390, sealImg.width / 6, sealImg.height / 6);
        }
        else{
          ctx.drawImage(sealImg, 260, 400, sealImg.width / 8, sealImg.height / 8);
        }

        ctx.font = "10px Arial";
        ctx.fillText(bgbh, 280, 250);
        ctx.fillText(bgrq_year, 280, 265);
        ctx.fillText(bgrq_month, 325, 265);
        ctx.fillText(bgrq_day, 345, 265);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 100, 315);
        ctx.fillText(xb, 200, 315);
        ctx.fillText("", 280, 315);
        ctx.font = "12px Arial";

        ctx.fillText(sfzh, 60, 330);
        ctx.fillText(end_year, 195, 337);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 80, 366);
        ctx.fillText(xh, 210, 375);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 260, 395);
      }
      if(xxmc == '湖南行政学院'){
        if(xxxs == '函授'){
          sealImg.src = '/public/images/seal2@2x.png';
        }
        else{
          sealImg.src = '/public/images/seal1@2x.png';
        }
      }
      else if (xxmc == '中共湖南省委党校'){
        sealImg.src = '/public/images/seal3@2x.png';
      }
      else if (xxmc == '中央党校函授学院'){
        sealImg.src = '/public/images/seal4@2x.png';
      }
      else if (xxmc == '中共中央党校函授学院'){
        sealImg.src = '/public/images/seal4@2x.png';
      }
    };

  } else if (screenWidth <= 1280) {
    var myImage = new Image();
    myImage.src = '/public/images/Undergraduate_Certificate@1x.png';
    myImage.style.cssText = "transform:scale(0.5)";
    myImage.onload = function() {
      var scale = canvas.width / myImage.width;
      ctx.drawImage(myImage, 0, 0, scale * myImage.width / 1.15, scale * myImage.height / 1.15);
      var sealImg = new Image();
      sealImg.onload = function() {
        ctx.drawImage(sealImg, 200, 320, sealImg.width / 5, sealImg.height / 5);

        ctx.font = "10px Arial";
        ctx.fillText(bgbh, 230, 200);
        ctx.fillText(bgrq_year, 230, 210);
        ctx.fillText(bgrq_month, 265, 210);
        ctx.fillText(bgrq_day, 280, 210);

        ctx.font = "14px Arial";
        ctx.fillText(xm, 90, 250);
        ctx.fillText(xb, 150, 250);
        ctx.fillText("", 210, 250);
        ctx.font = "10px Arial";

        ctx.fillText(sfzh, 50, 268);
        ctx.fillText(end_year, 160, 268);

        ctx.font = "12px Arial";
        ctx.fillText(zy, 70, 292);
        ctx.fillText(xh, 310, 425);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 200, 316);
      }
      if(xxmc == '湖南行政学院'){
        if(xxxs == '函授'){
          sealImg.src = '/public/images/seal2@1x.png';
        }
        else{
          sealImg.src = '/public/images/seal1@1x.png';
        }

      }
      else if (xxmc == '中共湖南省委党校'){
        sealImg.src = '/public/images/seal3@1x.png';
      }
      else if (xxmc == '中央党校函授学院'){
        sealImg.src = '/public/images/seal4@1x.png';
      }
      else if (xxmc == '中共中央党校函授学院'){
        sealImg.src = '/public/images/seal4@1x.png';
      }
    };

  }

}

function loadPostgraduateBigCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,Pic) {
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');

  if(Pic != '' && Pic != null){
    var headIcon = new Image();
    headIcon.src = Pic;
    headIcon.onload = function(){
      ctx.drawImage(headIcon, 360, 460, 100, 135);
    }
  }

  var myImage = new Image();

  myImage.src = '/public/images/Postgraduate_Certificate@2x.png';

  myImage.onload = function() {

    ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);

    var sealImg = new Image();
    sealImg.onload = function() {
      ctx.drawImage(sealImg, 500, 800, sealImg.width / 4, sealImg.height / 4);

      ctx.font = "16px Arial";
      ctx.fillText(bgbh, 600, 555);
      ctx.fillText(bgrq_year, 600, 582);
      ctx.fillText(bgrq_month, 668, 582);
      ctx.fillText(bgrq_day, 710, 582);

      ctx.font = "24px Arial";
      ctx.fillText(xm, 180, 623);
      ctx.fillText(xb, 326, 623);

      ctx.font = "16px Arial";
      ctx.fillText(sfzh, 486, 622);
      ctx.fillText(start_year, 180, 660);
      ctx.fillText(start_month, 270, 660);

      ctx.fillText(end_year, 380, 660);
      ctx.fillText(end_month, 500, 660);

      ctx.font = "22px Arial";
      ctx.fillText(zy, 180, 700);
      ctx.fillText(xh, 510, 700);
      ctx.fillText(xz, 680, 700);

      ctx.fillText(graduate_year, 200, 780);
      ctx.fillText(graduate_month, 290, 780);

      ctx.fillText(zsbh, 425, 825);
    }
    sealImg.src = '/public/images/seal3@2x.png';
  };
}

function loadUndergraduateBigCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,xxmc,xxxs) {
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  myImage.src = '/public/images/Undergraduate_Certificate@2x.png';

  myImage.onload = function() {

    ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);

    var sealImg = new Image();
    sealImg.onload = function() {
      ctx.drawImage(sealImg, 500, 790, sealImg.width / 4, sealImg.height / 4);

      ctx.font = "16px Arial";
      ctx.fillText(bgbh, 570, 485);
      ctx.fillText(bgrq_year, 570, 514);
      ctx.fillText(bgrq_month, 655, 514);
      ctx.fillText(bgrq_day, 695, 514);

      ctx.font = "24px Arial";
      ctx.fillText(xm, 180, 600);
      ctx.fillText(xb, 326, 600);
      ctx.fillText("", 486, 600);

      ctx.font = "18px Arial";
      ctx.fillText(sfzh, 160, 655);
      ctx.fillText(end_year, 395, 655);


      ctx.font = "22px Arial";
      ctx.fillText(zy, 160, 713);
      ctx.fillText(xh, 530, 715);


      ctx.fillText(zsbh, 490, 770);
    }
    if(xxmc == '湖南行政学院'){
      if(xxxs == '函授'){
        sealImg.src = '/public/images/seal2@2x.png';
      }
      else{
        sealImg.src = '/public/images/seal1@2x.png';
      }
    }
    else if (xxmc == '中共湖南省委党校'){
      sealImg.src = '/public/images/seal3@2x.png';
    }
    else if (xxmc == '中央党校函授学院'){
      sealImg.src = '/public/images/seal4@2x.png';
    }
    else if (xxmc == '中共中央党校函授学院'){
      sealImg.src = '/public/images/seal4@2x.png';
    }
  };
}
