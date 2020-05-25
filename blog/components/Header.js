import React, { useEffect, useState, Fragment } from 'react'
import '../static/style/components/Header.css'
import { Row, Col, Menu, Icon } from 'antd'
import { getArticleType } from '../api/default'
import Router from 'next/router'
import Link from 'next/link'
const Header = (props) => {
  const [ navArray, setNavArray ] = useState([])
  useEffect(() => {
    console.log('header - init')
    const fetchData = async () => {
      const res = await getArticleType()
      setNavArray(res.data)      
    }
    fetchData()
  },[])
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">
            <Link href="/">
              <a>王林强</a>
            </Link>
          </span>
          <span className="header-text">这是王林强的博客,欢迎你的到来!!!</span>
        </Col>
        <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key='0'>
                <Link href="/index">
                  <a>
                    <Icon type="home"/>
                    首页
                  </a>
                </Link>
            </Menu.Item>
            {
              navArray.map((item,index) => (
                <Menu.Item key={index + 1}>
                  <Link href={{pathname: '/list', query: { id: item.id }}}>
                    <a>
                      <Icon type={item.icon}/>
                      {item.type_info}
                    </a>
                  </Link>                  
                </Menu.Item> 
              ))
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
  
}

export default Header
