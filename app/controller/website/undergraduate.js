const BaseController = require('../BaseController');

class UndergraduateController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.undergraduate.listUndergraduate(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.undergraduate.getDetailById(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }


  async listUndergraduateByCondition() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      type: ctx.helper.parseInt(ctx.query.type),
      searchData:ctx.query.searchData,
    };
    
    try{
      const result = await ctx.service.undergraduate.listUndergraduateByCondition(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = UndergraduateController;
