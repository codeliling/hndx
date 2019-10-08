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
    downloadURI(canvas, '你的学历.png');
  }
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

function getQueryStringByName(name){
     var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
     if(result == null || result.length < 1){
         return "";
     }
     return result[1];
}

function clearCanvas()
{
    var c = document.getElementById("myCanvas");
    var cxt = c.getContext("2d");
    cxt.clearRect(0,0,c.width,c.height);
}

function loadCertifate(){
  var canvas = document.getElementById('myCanvas');
  canvas.width = document.getElementById('rPanel').offsetWidth;
  canvas.height = document.getElementById('rPanel').offsetHeight;

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  myImage.src = '/public/images/Preview_of_record _@2x.png';
  myImage.style.cssText = "transform:scale(0.5)";

  myImage.onload = function(){
    var scale = canvas.width / myImage.width;

    ctx.drawImage(myImage,0,-70, scale*myImage.width, scale*myImage.height);

    var sealImg = new Image();
      sealImg.onload = function(){
        ctx.drawImage(sealImg,260,350,sealImg.width/5,sealImg.height/5);

        ctx.font = "10px Arial";
        ctx.fillText("2019010213123", 280, 188);
        ctx.fillText("2019", 280, 202);
        ctx.fillText("10", 322, 202);
        ctx.fillText("3", 345, 202);

        ctx.font = "16px Arial";
        ctx.fillText("张学友", 80, 235);
        ctx.font = "10px Arial";
        ctx.fillText("4301811977010123123", 245, 235);
        ctx.fillText("2019", 70, 253);
        ctx.fillText("10", 130,253);

        ctx.fillText("2019",190, 253);
        ctx.fillText("10", 250, 253);

        ctx.fillText("经济学", 130, 275);
        ctx.fillText("32131232", 260, 275);
        ctx.fillText("3", 345, 275);

        ctx.fillText("2019", 90, 315);
        ctx.fillText("10", 150, 315);

        ctx.fillText("14301123123", 220, 337);
      }
      sealImg.src = '/public/images/seal.png';
  };
}

function loadBigCertifate(){
  var canvas = document.getElementById('downLoadCanvas');

  var ctx = canvas.getContext('2d');
  var myImage = new Image();

  myImage.src = '/public/images/Preview_of_record _@2x.png';

  myImage.onload = function(){

    ctx.drawImage(myImage,0,0, myImage.width, myImage.height);

    var sealImg = new Image();
      sealImg.onload = function(){
        ctx.drawImage(sealImg,500,800,sealImg.width/2,sealImg.height/2);

        ctx.font = "16px Arial";
        ctx.fillText("2019010213123", 560, 505);
        ctx.fillText("2019", 560, 532);
        ctx.fillText("10",638, 532);
        ctx.fillText("3", 680, 532);

        ctx.font = "20px Arial";
        ctx.fillText("张学友", 200, 598);
        ctx.fillText("男", 326, 598);

        ctx.font = "16px Arial";
        ctx.fillText("4301811977010123123", 486, 600);
        ctx.fillText("2019", 180, 635);
        ctx.fillText("10", 270,635);

        ctx.fillText("2019",380, 635);
        ctx.fillText("10", 500, 635);

        ctx.font = "20px Arial";
        ctx.fillText("经济学", 260, 680);
        ctx.fillText("32131232", 510, 680);
        ctx.fillText("3", 680, 680);

        ctx.fillText("2019", 200,755);
        ctx.fillText("10", 290, 755);

        ctx.fillText("14301123123", 420, 800);
      }
      sealImg.src = '/public/images/seal.png';


  };
}