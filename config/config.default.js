/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568687955096_7465';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.3.110',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'xueli_data',
    logging:true,
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,

    },
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
  };

  config.security = {
    csrf:{
      enable:false,
      ignoreJSON:true
    },
    domainWhiteList:[]
  };

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../app/public/images/favicon.png')),
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  config.assets = {
    publicPath: '/public/',
  };

  config.onerror = {
    // 线上页面发生异常时，重定向到这个页面上
    errorPageUrl: '/50x.html',
  };

  config.notfound= {
    pageUrl: '/404',
  };

  config.logger = {
    dir: 'D:\logs',
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };

  config.customLogger = {
    elasticLogger:{
      file: path.join(appInfo.root,'logs/transfer.log'),
    },
    aliossLogger:{
      file: path.join(appInfo.root,'logs/alioss.log'),
    },
  };

  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.xls', '.xlsx'], // 扩展几种上传的文件格式
  };

  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, '-web.log'),
      path.join(appInfo.root, 'logs', appInfo.name, 'egg-web.log'),
    ],
    maxFileSize: 0.3 * 1024 * 1024 * 1024,
  };

  return {
    ...config,
    ...userConfig,
  };
};
