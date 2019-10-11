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
    let endDate = ctx.query.endDate;

    try {
      const result = await ctx.service.statistics.queryGroupByDay(type, startDate, endDate);
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

  async getCountData() {
    const ctx = this.ctx;
    try {
      const result = await ctx.service.statistics.countData();
      super.success(result);
    } catch (e) {
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = StatisticsController;
