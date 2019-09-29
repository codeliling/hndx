/* jshint indent: 2 */

module.exports = app => {

  const { INTEGER, STRING } = app.Sequelize;

  const Undergraduate = app.model.define('undergraduate', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    xm:{
      type: STRING,
      allowNull: false,
    },
    byzh: {
      type: STRING,
      allowNull: false,
    },
    bysj: {
      type: STRING,
      allowNull: false,
    },
    xxmc: {
      type: STRING,
      allowNull: false,
    },
    zymc: {
      type: STRING,
      allowNull: false,
    },
    bj: {
      type: STRING,
      allowNull: false,
    },
    bylb: {
      type: STRING,
      allowNull: false,
    },
    bz: {
      type: STRING,
      allowNull: true,
    },
    xxxs: {
      type: STRING,
      allowNull: false,
    },
    dh: {
      type: STRING,
      allowNull: false,
    },
    xsf: {
      type: STRING,
      allowNull: true,
    },

  }, {
    tableName: 'undergraduate'
  });


  Undergraduate.createUndergraduate = async function (production) {
    return this.create(production);
  }

  Undergraduate.updateUndergraduate = async function ({ id, updates }) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('undergraduate not found');
    }
    return production.update(updates);
  }

  Undergraduate.delUndergraduateById = async function (id) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('undergraduate not found');
    }
    return production.destroy();
  }

  Undergraduate.listUndergraduate = async function ({offset = 0, limit = 10}){
    let condition = {
      offset,
      limit,
      order: [[ 'Id', 'asc' ]],
      where:{

      }
    };

    return this.findAndCountAll(condition);
  }

  Undergraduate.listUndergraduateByCondition = async function ({offset = 0, limit = 10, type = 0, searchData = ''}){

    let condition = {
      offset,
      limit,
      order: [ [ 'Id', 'asc' ]],
      where:{

      }
    };

    if (type == 1){ //按学号
      condition.where.byzh = {
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

  Undergraduate.getDetailById = async function(id){
    return await this.findByPk(id);
  }


  return Undergraduate;
};