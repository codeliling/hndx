'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const adminAuthCheck = app.middleware.adminAuthCheck();

  router.get('/', controller.home.index);

  router.get('/website/postgraduate/listPostgraduateByCondition', controller.website.postgraduate.listPostgraduateByCondition);
  router.get('/website/undergraduate/listUndergraduateByCondition', controller.website.undergraduate.listUndergraduateByCondition);

  router.post('/manage/file/uploadFile/:fileType', adminAuthCheck, controller.manage.file.uploadFile);

  router.resources('/manage/postgraduate', adminAuthCheck, controller.manage.postgraduate);
  router.resources('/manage/undergraduate', adminAuthCheck, controller.manage.undergraduate);
  router.resources('/manage/user',  adminAuthCheck, controller.manage.user);

  router.resources('/website/postgraduate',  controller.website.postgraduate);
  router.resources('/website/undergraduate',  controller.website.undergraduate);
};
