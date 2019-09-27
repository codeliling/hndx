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
      type: INTEGER,
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
      type: INTEGER, ////1.已提交、2.审核未通过、3.审核已通过、4.初选入围、5.初选未入围、6.复选入围、7复选未入围
      allowNull: true,
    },
    xxxs: {
      type: INTEGER,
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
      throw new Error('production not found');
    }
    return production.update(updates);
  }

  Undergraduate.delUndergraduateById = async function (id) {
    const production = await this.findById(id);
    if (!production) {
      throw new Error('production not found');
    }
    return production.destroy();
  }

  Undergraduate.listUndergraduate = async function ({offset = 0, limit = 10}){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{

      }
    };

    return this.findAndCountAll(condition);
  }

  Undergraduate.listUndergraduateByCondition = async function ({offset = 0, limit = 10, type = 0, searchData = ''}){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        userId:userId
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

  Production.getDetailById = async function(id){
    return await this.findByPk(id);
  }


  return Undergraduate;
};
