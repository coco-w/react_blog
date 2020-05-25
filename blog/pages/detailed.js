import React, { useState } from 'react'
import '../static/style/components/index.css'
import '../static/style/components/detailed.css'
import Author from '../components/Author'
import { Row, Col, List, Icon, Breadcrumb, Affix } from 'antd'
import Main from '../components/Main'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import { getArticleById } from '../api/default'
import Link from 'next/link'
const myList = (data) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level)
    return `
      <a id=${anchor} href='#${anchor}> class='anchor-fix'>
        <h${level}>${text}</h>
      </a>\n
    `
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize:  false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: code => {
      return hljs.highlightAuto(code).value
    }
  })

  let html  = marked(data.list.content)

  return (
    <Main title="detailed">
      <div key="left">
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href={{pathname: '/', query: {page: data.page}}}>
                <a>首页</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={{pathname: "/list", query: {id: data.list.typeId}}}>
                <a>{data.list.type_info}</a>
              </Link>              
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {data.list.title}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <div className="detailed-title">
          {data.list.title}
          </div>
          <div className="list-icon center">
            <span><Icon type="calendar"/>{data.list.create_time}</span>
            <span><Icon type="folder"/>{data.list.type_info}</span>
            <span><Icon type="fire"/>{data.list.view_count}人</span>
          </div>
          <div className="detailed-content"
            dangerouslySetInnerHTML={{__html: html}}
          >         
          </div>
        </div>
      </div>
      <div key="right">
        <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">
              文章目录
            </div>
            {tocify && tocify.render()}
          </div>
        </Affix>
      </div>
      
    </Main>

  )
}
myList.getInitialProps = async (context) => {
  const res =  await getArticleById(context.query.id)
  let page = context.query.page ? context.query.page : 1
  return {
    list: res.data[0],
    page: page
  }
}
export default myList
