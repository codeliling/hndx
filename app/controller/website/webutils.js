const BaseController = require('../BaseController');
const Captcha = require('svg-captcha');

class WebutilsController extends BaseController{

  async getCaptcha(){
    let codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0oO1ilLI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 14
    }
    var captcha = Captcha.create(codeConfig);
    this.ctx.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    this.ctx.response.type='svg';
    this.ctx.body = captcha.data;
  }

  async checkCaptcha(){
    const captchaText = this.ctx.query.captchaText;
    if (captchaText.toLowerCase() == this.ctx.session.captcha){
      super.success('校验成功!');
    }
    else{
      super.failure('校验失败!');
    }
  }
}

module.exports = WebutilsController;
