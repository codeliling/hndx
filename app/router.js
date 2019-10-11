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
  router.get('/noResult', controller.home.noResult);
  router.get('/404', controller.home.noFound);

  router.get('/manageLogin',controller.home.manageLogin);
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

  //router.get('/website/postgraduate/getCountData', controller.website.postgraduate.getCountData);
  //router.get('/website/undergraduate/getCountData', controller.website.undergraduate.getCountData);

  router.get('/manage/postgraduate/listPostgraduateByCondition', adminAuthCheck, controller.manage.postgraduate.listPostgraduateByCondition);
  router.get('/manage/undergraduate/listUndergraduateByCondition', adminAuthCheck, controller.manage.undergraduate.listUndergraduateByCondition);
  router.post('/manage/statistics/createStatistics',controller.manage.statistics.createStatistics);
  router.get('/manage/statistics/queryGroupByDay',controller.manage.statistics.queryGroupByDay);
  router.get('/manage/statistics/queryGroupByMonth',controller.manage.statistics.queryGroupByMonth);
  router.get('/manage/statistics/getCountData',controller.manage.statistics.getCountData);

  router.get('/getCaptcha',controller.website.webutils.getCaptcha);
  router.get('/checkCaptcha',controller.website.webutils.checkCaptcha);

  router.get('/manageUndergraduate', pageAuthCheck, controller.home.manageUndergraduate);
  router.get('/managePostgraduate', pageAuthCheck, controller.home.managePostgraduate);
  router.get('/manageAddPostgraduate', pageAuthCheck, controller.home.manageAddPostgraduate);
  router.get('/manageAddUndergraduate', pageAuthCheck, controller.home.manageAddUndergraduate);
  router.get('/importInfo', pageAuthCheck, controller.home.manageImportInfo);
  router.get('/statistics', pageAuthCheck, controller.home.manageStatistics);

  router.post('/manage/file/uploadFile/:fileType',  adminAuthCheck, controller.manage.file.uploadFile);

  router.resources('/manage/postgraduate', adminAuthCheck, controller.manage.postgraduate);
  router.resources('/manage/undergraduate', adminAuthCheck,  controller.manage.undergraduate);
  router.resources('/manage/user', adminAuthCheck, controller.manage.user);

  router.resources('/website/postgraduate',  controller.website.postgraduate);
  router.resources('/website/undergraduate',  controller.website.undergraduate);
};
