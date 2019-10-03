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

  router.get('/website/postgraduate/listPostgraduateByCondition', controller.website.postgraduate.listPostgraduateByCondition);
  router.get('/website/undergraduate/listUndergraduateByCondition', controller.website.undergraduate.listUndergraduateByCondition);

  router.get('/manageLogin',controller.home.manageLogin);
  router.get('/getCaptcha',controller.website.webutils.getCaptcha);
  router.get('/checkCaptcha',controller.website.webutils.checkCaptcha);

  router.get('/manageUndergraduate',controller.home.manageUndergraduate);
  router.get('/managePostgraduate',controller.home.managePostgraduate);
  router.get('/manageAddPostgraduate',controller.home.manageAddPostgraduate);
  router.get('/manageAddUndergraduate',controller.home.manageAddUndergraduate);
  router.get('/importInfo',controller.home.manageImportInfo);
  router.get('/statistics',controller.home.manageStatistics);

  router.post('/manage/file/uploadFile/:fileType', adminAuthCheck, controller.manage.file.uploadFile);

  router.resources('/manage/postgraduate',  controller.manage.postgraduate);
  router.resources('/manage/undergraduate', controller.manage.undergraduate);
  router.resources('/manage/user',  controller.manage.user);

  router.resources('/website/postgraduate',  controller.website.postgraduate);
  router.resources('/website/undergraduate',  controller.website.undergraduate);
};
