const BaseController = require('../BaseController');

class UndergraduateController extends BaseController{

  async searchUndergraduateByCondition() {
    const ctx = this.ctx;

    let captchaText = ctx.query.vertifyCode;
    if (captchaText.toLowerCase() != this.ctx.session.captcha){
      super.failure('验证码错误!');
    }
    else{
      const query = {
        number: ctx.query.number,
        username : ctx.query.username,
      };

      try{
        const result = await ctx.service.postgraduate.searchUndergraduateByCondition(query);
        super.success(result);
      }
      catch(e){
        ctx.logger.error(e.message);
        super.failure(e.message);
      }
    }

  }
}

module.exports = UndergraduateController;
