'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const adminAuthCheck = app.middleware.adminAuthCheck();

  router.get('/', controller.home.index);
  router.get('/result', controller.home.result);
  router.get('/noResult', controller.home.noResult);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/manageUndergraduate',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));
  router.get('/manageLogin',controller.home.manageLogin);
  router.get('/reLogin',controller.home.manageLogin);

  router.get('/website/postgraduate/searchPostgraduateByCondition', controller.website.postgraduate.searchPostgraduateByCondition);
  router.get('/website/undergraduate/searchUndergraduateByCondition', controller.website.undergraduate.searchUndergraduateByCondition);

  router.get('/website/postgraduate/getDetailByNumber', controller.website.postgraduate.getDetailByNumber);
  router.get('/website/undergraduate/getDetailByNumber', controller.website.undergraduate.getDetailByNumber);


  router.get('/getCaptcha',controller.website.webutils.getCaptcha);
  router.get('/checkCaptcha',controller.website.webutils.checkCaptcha);

  router.get('/manageUndergraduate',controller.home.manageUndergraduate);
  router.get('/managePostgraduate',controller.home.managePostgraduate);
  router.get('/manageAddPostgraduate',controller.home.manageAddPostgraduate);
  router.get('/manageAddUndergraduate',controller.home.manageAddUndergraduate);
  router.get('/importInfo',controller.home.manageImportInfo);
  router.get('/statistics',controller.home.manageStatistics);

  router.post('/manage/file/uploadFile/:fileType', controller.manage.file.uploadFile);

  router.resources('/manage/postgraduate',  controller.manage.postgraduate);
  router.resources('/manage/undergraduate', controller.manage.undergraduate);
  router.resources('/manage/user',  controller.manage.user);

  router.resources('/website/postgraduate',  controller.website.postgraduate);
  router.resources('/website/undergraduate',  controller.website.undergraduate);
};
