import React, {useState, useEffect, Component, Fragment} from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import '../static/css/index.css'
import { useHistory, useLocation, NavLink  } from 'react-router-dom'
// import AddArticle from './AddArticle'
import { checkCookie, getCookie } from '../lib/index'
import routes from '@/config/routerConfig.js'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MyLayout(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeKey, setActiveKey] = useState(['1'])
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const handleCheckOut = () => {
    checkCookie('token')
    checkCookie('user')
    checkCookie('user_id')
    console.log(getCookie())
  }
  const handleMenuClick = (item) => {
    // console.log(withRouter())    
  //   console.log(withRouter)
    setActiveKey([item.key])
    if (item.key === '1') {
      history.push('/')      
    }else if (item.key === '3') {
      history.push('/addArticle')
    }else if (item.key === '4') {
      history.push('/articleList')
    }
  
  }
  const renderMenu = data => {
    return data.map(ele => {
      if (ele.children) {
        return (
          <SubMenu 
            title={
              <span>
                {ele.icon ? ele.icon():''}
                <span>{ele.meta}</span>
              </span>
            } 
            key={ele.path} 
          >
                
            {renderMenu(ele.children)}
          </SubMenu>
        )
      }
      return <Menu.Item>
        {ele.icon ? ele.icon():''}
        <NavLink to={ele.path}>{ele.meta}</NavLink>
      </Menu.Item>
    })
    
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={activeKey} mode="inline" onClick={handleMenuClick}>  
        {renderMenu(routes)}        
          {/* <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <span>添加文章</span>
            </Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>            
          </SubMenu>

          <Menu.Item key="9">
            <FileOutlined />
            <span>留言管理</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <Button onClick={handleCheckOut}>登出</Button>          
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )

}

export default MyLayout