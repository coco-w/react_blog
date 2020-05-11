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
    path: '/article',
    meta: '文章管理',
    role: [],
    id: 2,
    icon: 'FileOutlined',
    children: [
      {
        path: '/article/addArticle',
        meta: '添加文章',
        icon: 'FileAddOutlined',
        role: [],
        id: 3,
        
      },
      {
        path: '/article/articleList',
        meta: '文章列表',
        icon: 'FileDoneOutlined',
        role: [],
        id: 4,
      

      },
    ]
  },
  {
    path: '/user',
    meta: '我的信息',
    icon: 'UserOutlined',
    id: 5,
    role: [],
  }

]