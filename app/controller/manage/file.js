'use strict';

const BaseController = require('../BaseController');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Excel = require('exceljs');

class FileController extends BaseController {

    async uploadFile() {
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
            if(worksheet.rowCount > 1){
              countRecord = worksheet.rowCount - 1;
              if(fileType == 1){
                worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                  if (rowNumber != 1){
                    let postgraduate = {
                      Byzh : row.getCell(1).value,
                      Pic : row.getCell(2).value,
                      Xm : row.getCell(3).value,
                      Sfzh : row.getCell(4).value,
                      Xb : row.getCell(5).value,
                      Rxsj : row.getCell(6).value,
                      Xh : row.getCell(7).value,
                      Dh : row.getCell(8).value,
                      Zymc : row.getCell(9).value,
                      Xsf : row.getCell(10).value,
                    };
                    postgraduateList.push(postgraduate);
                  }
                });
              }
              else{
                worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                  if (rowNumber != 1){
                    let undergraduate = {
                      xm : row.getCell(1).value,
                      byzh : row.getCell(2).value,
                      bysj : row.getCell(3).value,
                      xxmc : row.getCell(4).value,
                      zymc : row.getCell(5).value,
                      bj : row.getCell(6).value,
                      bylb : row.getCell(7).value,
                      bz : row.getCell(8).value,
                      xxxs : row.getCell(9).value,
                      dh : row.getCell(10).value,
                      xsf : row.getCell(11).value,
                    };
                    undergraduateList.push(undergraduate);
                  }
                });
              }
            }
          });
          if(fileType == 1){
            try{
              const result = await ctx.service.postgraduate.bulkCreatePostgraduate(postgraduateList);
              super.success(result);
            }
            catch(e){
              ctx.logger.error(e.message);
              super.failure(e.message);
            }
          }
          else{
            try{
              const result = await ctx.service.undergraduate.bulkCreateUndergraduate(undergraduateList);
              super.success(result);
            }
            catch(e){
              ctx.logger.error(e.message);
              super.failure(e.message);
            }
          }
          result.countRecord = countRecord;
        } catch (err) {
            //如果出现错误，关闭管道
          ctx.logger.error(err.message);
          await sendToWormhole(stream);
          result.status = 500;
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
}

module.exports = FileController;
