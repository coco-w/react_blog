import React,{useState, useEffect} from 'react'
import Author from '../components/Author'
import '../static/style/components/index.css'
import Router from 'next/router'
import { Row, Col, List, Icon, Breadcrumb, Pagination } from 'antd'
import Main from '../components/Main'
import { getArticleListById } from '../api/default'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'

const myList = (data) => {    
  const [ mylists , setMylist ] = useState(data.data)
  const [total, setTotal] = useState(
    data.total
  )
  const [myPage, setMyPage] = useState(data.page)
  useEffect(()=>{
    setMylist(data.data)
    setTotal(data.total)
    setMyPage(data.page)
   }, [data])
  const handlePaginationChange = async (page) => {
    Router.push({pathname: '/list', query: { page: page, id: data.typeId }, })
    await getArticleListById({pageSize: 10, page: page, id: data.typeId})
  }
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
  return (
    <Main title="MyList">
      <div key="left">
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {data.typeInfo}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <List
          itemLayout="vertical"
          dataSource={mylists}
          renderItem={item => (
            <List.Item>
              <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
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
        <Pagination defaultCurrent={String(data.page)} total={total} pageSize={10} onChange={handlePaginationChange}/>
      </div>
      <div key="right"></div>
    </Main>     
  )
}

myList.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : 1
  const typeId = ctx.query.id
  const res =  await getArticleListById({id: typeId, pageSize: 10, page: page})
  return {
    ...res,
    page,
    typeId,
  }
}
export default myList
