/* jshint indent: 2 */

let moment = require('moment');

module.exports = app => {

  const { INTEGER, STRING } = app.Sequelize;

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


  Statistics.createStatistics = async function (statistics) {
    return this.create(statistics);
  }

  Statistics.queryGroupByType = async function (time,type){
    let sql = "";
    if (time = 1){ //年
      sql = `SELECT
              	DATE_FORMAT( createAt, '%Y' ) as time,
              	COUNT( Id) as count
              FROM
              	statistics
              WHERE
                type = ${'type'}
              GROUP BY
              	time
              ORDER BY
        	   time`;

    }
    else if {time = 2}{ //月
      sql = `SELECT
              	DATE_FORMAT( createAt, '%Y-%m' ) as time,
              	COUNT( Id) as count
              FROM
              	statistics
              WHERE
                type = ${'type'}
              GROUP BY
              	time
              ORDER BY
        	   time`;
    } //日
    else{
      sql = `SELECT
              	DATE_FORMAT( createAt, '%Y-%m-%d' ) as time,
              	COUNT( Id) as count
              FROM
              	statistics
              WHERE
                type = ${'type'}
              GROUP BY
              	time
              ORDER BY
        	   time`;
    }
    return this.query(sql);
  }

  return Statistics;
};
