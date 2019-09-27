'use strict';

const Service = require('egg').Service;

class Postgraduate extends Service {

  async createPostgraduate(postgraduate){
    return await this.ctx.model.Postgraduate.createPostgraduate(postgraduate);
  }

  async updatePostgraduate({ id, updates }){
    return await this.ctx.model.Postgraduate.updatePostgraduate({ id, updates });
  }

  async listPostgraduate({ offset = 0, limit = 10}) {
    let resultObj = await this.ctx.model.Postgraduate.listPostgraduate({
      offset,
      limit,
    });

    return resultObj;
  }

  async delPostgraduateById(id){
    return await this.ctx.model.Postgraduate.delPostgraduateById(id);
  }

  async listPostgraduateByCondition({offset = 0, limit = 10, type = 0, searchData = ''}){
    return await this.ctx.model.Postgraduate.listPostgraduateByCondition({
      offset,
      limit,
      type,
      searchData,
    });
  }

  async getDetailById(id){
    return await this.ctx.model.Postgraduate.getDetailById(id);
  }
}

module.exports = Postgraduate;
