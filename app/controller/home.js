'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async manageLogin(){
    const ctx = this.ctx;
    await ctx.render('manage/login.html');
  }

  async manageIndex(){
    const ctx = this.ctx;
    await ctx.render('manage/index.html');
  }
}

module.exports = HomeController;
