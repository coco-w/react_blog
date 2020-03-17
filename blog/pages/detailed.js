import React, { useState } from 'react'
import '../static/style/components/index.css'
import '../static/style/components/detailed.css'
import Author from '../components/Author'
import { Row, Col, List, Icon, Breadcrumb, Affix } from 'antd'
import Main from '../components/Main'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import axios from 'axios'
import 'markdown-navbar/dist/navbar.css'

const myList = (list) => {
  let markdown= list.article_content
  return (
    <Main title="detailed">
      <div key="left">
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">{list.typeName}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {list.title}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <div className="detailed-title">
          {list.title}
          </div>
          <div className="list-icon center">
            <span><Icon type="calendar"/>{list.addTime}</span>
            <span><Icon type="folder"/>{list.typeName}</span>
            <span><Icon type="fire"/>{list.view_count}人</span>
          </div>
          <div className="detailed-content">
            <ReactMarkdown 
              source={markdown}
              escapeHtml={false}
            />
          </div>
        </div>
      </div>
      <div key="right">
        <Author></Author>
        <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">
              文章目录
            </div>
            <MarkNav
              className="article-menu"
              source={markdown}
              ordered={false}
            />
          </div>
        </Affix>
      </div>
      
    </Main>

  )
}
myList.getInitialProps = async (context) => {
  const promise = new Promise((resolve)=>{
    axios(`http://127.0.0.1:7001/default/getArticleById/${context.query.id}`).then(res=>{        
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}
export default myList
