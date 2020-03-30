export default [
  {
    path : '/',    //  一级路由path
    meta : '主页',     //  导航名称
    icon : '',      //  所用icon
    role : [],    //  适用权限
    // 所用组件 
    component : sync(() => import( /* webpackChunkName: 'home' */ '@/Pages/Home/index.js')),
    children : [  //二级路由
        {
              path : '/one',  //二级路由path ，react将会渲染为/home/one
              meta : '嵌套1',
              icon : '',
              role : [],
              component : sync(() => import ( /* webpackChunkName: 'home_page_one' */ '@/Pages/Home/one')), 
              children : []
        },
        {
              path : '/two',
              meta : '嵌套2',
              icon : '',
              role : [],
              component : sync(() => import ( /* webpackChunkName: 'home_page_one' */ '@/Pages/Home/two')), 
              children : [],
          },
      ],
  },
  {
            path : '/user',
            meta : '用户',
            icon : '',
            role : [],
            component : sync(() => import( /* webpackChunkName: 'user' */ '@/Pages/User/index.js')),
            children : [
                    {
                        path : '/one',
                        meta : '嵌套1',
                        icon : '',
                        role : [],
                        component : sync(() => import ( /* webpackChunkName: 'user_page_one' */ '@/Pages/User/one')), 
                        children : [],
                    },
                    {
                          path : '/two',
                          meta : '嵌套2',
                          icon : '',
                          role : [],
                          component : sync(() => import ( /* webpackChunkName: 'user_page_two' */ '@/Pages/User/two')),
                          children : [], 
                      },
              ]
        }

]