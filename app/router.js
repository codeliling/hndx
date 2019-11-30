'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const adminAuthCheck = app.middleware.adminAuthCheck();
  const pageAuthCheck = app.middleware.pageAuthCheck();

  router.get('/', controller.home.index);
  router.get('/result', controller.home.result);
  router.get('/serverResult', controller.home.serverResult);
  router.get('/noResult', controller.home.noResult);

  router.get('/manageLogin',controller.home.manageLogin);
  router.get('/login',controller.home.manageLogin);
  router.get('/relogin',controller.home.relogin);
  router.get('/manageIndex', pageAuthCheck, controller.home.manageIndex);
  router.get('/manageLogout',controller.home.manageLogout);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/manageIndex',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));

  router.get('/website/postgraduate/searchPostgraduateByCondition', controller.website.postgraduate.searchPostgraduateByCondition);
  router.get('/website/undergraduate/searchUndergraduateByCondition', controller.website.undergraduate.searchUndergraduateByCondition);

  router.get('/website/postgraduate/getDetailByNumber', controller.website.postgraduate.getDetailByNumber);
  router.get('/website/undergraduate/getDetailByNumber', controller.website.undergraduate.getDetailByNumber);

  router.get('/manage/statistics/getCountStatisticsData', adminAuthCheck, controller.manage.statistics.getCountStatisticsData);
  router.get('/manage/statistics/countGraduateData', adminAuthCheck, controller.manage.statistics.countGraduateData);
  router.get('/manage/statistics/queryGroupByDay', adminAuthCheck, controller.manage.statistics.queryGroupByDay);
  router.get('/manage/statistics/queryGroupByMonth', adminAuthCheck, controller.manage.statistics.queryGroupByMonth);
  router.post('/manage/statistics/createStatistics', controller.manage.statistics.createStatistics);
  router.get('/manage/statistics/queryByPage', adminAuthCheck, controller.manage.statistics.queryByPage);

  router.get('/manage/postgraduate/listPostgraduateByCondition', controller.manage.postgraduate.listPostgraduateByCondition);
  router.get('/manage/undergraduate/listUndergraduateByCondition', controller.manage.undergraduate.listUndergraduateByCondition);

  router.get('/getCaptcha',controller.website.webutils.getCaptcha);
  router.get('/checkCaptcha',controller.website.webutils.checkCaptcha);

  router.get('/manageUndergraduate', pageAuthCheck, controller.home.manageUndergraduate);
  router.get('/managePostgraduate', pageAuthCheck, controller.home.managePostgraduate);
  router.get('/manageAddPostgraduate', pageAuthCheck, controller.home.manageAddPostgraduate);
  router.get('/manageAddUndergraduate', pageAuthCheck, controller.home.manageAddUndergraduate);
  router.get('/importInfo', pageAuthCheck, controller.home.manageImportInfo);
  router.get('/statistics', pageAuthCheck, controller.home.manageStatistics);
  router.get('/searchStatistics', pageAuthCheck, controller.home.manageSearchStatistics);

  router.post('/manage/file/uploadExcelFile/:fileType',  adminAuthCheck, controller.manage.file.uploadExcelFile);
  router.post('/manage/file/uploadImagesFile/:fileType',  adminAuthCheck, controller.manage.file.uploadImagesFile);

  router.post('/manage/updatePostgraduate/:id', adminAuthCheck, controller.manage.postgraduate.updatePostgraduate);
  router.get('/manage/deletePostgraduate/:id', adminAuthCheck, controller.manage.postgraduate.deletePostgraduate);
  router.post('/manage/updateUndergraduate/:id', adminAuthCheck, controller.manage.undergraduate.updateUndergraduate);
  router.get('/manage/deleteUndergraduate/:id', adminAuthCheck, controller.manage.undergraduate.deleteUndergraduate);

  router.get('/website/certificate/createCertificate',controller.website.certificate.createCertificate);

  router.resources('/manage/postgraduate', adminAuthCheck, controller.manage.postgraduate);
  router.resources('/manage/undergraduate', adminAuthCheck,  controller.manage.undergraduate);
  router.resources('/manage/user', adminAuthCheck, controller.manage.user);

  router.resources('/website/postgraduate',  controller.website.postgraduate);
  router.resources('/website/undergraduate',  controller.website.undergraduate);
};
