'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }

  async result() {
    const { ctx } = this;
    await ctx.render('result.html');
  }

  async noResult() {
    const { ctx } = this;
    await ctx.render('noResult.html');
  }

  async manageLogin(){
    const ctx = this.ctx;
    await ctx.render('manage/login.html');
  }

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('anage/login.html', {
      message:'用户名或者密码错误!'
    });
  }

  async manageUndergraduate(){
    const ctx = this.ctx;
    await ctx.render('manage/undergraduate.html');
  }

  async managePostgraduate(){
    const ctx = this.ctx;
    await ctx.render('manage/postgraduate.html');
  }

  async manageAddPostgraduate(){
    const ctx = this.ctx;
    await ctx.render('manage/addPostgraduate.html');
  }

  async manageAddUndergraduate(){
    const ctx = this.ctx;
    await ctx.render('manage/addUndergraduate.html');
  }

  async manageImportInfo(){
    const ctx = this.ctx;
    await ctx.render('manage/importInfo.html');
  }

  async manageStatistics(){
    const ctx = this.ctx;
    await ctx.render('manage/statistics.html');
  }

}

module.exports = HomeController;
