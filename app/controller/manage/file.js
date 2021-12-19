'use strict';

const BaseController = require('../BaseController');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Excel = require('exceljs');

class FileController extends BaseController {

    async uploadExcelFile() {
        const ctx = this.ctx;
        let fileType = ctx.params.fileType;
        let fileTagget = '';

        if(!fs.existsSync(ctx.helper.basePath)){
          fs.mkdirSync(ctx.helper.basePath);
        }

        if (fileType == 1){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.postgraduatePath);
        }
        else if (fileType == 2){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.undergraduatePath);
        }

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        let result = {
          status:200
        };

        const stream = await ctx.getFileStream();

        try {

          const filename = ctx.helper.randomString(8) + path.extname(stream.filename);

          const target = path.join(fileTagget, filename);
          const writeStream = fs.createWriteStream(target);
          await awaitWriteStream(stream.pipe(writeStream));

          let postgraduateList = [];
          let undergraduateList = [];

          let countRecord = 0;
          var workbook = new Excel.Workbook();
          await workbook.xlsx.readFile(target)
          .then(function() {
            var worksheet = workbook.getWorksheet(1);
            console.log(worksheet);
            console.log(worksheet.rowCount);
            if(worksheet.rowCount > 1){

              if(fileType == 1){
                worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                  if (rowNumber != 1){
                    let postgraduate = {
                      Byzh : row.getCell(1).value,
                      Pic : row.getCell(2).value,
                      Xm : row.getCell(3).value,
                      Sfzh : row.getCell(4).value,
                      Xb : row.getCell(5).value,
                      Xh : row.getCell(6).value,
                      Dh : row.getCell(7).value,
                      Xsf : row.getCell(8).value,
                      Bysj : row.getCell(9).value,
                    };

                    if(postgraduate.Xm != null && postgraduate.Xm != ''){
                      postgraduate.Xm = postgraduate.Xm.replace(/\s*/g,"");
                    }

                    if(postgraduate.Xh != null && postgraduate.Xh != ''){
                      let year = (postgraduate.Xh).toString().slice(0,2);
                      postgraduate.Rxsj = '20'+year+'-'+'09';
                    }

                    if(postgraduate.Dh != null && postgraduate.Dh != ''){
                      let zydm = postgraduate.Dh.slice(8,10);

                      if(zydm == '02'){
                        postgraduate.Zymc = '经济管理';
                      }
                      else if (zydm == '06'){
                        postgraduate.Zymc = '公共管理';
                      }
                      else if (zydm == '04'){
                        postgraduate.Zymc = '法学理论';
                      }
                      else if (zydm == '01'){
                        postgraduate.Zymc = '政治与行政管理';
                      }
                      else if (zydm == '08'){
                        postgraduate.Zymc = '行政法学';
                      }
                      else if (zydm == '0w'){
                        postgraduate.Zymc = '文化建设与管理';
                      }
                    }

                    if(postgraduate.Xb == '' || postgraduate.Xb == null){
                      if(postgraduate.Sfzh != null && postgraduate.Sfzh != '' && postgraduate.Sfzh.length == 18){
                        let num = postgraduate.Sfzh.charAt(16);
                        if(num % 2 == 0){
                          postgraduate.Xb = '女';
                        }
                        else{
                          postgraduate.Xb = '男';
                        }
                      }
                    }

                    if(postgraduate.Xm != '' && postgraduate.Xm != null){
                      postgraduateList.push(postgraduate);
                    }
                  }
                });
                countRecord = postgraduateList.length;
              }
              else{
                worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                  if (rowNumber != 1){
                    let undergraduate = {
                      xm : row.getCell(1).value,
                      byzh : row.getCell(2).value,
                      rxsj : row.getCell(3).value,
                      bysj : row.getCell(4).value,
                      xxmc : row.getCell(5).value,
                      zymc : row.getCell(6).value,
                      bj : row.getCell(7).value,
                      bylb : row.getCell(8).value,
                      bz : row.getCell(9).value,
                      xxxs : row.getCell(10).value,
                      dh : row.getCell(11).value,
                      xsf : row.getCell(12).value,
                    };
                    if(undergraduate.xm != '' && undergraduate.xm != null){
                      undergraduateList.push(undergraduate);
                    }

                  }
                });
                countRecord = undergraduateList.length;
              }
            }
          });
          if(fileType == 1){
            try{
              await ctx.service.postgraduate.bulkCreatePostgraduate(postgraduateList);
            }
            catch(e){
              countRecord = 0;
              result.status = 500;
              ctx.logger.error(e.message);
              result.message = e.message;
            }
          }
          else{
            try{
              await ctx.service.undergraduate.bulkCreateUndergraduate(undergraduateList);
            }
            catch(e){
              countRecord = 0;
              result.status = 500;
              ctx.logger.error(e.message);
              result.message = e.message;
            }
          }
          result.countRecord = countRecord;
        } catch (err) {
            //如果出现错误，关闭管道
          ctx.logger.error(err.message);
          await sendToWormhole(stream);
          result.status = 500;
          result.message = err.message;
        }
        //文件响应
        ctx.body = result;
    }

    async deleteFile(){
      const ctx = this.ctx;
      const fileType = ctx.params.fileType;
      let userId = ctx.user.Id;

      let dir = '';
      if (fileType == 1){
        dir = ctx.helper.postgraduatePath;
      }
      else if (fileType == 2){
        dir = ctx.helper.undergraduatePath;
      }

      try{
        let filePath = path.join(ctx.helper.basePath, dir, ctx.query.filename);
        if(fs.existsSync(filePath)){
          fs.unlinkSync(filePath);
        }
        super.success('删除成功!');
      }
      catch(e){
        super.failure(e);
      }

    }

    async uploadImagesFile() {
        const ctx = this.ctx;
        let fileType = ctx.params.fileType;
        let fileTagget = '';

        if(!fs.existsSync(ctx.helper.imagesBasePath)){
          fs.mkdirSync(ctx.helper.imagesBasePath);
        }

        if (fileType == 1){
          fileTagget = path.join(ctx.helper.imagesBasePath, ctx.helper.postgraduateImagesPath);
        }
        else if (fileType == 2){
          fileTagget = path.join(ctx.helper.imagesBasePath, ctx.helper.undergraduateImagesPath);
        }

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        let result = {
          status:200
        };

        const stream = await ctx.getFileStream();

        try {

          const filename = ctx.helper.randomString(8) + path.extname(stream.filename);

          const target = path.join(fileTagget, filename);
          const writeStream = fs.createWriteStream(target);
          await awaitWriteStream(stream.pipe(writeStream));
          if(fileType == 1){
            result.imagePath = ctx.helper.imagesBaseUrl + ctx.helper.postgraduateImagesPath + filename;
          }
          else{
            result.imagePath = ctx.helper.imagesBaseUrl + ctx.helper.undergraduateImagesPath + filename;
          }
          result.filename = filename;
        } catch (err) {
            //如果出现错误，关闭管道
          ctx.logger.error(err.message);
          await sendToWormhole(stream);
          result.status = 500;
          result.message = err.message;
        }
        //文件响应
        ctx.body = result;
    }
}

module.exports = FileController;
