'use strict';
module.exports = app => {
  const { router, controller } = app
  router.get('/ad/getAD', controller.default.ad.getAD)
};
