/* jshint indent: 2 */

module.exports = app => {

  const { INTEGER, STRING } = app.Sequelize;

  const Postgraduate = app.model.define('postgraduate', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    Byzh:{
      type: STRING,
      allowNull: false,
    },
    Pic: {
      type: STRING,
      allowNull: false,
    },
    Xm: {
      type: STRING,
      allowNull: false,
    },
    Sfzh: {
      type: STRING,
      allowNull: false,
    },
    Xb: {
      type: STRING,
      allowNull: false,
    },
    Rxsj: {
      type: STRING,
      allowNull: false,
    },
    Xh: {
      type: STRING,
      allowNull: false,
    },
    Dh: {
      type: STRING,
      allowNull: true,
    },
    Zymc: {
      type: STRING,
      allowNull: false,
    },
    Xsf: {
      type: STRING,
      allowNull: false,
    },

  }, {
    tableName: 'postgraduate'
  });


  Postgraduate.createPostgraduate = async function (postgraduate) {
    return this.create(postgraduate);
  }

  Postgraduate.updatePostgraduate = async function ({ id, updates }) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('production not found');
    }
    return production.update(updates);
  }

  Postgraduate.delPostgraduateById = async function (id) {
    const postgraduate = await this.findById(id);
    if (!postgraduate) {
      throw new Error('postgraduate not found');
    }
    return postgraduate.destroy();
  }

  Postgraduate.listPostgraduate = async function ({offset = 0, limit = 10}){
    let condition = {
      offset,
      limit,
      order: [[ 'Id', 'asc' ]],
      where:{

      }
    };

    return this.findAndCountAll(condition);
  }

  Postgraduate.listPostgraduateByCondition = async function ({offset = 0, limit = 10, type = 0, searchData = ''}){
    let condition = {
      offset,
      limit,
      order: [ [ 'Id', 'asc' ]],
      where:{

      }
    };

    if (type == 1){ //按学号
      condition.where.Xh = {
        [app.Sequelize.Op.like]: '%'+searchData+'%',
      };
    }
    else if (type == 2){ //按姓名
      condition.where.xm = {
        [app.Sequelize.Op.like]: '%'+searchData+'%',
      };
    }

    return this.findAndCountAll(condition);
  }

  Postgraduate.getDetailById = async function(id){
    return await this.findByPk(id);
  }


  return Postgraduate;
};
