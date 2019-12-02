const BaseController = require('../BaseController');

const fs = require('fs')
const path = require('path')
const Canvas = require('canvas')


class CertificateController extends BaseController{

  async createCertificate(){
    const ctx = this.ctx;
    const number = ctx.query.number;
    const type = ctx.query.type;

    const Image = Canvas.Image;
    const canvas = Canvas.createCanvas(862, 1216);
    const convasCtx = canvas.getContext('2d');
    Canvas.registerFont(path.join(__dirname,'../../public/ttf/simsun.ttc'), { family: 'SimSun' })
    let infoData = null;
    let xm = "";
    let byzh = "";
    let bysj = "";
    let rxsj = "";
    let xxmc = "";
    let zymc = "";
    let bj = "";
    let bylb = "";
    let bz = "";
    let xxxs = "";
    let xsf = "";
    let Pic = "";
    let Sfzh = "";
    let xb = "";
    let Xh = "";

    if(type == 1){
      infoData = await ctx.service.undergraduate.getDetailByNumber(number);

      xm = infoData.xm; //姓名
      byzh = infoData.byzh; //毕业证号
      zymc = infoData.zymc; //专业名称

      bysj = infoData.bysj; //毕业时间
      rxsj = infoData.rxsj; //入学时间
      xxmc = infoData.xxmc; //学校名称
      bj = infoData.bj; //班级
      bylb = infoData.bylb; //毕业类别
      bz = infoData.bz; //备注
      xxxs = infoData.xxxs; //学习形式
      xsf = infoData.xsf;
    }
    else{
      infoData = await ctx.service.postgraduate.getDetailByNumber(number);
      byzh = infoData.Byzh; //毕业证号
      Pic = infoData.Pic; //图像
      xm = infoData.Xm; //姓名
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (regIdNo.test(infoData.Sfzh)) {
        Sfzh = infoData.Sfzh; //身份证号
      }
      xb = infoData.Xb; //性别
      rxsj = infoData.Rxsj; //入学时间
      bysj = infoData.Bysj;
      Xh = infoData.Xh; //学号
      zymc = infoData.Zymc; //专业名称
      xsf = infoData.Xsf;
    }

    let date = new Date();

    let bgrq_year = date.getFullYear();
    let bgrq_month = date.getMonth() + 1;
    let bgrq_day = date.getDate();
    let bgrq = bgrq_year +' 年 ' + bgrq_month +' 月 ' + bgrq_day + ' 日'
    let start_year = "";
    let start_month = "";
    if (rxsj != "" && rxsj != null) {
      let rxsjDate = rxsj.split('-');
      start_year = rxsjDate[0];
      start_month = rxsjDate[1];
    }
    let end_year = "";
    let end_month = "";
    let graduate_year = "";
    let graduate_month = "";
    if (bysj != "" && bysj != null) {
      let bysjDate = bysj.split('-');
      end_year = bysjDate[0];
      graduate_year = bysjDate[0];
      end_month = bysjDate[1];
      graduate_month = bysjDate[1];
    }

    let xz = "3";

    if(type == 1){
      let certificateTemplatePath = "";
      if(xxmc == '中央党校函授学院' || xxmc == '中共中央党校函授学院'){
        if(zymc.length > 4 && zymc.length < 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_Center7@2x.png';
        }
        else if (zymc.length >= 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_Center11@2x.png';
        }
        else{
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_Center@2x.png';
        }
      }
      else if(xxmc == '湖南行政学院'){
        if(zymc.length > 4 && zymc.length < 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_hnxzxy7@2x.png';
        }
        else if (zymc.length >= 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_hnxzxy11@2x.png';
        }
        else{
          certificateTemplatePath = '/public/images/Undergraduate_Certificate_hnxzxy@2x.png';
        }
      }
      else{
        if(zymc.length > 4  && zymc.length < 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate7@2x.png';
        }
        else if (zymc.length >= 8){
          certificateTemplatePath = '/public/images/Undergraduate_Certificate11@2x.png';
        }
        else{
          certificateTemplatePath = '/public/images/Undergraduate_Certificate@2x.png';
        }
      }

      await Canvas.loadImage(path.join(__dirname,'../..'+certificateTemplatePath)).then((image) => {
        convasCtx.drawImage(image, 0, 0, 862, 1216)
      })

      let sealPath = "";
      if (xxmc == '湖南行政学院') {
        if (xxxs == '函授') {
          sealPath = '/public/images/seal2@2x.png';
        } else {
          sealPath = '/public/images/seal1@2x.png';
        }
      } else if (xxmc == '中共湖南省委党校') {
        sealPath = '/public/images/seal3@2x.png';
      } else if (xxmc == '中央党校函授学院') {
        sealPath = '/public/images/seal4@2x.png';
      } else if (xxmc == '中共中央党校函授学院') {
        sealPath = '/public/images/seal4@2x.png';
      }

      await Canvas.loadImage(path.join(__dirname,'../..' + sealPath)).then((image) => {
        if(xxmc == '中央党校函授学院' || xxmc == '中共中央党校函授学院'){
          convasCtx.drawImage(image, 500, 735, 200, 200);
        }
        else{
          convasCtx.drawImage(image, 500, 720, 200, 200);
        }
      })

      if (xxmc == '湖南行政学院'){
        convasCtx.font = "17px bold SimSun";
        convasCtx.fillText(byzh, 570, 460);
        convasCtx.fillText(bgrq, 570, 490);

        convasCtx.font = "26px SimSun";
        convasCtx.fillText(xm, 180,580);
        convasCtx.fillText(end_year, 334, 580);
        convasCtx.fillText(zymc, 140, 635);
        convasCtx.fillText(byzh, 473, 685);
        if(zymc.length > 4  && zymc.length < 8){
          convasCtx.fillText(bj, 402, 635);
        }
        else if (zymc.length >= 8){
          convasCtx.fillText(bj, 507, 635);
        }
        else{
          convasCtx.fillText(bj, 318, 635);
        }
      }
      else if(xxmc == '中共湖南省委党校'){
        convasCtx.font = "17px bold SimSun";
        convasCtx.fillText(byzh, 570, 457);
        convasCtx.fillText(bgrq, 570, 486);

        convasCtx.font = "26px SimSun";
        convasCtx.fillText(xm, 180,575);
        convasCtx.fillText(end_year, 336, 574);
        convasCtx.fillText(zymc, 140, 625);

        if(zymc.length > 4  && zymc.length < 8){
          convasCtx.fillText(bj, 404, 625);
        }
        else if (zymc.length >= 8){
          convasCtx.fillText(bj, 507, 625);
        }
        else{
          convasCtx.fillText(bj, 318, 625);
        }
        convasCtx.fillText(byzh, 473, 677);
      }
      else{
        convasCtx.font = "17px bold SimSun";
        convasCtx.fillText(byzh, 570, 457);
        convasCtx.fillText(bgrq, 570, 486);

        convasCtx.font = "26px SimSun";
        convasCtx.fillText(xm, 180,575);
        convasCtx.fillText(end_year, 334, 574);
        convasCtx.fillText(zymc, 140, 625);

        if(zymc.length > 4  && zymc.length < 8){
          convasCtx.fillText(bj, 404, 625);
        }
        else if (zymc.length >= 8){
          convasCtx.fillText(bj, 507, 625);
        }
        else{
          convasCtx.fillText(bj, 318, 625);
        }
        convasCtx.fillText(byzh, 473, 677);
      }


    }
    else{
      await Canvas.loadImage(path.join(__dirname,'../../public/images/Postgraduate_Certificate@2x.png')).then((image) => {
        convasCtx.drawImage(image, 0, 0, 862, 1216)
      })

      await Canvas.loadImage(path.join(__dirname,'../../public/images/seal3@2x.png')).then((image) => {
        convasCtx.drawImage(image, 500, 800, 200, 200);
      })

      if (Pic != '' && Pic != null) {
        if(Pic.indexOf('pic') == -1){
          let headPath = path.join(__dirname,'../../public/images/postgraduateImages/' + Pic);

          if (fs.existsSync(headPath)) {
            await Canvas.loadImage(headPath).then((image) => {
              convasCtx.drawImage(image, 360, 450, 110, 145);
            })
          }

        }
      }

      convasCtx.font = "16px bold SimSun";
      convasCtx.fillText(byzh, 600, 523);
      convasCtx.fillText(bgrq, 600, 550);

      convasCtx.font = "21px SimSun";
      convasCtx.fillText(xm, 180, 632);
      convasCtx.fillText(xb, 333, 632);

      convasCtx.fillText(Sfzh, 486, 632);
      convasCtx.fillText(start_year, 138, 670);
      convasCtx.fillText(start_month, 220, 670);

      convasCtx.fillText(end_year, 310, 670);
      convasCtx.fillText(end_month,395, 670);

      convasCtx.fillText(zymc, 460, 670);
      convasCtx.fillText(Xh, 190, 710);
      convasCtx.fillText(xz, 362, 710);

      convasCtx.fillText(graduate_year, 500, 752);
      convasCtx.fillText(graduate_month, 595, 752);

      convasCtx.fillText(byzh, 425, 833);
    }

    ctx.set('Content-Type', 'image/png');
    ctx.body = canvas.createPNGStream();

  }
}

module.exports = CertificateController;
