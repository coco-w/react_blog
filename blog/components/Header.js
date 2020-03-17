import React from 'react'
import '../static/style/components/header.css'
import { Component } from 'react-dom'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className="header-logo">王林强</span>
        <span className="header-text">这是王林强的博客,欢迎你的到来!!!</span>
      </Col>
      <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Icon type="home"/>
            首页
          </Menu.Item>
          <Menu.Item key="video">
            <Icon type="youtube"></Icon>
            视频
          </Menu.Item>
          <Menu.Item key="life">
            <Icon type="smile"></Icon>
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header

