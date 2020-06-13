module.exports = app => {
    const {router, controller} = app;
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/login', controller.admin.main.checkLogin)
    router.get('/admin/type',adminauth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminauth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth, controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth, controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth, controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth, controller.admin.main.getArticleById)
    router.post('/admin/addType',adminauth, controller.admin.main.addType)
    router.post('/admin/delType',adminauth, controller.admin.main.delType)
    router.post('/admin/upload', controller.admin.upload.uploadImg)
    router.get('/admin/getPicture', adminauth,controller.admin.main.getPicture)
    router.post('/admin/updatePic', adminauth,controller.admin.main.updatePic)
    router.post('/admin/delPic', adminauth,controller.admin.main.delPic)
    router.get('/admin/getCount', adminauth,controller.admin.main.getCount)
}