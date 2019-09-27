'use strict';

const BaseController = require('../BaseController');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

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
