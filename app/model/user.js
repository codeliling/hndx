/* jshint indent: 2 */

module.exports = app => {

  const {
    STRING,
    INTEGER
  } = app.Sequelize;

  const User = app.model.define('user', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(30),
      allowNull: true
    },
    password: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    }

  }, {
    tableName: 'user'
  });


  User.createUser = async function(user) {
    return this.create(user);
  }

  User.updateUser = async function({
    id,
    updates
  }) {
    const user = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.update(updates);
  }

  User.delUserById = async function(id, transaction) {
    const user = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.destroy({
      transaction: transaction
    });
  }

  User.loginFindUserByUserName = async function(username) {
    return await this.findOne({
      where: {
        username: username
      },
      attributes: ['Id', 'username', 'password']
    });
  }


  User.updatePwd = async function(userId, newPwd) {
    return await this.update({
      password: newPwd,
    }, {
      where: {
        Id: userId
      }
    });
  }

  return User;
};
