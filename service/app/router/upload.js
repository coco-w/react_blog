'use strict';
module.exports = app => {
  const { router, controller } = app
  router.get('/upload/uptoken', controller.admin.upload.getUploadToken)
};
