'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const adminAuthCheck = app.middleware.adminAuthCheck();
  const pageAuthCheck = app.middleware.pageAuthCheck();

  router.get('/', controller.home.index);
  router.get('/public', controller.home.index);
  router.get('/public/result', controller.home.result);
  router.get('/public/noResult', controller.home.noResult);

  router.get('/public/manageLogin',controller.home.manageLogin);
  router.get('/login',controller.home.manageLogin);
  router.get('/public/relogin',controller.home.relogin);
  router.get('/public/manageIndex', pageAuthCheck, controller.home.manageIndex);
  router.get('/public/manageLogout',controller.home.manageLogout);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/public/manageIndex',successFlash: true,
       failureRedirect: '/public/relogin',failureFlash: true }));

  router.get('/public/website/postgraduate/searchPostgraduateByCondition', controller.website.postgraduate.searchPostgraduateByCondition);
  router.get('/public/website/undergraduate/searchUndergraduateByCondition', controller.website.undergraduate.searchUndergraduateByCondition);

  router.get('/public/website/postgraduate/getDetailByNumber', controller.website.postgraduate.getDetailByNumber);
  router.get('/public/website/undergraduate/getDetailByNumber', controller.website.undergraduate.getDetailByNumber);

  router.get('/public/manage/statistics/getCountStatisticsData', adminAuthCheck, controller.manage.statistics.getCountStatisticsData);
  router.get('/public/manage/statistics/countGraduateData', adminAuthCheck, controller.manage.statistics.countGraduateData);
  router.get('/public/manage/statistics/queryGroupByDay', adminAuthCheck, controller.manage.statistics.queryGroupByDay);
  router.get('/public/manage/statistics/queryGroupByMonth', adminAuthCheck, controller.manage.statistics.queryGroupByMonth);
  router.post('/public/manage/statistics/createStatistics', controller.manage.statistics.createStatistics);
  router.get('/public/manage/statistics/queryByPage', adminAuthCheck, controller.manage.statistics.queryByPage);

  router.get('/public/manage/postgraduate/listPostgraduateByCondition', controller.manage.postgraduate.listPostgraduateByCondition);
  router.get('/public/manage/undergraduate/listUndergraduateByCondition', controller.manage.undergraduate.listUndergraduateByCondition);

  router.get('/public/getCaptcha',controller.website.webutils.getCaptcha);
  router.get('/public/checkCaptcha',controller.website.webutils.checkCaptcha);

  router.get('/public/manageUndergraduate', pageAuthCheck, controller.home.manageUndergraduate);
  router.get('/public/managePostgraduate', pageAuthCheck, controller.home.managePostgraduate);
  router.get('/public/manageAddPostgraduate', pageAuthCheck, controller.home.manageAddPostgraduate);
  router.get('/public/manageAddUndergraduate', pageAuthCheck, controller.home.manageAddUndergraduate);
  router.get('/public/importInfo', pageAuthCheck, controller.home.manageImportInfo);
  router.get('/public/statistics', pageAuthCheck, controller.home.manageStatistics);
  router.get('/public/searchStatistics', pageAuthCheck, controller.home.manageSearchStatistics);

  router.post('/public/manage/file/uploadExcelFile/:fileType',  adminAuthCheck, controller.manage.file.uploadExcelFile);
  router.post('/public/manage/file/uploadImagesFile/:fileType',  adminAuthCheck, controller.manage.file.uploadImagesFile);

  router.resources('/public/manage/postgraduate', adminAuthCheck, controller.manage.postgraduate);
  router.resources('/public/manage/undergraduate', adminAuthCheck,  controller.manage.undergraduate);
  router.resources('/public/manage/user', adminAuthCheck, controller.manage.user);

  router.resources('/public/website/postgraduate',  controller.website.postgraduate);
  router.resources('/public/website/undergraduate',  controller.website.undergraduate);
};
