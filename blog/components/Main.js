import React,{useState,useEffect, useRef} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/components/index.css'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'

const Main = (props) => {  
  console.log(props)
  const render = key => {
    return props.children.find(ele => key === ele.key)
  }
    return (
      <div>
        <Head>
          <title>{props.title}</title>      
        </Head>    
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={17} lg={13} lx={14}>            
          {render('left')}
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} lx={4}>
          {render('right')}
          </Col>
        </Row>   
        <Footer /> 
      </div>
    )
}
export default Main
