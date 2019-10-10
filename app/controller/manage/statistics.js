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

  async queryGroupByType() {
    const ctx = this.ctx;
    let time = ctx.helper.parseInt(ctx.query.time);
    let type = ctx.helper.parseInt(ctx.query.type);

    try {
      const result = await ctx.service.statistics.queryGroupByType(time, type);
      super.success(result);
    } catch (e) {
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
