import React, {useState, useEffect, Component, Fragment} from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import * as Icon from '@ant-design/icons'
import '../static/css/index.css'
import { useHistory, useLocation, NavLink  } from 'react-router-dom'
// import AddArticle from './AddArticle'
import { checkCookie, getCookie } from '../lib/index'
import routes from '@/config/routerConfig.js'
import { deepFindFirst } from '@/util'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MyLayout(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeKey, setActiveKey] = useState(['3'])
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const handleCheckOut = () => {
    checkCookie('token')
    checkCookie('user')
    checkCookie('user_id')
    console.log(getCookie())
  }
  const renderMenu = data => {
    return data.map(ele => {
      const icon = ele.icon ? React.createElement(Icon[ele.icon]) : ''
      if (ele.children) {
        return (
          <SubMenu 
            title={
              <span>
                {icon}
                <span>{ele.meta}</span>
              </span>
            } 
            key={ele.id} 
          >
                
            {renderMenu(ele.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={ele.id}>
          {icon}
          <NavLink to={ele.path}>{ele.meta}</NavLink>
        </Menu.Item>
      )
    })
    
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={activeKey} defaultOpenKeys={['2']} mode="inline">  
        {renderMenu(routes)}
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