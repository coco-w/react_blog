'use strict';
module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.post('/admin/login', controller.admin.home.login)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.home.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.home.addArticle)
  router.get('/admin/getArticleList', adminauth, controller.default.home.getArticleList)
}
