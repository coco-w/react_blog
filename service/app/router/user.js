'use strict';
module.exports = app => {
  const { router, controller } = app
  // const adminauth = app.middleware.adminauth()
  router.get('/user/getUserInfo', controller.user.user.getUserInfo)
};
