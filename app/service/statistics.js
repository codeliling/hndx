'use strict';

const Service = require('egg').Service;

class Statistics extends Service {

  async createStatistics(statistics){
    return await this.ctx.model.Statistics.createStatistics(statistics);
  }

  async queryGroupByType(time, type){
    return await this.ctx.model.Statistics.queryGroupByType(time, type);
  }


}

module.exports = Statistics;
