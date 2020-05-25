'use strict';
module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.get('/ad/getAD', controller.default.ad.getAD)
  router.get('/admin/getAD', adminauth, controller.default.ad.getAD)
  router.post('/ad/updateAD', adminauth, controller.default.ad.updateAD)
};
