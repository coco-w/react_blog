'use strict';
module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.post('/admin/login', controller.admin.home.login)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.home.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.home.addArticle)
  router.get('/admin/getArticleList', adminauth, controller.default.home.getArticleList)
  router.get('/admin/getArticleDetail', adminauth, controller.default.home.getArticleById)
  router.delete('/admin/deleteArticle', adminauth, controller.admin.home.deleteArticle)
  router.post('/admin/updateArticle', adminauth, controller.admin.home.updateArticle)
}
