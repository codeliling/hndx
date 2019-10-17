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

  async getDetailByNumber(number){
      return await this.ctx.model.Postgraduate.getDetailByNumber(number);
  }

  async bulkCreatePostgraduate(postgraduateList){
    return await this.ctx.model.Postgraduate.bulkCreatePostgraduate(postgraduateList);
  }

  async searchPostgraduateByCondition(query){
    let transaction;
      try {
        transaction = await this.ctx.model.transaction();
        let statisticsObj = {
          type:1,
          condition: query.number+'|'+query.username
        }
        await this.ctx.model.Statistics.createStatistics(statisticsObj,transaction);
        let data = await this.ctx.model.Postgraduate.searchPostgraduateByCondition(query,transaction);
        await transaction.commit();
        return data;
    } catch (e) {
      this.ctx.logger.error(e);
      await transaction.rollback();
      return false
    }
  }

  async countData(){
    return await this.ctx.model.Postgraduate.countData();
  }
}

module.exports = Postgraduate;
