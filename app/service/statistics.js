'use strict';

const Service = require('egg').Service;

class Statistics extends Service {

  async createStatistics(statistics){
    return await this.ctx.model.Statistics.createStatistics(statistics);
  }

  async queryGroupByDay(type, startDate){
    let endDate = this.ctx.helper.getCurrentMonthLast(startDate);
    startDate = startDate + '-01';
    return await this.ctx.model.Statistics.queryGroupByDay(this.ctx, type, startDate, endDate);
  }

  async queryGroupByMonth(type, year){
    return await this.ctx.model.Statistics.queryGroupByMonth(this.ctx, type, year);
  }

  async countStatisticsData(){
     let searchCount = await this.ctx.model.Statistics.countByType(1);
     let downLoadCount = await this.ctx.model.Statistics.countByType(2);
     return {
       searchCount:searchCount,
       downLoadCount:downLoadCount
     };
  }

  async countGraduateData(){
     let undergraduateCount = await this.ctx.model.Undergraduate.countData();
     let postgraduateCount = await this.ctx.model.Postgraduate.countData();
     return {
       undergraduateCount:undergraduateCount,
       postgraduateCount:postgraduateCount
     };
  }
}

module.exports = Statistics;
