'use strict';

const Service = require('egg').Service;

class Undergraduate extends Service {

  async createUndergraduate(postgraduate){
    return await this.ctx.model.Postgraduate.createUndergraduate(postgraduate);
  }

  async updateUndergraduate({ id, updates }){
    return await this.ctx.model.Postgraduate.updateUndergraduate({ id, updates });
  }

  async listUndergraduate({ offset = 0, limit = 10}) {
    let resultObj = await this.ctx.model.Postgraduate.listUndergraduate({
      offset,
      limit,
    });

    return resultObj;
  }

  async delUndergraduateById(id){
    return await this.ctx.model.Postgraduate.delUndergraduateById(id);
  }

  async listUndergraduateByCondition({offset = 0, limit = 10, type = 0, searchData = ''}){
    return await this.ctx.model.Postgraduate.listUndergraduateByCondition({
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

module.exports = Undergraduate;
