'use strict';
module.exports = app => {
  const { router, controller } = app
  router.post('/admin/login', controller.admin.home.login)
}
