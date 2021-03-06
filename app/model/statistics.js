/* jshint indent: 2 */

let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Statistics = app.model.define('statistics', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    type:{
      type: INTEGER,
      allowNull: false,
    },
    condition:{
      type: STRING,
      allowNull: false,
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },

  }, {
    tableName: 'statistics'
  });


  Statistics.createStatistics = async function (statistics,transaction) {
    return await this.create(statistics,{
      transaction:transaction,
    });
  }

  Statistics.countByType = async function(type){
    return await this.count({
      where:{
        type:type
      }
    });
  }

  Statistics.listData = async function ({offset = 0, limit = 10}){
    let condition = {
      offset,
      limit,
      order: [[ 'Id', 'desc' ]],
      where:{

      }
    };

    return await this.findAndCountAll(condition);
  }

  Statistics.queryGroupByDay = async function(ctx,type, startDate, endDate){
    let sql = `SELECT
              DATE_FORMAT( createAt, '%Y-%m-%d' ) as time,
              COUNT( Id) as count
            FROM
              statistics
            WHERE
              type = ${type}
              and createAt >= '${startDate}' and createAt <= '${endDate}'
            GROUP BY
              time
            ORDER BY
           time`;
    return await ctx.model.query(sql, {type: 'SELECT'});
  }

  Statistics.queryGroupByMonth = async function (ctx,type,year){

    let sql = "";
    sql = `SELECT
              	DATE_FORMAT( createAt, '%Y-%m' ) as time,
              	COUNT( Id) as count
              FROM
              	statistics
              WHERE
                type = ${type}
                and DATE_FORMAT(createAt,'%Y') = '${year}'
              GROUP BY
              	time
              ORDER BY
        	   time`;
    return await ctx.model.query(sql, {type: 'SELECT'});
  }

  return Statistics;
};
