const BaseController = require('../BaseController');

class PostgraduateController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.postgraduate.listPostgraduate(query);
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
      const result = await ctx.service.postgraduate.getDetailById(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;

        const user = await ctx.service.postgraduate.createPostgraduate(data);
        super.success('创建成功!');

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = ctx.request.body;

    try{
      await ctx.service.postgraduate.updatePostgraduate({ id, updates });
      super.success('更新成功!');
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.postgraduate.delPostgraduateById(id);
      super.success('删除成功!');
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listPostgraduateByCondition() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      type: ctx.helper.parseInt(ctx.query.type),
      searchData:ctx.query.searchData,
    };

    try{
      const result = await ctx.service.postgraduate.listPostgraduateByCondition(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = PostgraduateController;
