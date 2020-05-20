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
  console.log(routes)
  const [collapsed, setCollapsed] = useState(false)
  const [activeSelectedKey, setActiveSelectedKey] = useState('')
  const [activeOpenKey, setActiveOpenKey] = useState('')
  const [breadcrumbArray, setBreadcrumbArray] = useState([])
  const url = useLocation()
  useEffect(() => {
    getbreadcrumb()
  }, [url])
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const getActiveRouter = () => {
    const reg = /\/[0-9]+$/
    return deepFindFirst(routes, url.pathname.replace(reg, ''), 'path')
  }
  
  const getbreadcrumb = () => {
    const activeRouter = getActiveRouter().reverse()
    
    setBreadcrumbArray(activeRouter)
  }
  const getOpenSub = () => {
    
    const activeRouter = getActiveRouter()
    
    if (activeRouter && activeRouter.length > 1) {
      return activeRouter[1].path
    }else {
      return ''
    }
  }
  const getActiveSelectKey = () => {
    const path = getActiveRouter()
    return path[0] ? path[0].path : ''
  }
  const handleCheckOut = () => {
    checkCookie('token')
    checkCookie('user')
    checkCookie('user_id')
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
            key={ele.path} 
          >
                
            {renderMenu(ele.children)}
          </SubMenu>
        )
      }
      if (!ele.hide) {
        return (
          <Menu.Item key={ele.path}>
            {icon}
            <NavLink to={ele.path}>{ele.meta}</NavLink>
          </Menu.Item>
        )
      }
      
    })
    
  }
  const buttonStyle = {
    position: 'absolute',
    right: '20px',
    top: '15px'
  }
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[getActiveSelectKey()]} defaultOpenKeys={[getOpenSub()]} mode="inline">  
        {renderMenu(routes)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <span className="header-title">王林强</span>
          <span>博客管理后台</span>
          <Button style={buttonStyle} onClick={handleCheckOut}>登出</Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbArray.map(ele => {
              return (
                <Breadcrumb.Item key={ele.path}>{ele.meta}</Breadcrumb.Item>
              )
            })}
            
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