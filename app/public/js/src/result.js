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
  zy,xh,xz,graduate_year,graduate_month,zsbh) {
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;
  var ctx = canvas.getContext('2d');
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;

  if (screenWidth > 1600) {
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
        ctx.fillText(bgbh, 350, 318);
        ctx.fillText(bgrq_year, 350, 332);
        ctx.fillText(bgrq_month, 400, 332);
        ctx.fillText(bgrq_day, 420, 332);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 100, 375);
        ctx.font = "12px Arial";
        ctx.fillText(xb, 210, 375);
        ctx.fillText(sfzh, 300, 375);
        ctx.fillText(start_year, 110, 398);
        ctx.fillText(start_month, 170, 398);

        ctx.fillText(end_year, 260, 398);
        ctx.fillText(end_month, 310, 398);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 100, 425);
        ctx.fillText(xh, 315, 425);
        ctx.fillText(xz, 425, 425);

        ctx.fillText(graduate_year, 110, 475);
        ctx.fillText(graduate_month, 180, 475);

        ctx.fillText(zsbh, 265, 500);
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth > 1280 && screenWidth <= 1600) {
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
        ctx.fillText(bgbh, 280, 263);
        ctx.fillText(bgrq_year, 285, 277);
        ctx.fillText(bgrq_month, 321, 277);
        ctx.fillText(bgrq_day, 340, 277);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 80, 310);
        ctx.font = "10px Arial";
        ctx.fillText(xb, 165, 310);
        ctx.fillText(sfzh, 245, 310);
        ctx.fillText(start_year, 90, 328);
        ctx.fillText(start_month, 140, 328);

        ctx.fillText(end_year, 210, 328);
        ctx.fillText(end_month, 250, 328);

        ctx.font = "12px Arial";
        ctx.fillText(zy, 70, 350);
        ctx.fillText(xh, 255, 350);
        ctx.fillText(xz, 340, 350);

        ctx.fillText(graduate_year, 100, 390);
        ctx.fillText(graduate_month, 150, 390);

        ctx.font = "11px Arial";
        ctx.fillText(zsbh, 220, 412);
      }
      sealImg.src = '/public/images/seal3@2x.png';
    };

  } else if (screenWidth <= 1280) {
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
        ctx.fillText(bgbh, 220, 208);
        ctx.fillText(bgrq_year, 220, 217);
        ctx.fillText(bgrq_month, 255, 217);
        ctx.fillText(bgrq_day, 275, 217);

        ctx.font = "13px Arial";
        ctx.fillText(xm, 60, 245);
        ctx.font = "8px Arial";
        ctx.fillText(xb, 133, 245);
        ctx.fillText(sfzh, 195, 245);
        ctx.fillText(start_year, 70, 260);
        ctx.fillText(start_month, 110, 260);

        ctx.fillText(end_year, 170, 260);
        ctx.fillText(end_month, 200, 260);

        ctx.font = "11px Arial";
        ctx.fillText(zy, 60, 275);
        ctx.font = "10px Arial";
        ctx.fillText(xh, 210, 277);
        ctx.fillText(xz, 276, 277);

        ctx.fillText(graduate_year, 70, 307);
        ctx.fillText(graduate_month, 115, 309);

        ctx.font = "10px Arial";
        ctx.fillText(zsbh, 175, 326);
      }
      sealImg.src = '/public/images/seal3@1x.png';
    };
  }
}

function loadUnderCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,xxmc) {
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
        ctx.fillText(bgbh, 350, 292);
        ctx.fillText(bgrq_year, 350, 308);
        ctx.fillText(bgrq_month, 408, 308);
        ctx.fillText(bgrq_day, 430, 308);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 130, 370);
        ctx.fillText(xb, 230, 370);
        ctx.fillText("汉", 310, 370);
        ctx.font = "12px Arial";

        ctx.fillText(sfzh, 100, 395);
        ctx.fillText("2019", 250, 395);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 130, 430);
        ctx.fillText(xh, 310, 425);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 320, 470);
      }
      if(xxmc == '湖南行政学院'){
        sealImg.src = '/public/images/seal1@2x.png';
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
        ctx.fillText(bgbh, 300, 240);
        ctx.fillText(bgrq_year, 300, 255);
        ctx.fillText(bgrq_month, 335, 255);
        ctx.fillText(bgrq_day, 355, 255);

        ctx.font = "16px Arial";
        ctx.fillText(xm, 100, 300);
        ctx.fillText(xb, 200, 300);
        ctx.fillText("汉", 280, 300);
        ctx.font = "12px Arial";

        ctx.fillText(sfzh, 60, 330);
        ctx.fillText("2019", 200, 330);

        ctx.font = "14px Arial";
        ctx.fillText(zy, 80, 360);
        ctx.fillText(xh, 210, 375);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 270, 385);
      }
      if(xxmc == '湖南行政学院'){
        sealImg.src = '/public/images/seal1@2x.png';
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
        ctx.fillText(bgbh, 230, 190);
        ctx.fillText(bgrq_year, 230, 200);
        ctx.fillText(bgrq_month, 265, 200);
        ctx.fillText(bgrq_day, 280, 200);

        ctx.font = "14px Arial";
        ctx.fillText(xm, 90, 240);
        ctx.fillText(xb, 150, 240);
        ctx.fillText("汉", 210, 240);
        ctx.font = "10px Arial";

        ctx.fillText(sfzh, 50, 260);
        ctx.fillText("2019", 160, 260);

        ctx.font = "12px Arial";
        ctx.fillText(zy, 70, 282);
        ctx.fillText(xh, 310, 425);
        //ctx.fillText(xz, 425, 425);

        ctx.fillText(zsbh, 200, 306);
      }
      if(xxmc == '湖南行政学院'){
        sealImg.src = '/public/images/seal1@1x.png';
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
  zy,xh,xz,graduate_year,graduate_month,zsbh,xxmc) {
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  myImage.src = '/public/images/Postgraduate_Certificate@2x.png';

  myImage.onload = function() {

    ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);

    var sealImg = new Image();
    sealImg.onload = function() {
      ctx.drawImage(sealImg, 500, 800, sealImg.width / 4, sealImg.height / 4);

      ctx.font = "16px Arial";
      ctx.fillText(bgbh, 560, 505);
      ctx.fillText(bgrq_year, 560, 532);
      ctx.fillText(bgrq_month, 638, 532);
      ctx.fillText(bgrq_day, 680, 532);

      ctx.font = "24px Arial";
      ctx.fillText(xm, 180, 598);
      ctx.fillText(xb, 326, 598);

      ctx.font = "16px Arial";
      ctx.fillText(sfzh, 486, 600);
      ctx.fillText(start_year, 180, 635);
      ctx.fillText(start_month, 270, 635);

      ctx.fillText(end_year, 380, 635);
      ctx.fillText(end_month, 500, 635);

      ctx.font = "22px Arial";
      ctx.fillText(zy, 180, 680);
      ctx.fillText(xh, 510, 680);
      ctx.fillText(xz, 680, 680);

      ctx.fillText(graduate_year, 200, 755);
      ctx.fillText(graduate_month, 290, 755);

      ctx.fillText(zsbh, 420, 800);
    }
    sealImg.src = '/public/images/seal3@2x.png';
  };
}

function loadUndergraduateBigCertifate(xm,bgbh,bgrq_year,bgrq_month,bgrq_day,xb,sfzh,start_year,start_month,end_year,end_month,
  zy,xh,xz,graduate_year,graduate_month,zsbh,xxmc) {
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
      ctx.fillText(bgbh, 570, 465);
      ctx.fillText(bgrq_year, 570, 495);
      ctx.fillText(bgrq_month, 655, 495);
      ctx.fillText(bgrq_day, 695, 495);

      ctx.font = "24px Arial";
      ctx.fillText(xm, 180, 590);
      ctx.fillText(xb, 326, 590);
      ctx.fillText("汉", 486, 590);

      ctx.font = "18px Arial";
      ctx.fillText(sfzh, 160, 635);
      ctx.fillText("2019", 395, 635);


      ctx.font = "22px Arial";
      ctx.fillText(zy, 160, 695);
      ctx.fillText(xh, 510, 680);


      ctx.fillText(zsbh, 490, 750);
    }
    if(xxmc == '湖南行政学院'){
      sealImg.src = '/public/images/seal1@2x.png';
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
