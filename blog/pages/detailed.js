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
const myList = (list) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  console.log(list)
  renderer.heading = (text, level, raw) => {
    console.log(text, level)
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

  let html  = marked(list.content)

  return (
    <Main title="detailed">
      <div key="left">
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">{list.type_info}</a>
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
            <span><Icon type="calendar"/>{list.create_time}</span>
            <span><Icon type="folder"/>{list.type_info}</span>
            <span><Icon type="fire"/>{list.view_count}人</span>
          </div>
          <div className="detailed-content"
            dangerouslySetInnerHTML={{__html: html}}
          >         
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
            {tocify && tocify.render()}
          </div>
        </Affix>
      </div>
      
    </Main>

  )
}
myList.getInitialProps = async (context) => {
  const res =  await getArticleById(context.query.id)
  return res.data[0]
}
export default myList
