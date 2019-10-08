'use strict';

const Service = require('egg').Service;

class User extends Service {

  async createUser(user) {
    const createUserObj = await this.ctx.model.User.createUser(user);
    return createUserObj;
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.User.updateUser({
      id,
      updates
    });
  }

  async del(id) {
    return  await this.ctx.model.User.delUserById(id, transaction);
  }

  async loginFindUserByUserName(username) {
    let user = await this.ctx.model.User.loginFindUserByUserName(username);

    return user;
  }

  async updatePwd(userId, newPwd) {
    try {
      await this.ctx.model.User.updatePwd(userId, newPwd);
      return true;
    } catch (e) {
      this.ctx.logger.error(e.message);
      return false;
    }
  }

}

module.exports = User;
