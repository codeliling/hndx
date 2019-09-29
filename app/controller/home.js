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
