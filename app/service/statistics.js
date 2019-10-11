'use strict';

const Service = require('egg').Service;

class Statistics extends Service {

  async createStatistics(statistics){
    return await this.ctx.model.Statistics.createStatistics(statistics);
  }

  async queryGroupByDay(type, startDate, endDate){
    return await this.ctx.model.Statistics.queryGroupByDay(this.ctx, type, startDate, endDate);
  }

  async queryGroupByMonth(type, year){
    return await this.ctx.model.Statistics.queryGroupByMonth(this.ctx, type, year);
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
