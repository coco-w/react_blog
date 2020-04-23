import React from 'react'

export default [
  {
    path: '/',    //  一级路由path
    meta: '主页',     //  导航名称
    id: 1,
    icon: 'PieChartOutlined',//  所用icon
    role: [],    //  适用权限
  },
  {
    path: '/user',
    meta: '文章管理',
    role: [],
    id: 2,
    icon: 'UserOutlined',
    children: [
      {
        path: '/addArticle',
        meta: '添加文章',
        icon: '',
        role: [],
        id: 3,
        
      },
      {
        path: '/articleList',
        meta: '文章列表',
        icon: '',
        role: [],
        id: 4,
      

      },
    ]
  }

]