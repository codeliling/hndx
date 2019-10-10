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
    return this.create(statistics,{
      transaction:transaction,
    });
  }

  Statistics.countByType = async function(type){
    return this.count({
      where:{
        type:type
      }
    });
  }

  Statistics.queryGroupByDay = async function(type, startDate, endDate){
    let sql = `SELECT
              DATE_FORMAT( createAt, '%Y-%m-%d' ) as time,
              COUNT( Id) as count
            FROM
              statistics
            WHERE
              type = ${'type'},
              and createAt >= ${'startDate'} and createAt <= ${'endDate'}
            GROUP BY
              time
            ORDER BY
           time`;
    return this.query(sql);
  }

  Statistics.queryGroupByMonth = async function (type,year){

    let sql = "";
    sql = `SELECT
              	DATE_FORMAT( createAt, '%Y-%m' ) as time,
              	COUNT( Id) as count
              FROM
              	statistics
              WHERE
                type = ${'type'}
                and DATE_FORMAT(createAt,'%Y') = ${'year'}
              GROUP BY
              	time
              ORDER BY
        	   time`;

    return this.query(sql);
  }

  return Statistics;
};
