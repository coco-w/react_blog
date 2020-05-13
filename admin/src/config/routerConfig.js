export default [
  {
    path: '/',    //  一级路由path
    meta: '主页',     //  导航名称
    icon: 'PieChartOutlined',//  所用icon
    role: [],    //  适用权限
    component: '/Home',
  },
  {
    path: '/article',
    meta: '文章管理',
    role: [],
    icon: 'FileOutlined',
    children: [
      {
        path: '/article/addArticle',
        meta: '添加文章',
        icon: 'FileAddOutlined',
        role: [],
        component: '/ArticleEdit',
      },
      {
        path: '/article/addArticle/:id',
        meta: '添加文章',
        icon: 'FileAddOutlined',
        role: [],
        hide: true,
        component: '/ArticleEdit',
      },
      {
        path: '/article/articleList',
        meta: '文章列表',
        icon: 'FileDoneOutlined',
        role: [],
        component: '/ArticleList',

      },
    ]
  },
  {
    path: '/user',
    meta: '用户信息',
    icon: 'UserOutlined',
    role: [],
    children: [
      {
        path: '/userInfo/user',
        meta: '用户信息',
        icon: 'UserOutlined',
        component: '/UserInfo',
        role: [],
      },
      {
        path: '/userInfo/AD',
        meta: '广告信息',
        icon: 'UserOutlined',
        component: '/UserAD',
        role: [],
      }
    ]
  }

]