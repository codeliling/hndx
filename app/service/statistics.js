'use strict';

const Service = require('egg').Service;

class Statistics extends Service {

  async createStatistics(statistics){
    return await this.ctx.model.Statistics.createStatistics(statistics);
  }

  async queryGroupByType(time, type){
    return await this.ctx.model.Statistics.queryGroupByType(time, type);
  }

  async countData(){
     let undergraduateCount = await this.ctx.model.Statistics.countByType(1);
     let postgraduateCount = await this.ctx.model.Statistics.countByType(2);
     return {
       undergraduateCount:undergraduateCount,
       postgraduateCount:postgraduateCount
     };
  }
}

module.exports = Statistics;
