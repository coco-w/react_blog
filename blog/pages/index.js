import React,{ useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/index.css'
import { Row, Col, List, Icon, Pagination } from 'antd'
import Main from '../components/Main'
import { getArticleList } from '../api/default'
import marked from 'marked'
import hljs from 'highlight.js'
import { urlObjectKeys } from 'next/dist/next-server/lib/utils'

const Home = (data) => {
  const [myList, setMyList] = useState(
    data.list.data
  )    
  const [total, setTotal] = useState(
    data.list.total
  )
  const [myPage, setMyPage] = useState(data.page)
  const renderer = new marked.Renderer()
  useEffect(() => {
    setMyList(data.list.data)
    setTotal(data.list.total)
    setMyPage(data.page)
  }, [data])
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
  const handlePaginationChange = async (page) => {
    Router.push({pathname: '/', query: { page: page }, })
    const res = await getArticleList({pageSize: 5, page: page})
    // setMyPage(page)
    // setMyList(res.data)
    // setTotal(res.total)
    // window.scrollTo(0,0)
  }
  return (
    <Main title="Home">
      <div key="left">
        <List 
          header={<div id="#top">最新日志</div>}
          itemLayout="vertical"
          dataSource={myList}
          renderItem={item => (
            <List.Item>
            <div className="list-title">
              <Link href={{pathname: '/detailed',query: {page: myPage, id: item.id}}}>
                <a>
                  {item.title}
                </a>                      
              </Link>                    
            </div>
            <div className="list-icon">
              <span><Icon type="calendar"/> {item.create_time} </span>
              <span><Icon type="folder"/> {item.type_info} </span>
              <span><Icon type="fire"/> {item.viewCount}人 </span>
            </div>
            </List.Item>
          )}
        />
        <Pagination defaultCurrent={String(data.page)} total={total} pageSize={5} onChange={handlePaginationChange}/>
      </div>
      <Author key="right"></Author>  
    </Main>
  )
}

Home.getInitialProps = async (ctx)=>{
  let page = ctx.query.page ? ctx.query.page : 1
  const res = await getArticleList({pageSize: 5, page: page})
  return {
    list: res,
    page: page
  }
}


export default Home
