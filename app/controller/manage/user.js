const BaseController = require('../BaseController');

class UserController extends BaseController{
  async create() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;

        const user = await ctx.service.user.createUser(data);
        super.success('创建成功!');

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = UserController;
