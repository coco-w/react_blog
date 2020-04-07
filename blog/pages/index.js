import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
// import axios from 'axios'
import Link from 'next/link'
import '../static/style/components/index.css'
import { Row, Col, List, Icon, Pagination } from 'antd'
import Main from '../components/Main'
import { getArticleList } from '../api/default'
import marked from 'marked'
import hljs from 'highlight.js'

const Home = (list) => {
  const [myList, setMyList] = useState(
    list.data
  )    
  const [total, setTotal] = useState(
    list.total
  )  
  const renderer = new marked.Renderer()
  
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
  myList.forEach(ele => {
    ele.introduce = marked(ele.introduce)
  })  
  const handlePaginationChange = async (page) => {
    const res = await getArticleList({pageSize: 5, page: page})
    setMyList(res.data)
    setTotal(res.total)
    window.scrollTo(0,0)
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
                  <Link href={{pathname: '/detailed',query: {id: item.id}}}>
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
                <div className="list-context" 
                  dangerouslySetInnerHTML={{__html: item.introduce}}
                ></div>
                </List.Item>
              )}
            />
            <Pagination defaultCurrent={1} total={total} pageSize={5} onChange={handlePaginationChange}/>
      </div>
      <Author key="right"></Author>  
    </Main>
  )
}

Home.getInitialProps = async ()=>{
  const res = await getArticleList({pageSize: 5, page: 1})
  return res  
}
export default Home
