const BaseController = require('../BaseController');

class StatisticsController extends BaseController {

  async createStatistics() {
    const ctx = this.ctx;
    const statistics = {
      type: ctx.request.body.type,
      condition:ctx.request.body.xm + '|' + ctx.request.body.zsbh,
    };

    try {
      const result = await ctx.service.statistics.createStatistics(statistics);
      super.success(result);
    } catch (e) {
      console.log()
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async queryGroupByDay() {
    const ctx = this.ctx;

    let type = ctx.helper.parseInt(ctx.query.type);
    let startDate = ctx.query.startDate;

    try {
      const result = await ctx.service.statistics.queryGroupByDay(type, startDate);
      super.success(result);
    } catch (e) {
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async queryGroupByMonth() {
    const ctx = this.ctx;

    let type = ctx.helper.parseInt(ctx.query.type);
    let year = ctx.query.year;

    try {
      const result = await ctx.service.statistics.queryGroupByMonth(type, year);
      super.success(result);
    } catch (e) {
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async getCountStatisticsData() {
    const ctx = this.ctx;
    try {
      const result = await ctx.service.statistics.countStatisticsData();
      super.success(result);
    } catch (e) {
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async countGraduateData() {
    const ctx = this.ctx;
    try {
      const result = await ctx.service.statistics.countGraduateData();
      super.success(result);
    } catch (e) {
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = StatisticsController;
