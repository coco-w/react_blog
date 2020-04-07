import React, { useEffect, useState } from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import { getArticleType } from '../api/default'
import Router from 'next/router'
import Link from 'next/link'
const Header = () => {
  const [ navArray, setNavArray ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await getArticleType()
      setNavArray(res.data)
      console.log(res.data)
    }
    fetchData()
  },[])
  const handleClick = (e) => {       
    if (e.key == 0) {
      Router.push('/index')
    }else {
      Router.push(`/list/?id=${e.key}`)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">王林强</span>
          <span className="header-text">这是王林强的博客,欢迎你的到来!!!</span>
        </Col>
        <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key='0'>
              <Icon type="home"/>
              首页
            </Menu.Item>
            {
              navArray.map((item,index) => (
                <Menu.Item key={index + 1}>
                  <Icon type={item.icon}/>
                  {item.type_info}
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
