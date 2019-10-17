'use strict';

const Service = require('egg').Service;

class Undergraduate extends Service {

  async createUndergraduate(postgraduate){
    return await this.ctx.model.Undergraduate.createUndergraduate(postgraduate);
  }

  async updateUndergraduate({ id, updates }){
    return await this.ctx.model.Undergraduate.updateUndergraduate({ id, updates });
  }

  async listUndergraduate({ offset = 0, limit = 10}) {
    let resultObj = await this.ctx.model.Undergraduate.listUndergraduate({
      offset,
      limit,
    });

    return resultObj;
  }

  async delUndergraduateById(id){
    return await this.ctx.model.Undergraduate.delUndergraduateById(id);
  }

  async listUndergraduateByCondition({offset = 0, limit = 10, type = 0, searchData = ''}){
    return await this.ctx.model.Undergraduate.listUndergraduateByCondition({
      offset,
      limit,
      type,
      searchData,
    });
  }

  async getDetailById(id){
    return await this.ctx.model.Undergraduate.getDetailById(id);
  }

  async getDetailByNumber(number){
      return await this.ctx.model.Undergraduate.getDetailByNumber(number);
  }

  async bulkCreateUndergraduate(undergraduateList){
    return await this.ctx.model.Undergraduate.bulkCreateUndergraduate(undergraduateList);
  }

  async searchUndergraduateByCondition(query){
    let transaction;
      try {
        transaction = await this.ctx.model.transaction();
        let statisticsObj = {
          type:1,
          condition: query.number+'|'+query.username
        }
        await this.ctx.model.Statistics.createStatistics(statisticsObj,transaction);
        let data = await this.ctx.model.Undergraduate.searchUndergraduateByCondition(query,transaction);
        await transaction.commit();
        return data;
    } catch (e) {
      this.ctx.logger.error(e);
      await transaction.rollback();
      return false
    }

  }

  async countData(){
      return await this.ctx.model.Undergraduate.countData();
  }
}

module.exports = Undergraduate;
