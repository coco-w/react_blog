import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/components/index.css'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Main from '../components/Main'
import { getArticleListById } from '../api/default'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'

const myList = (list) => {    
  const [ mylists , setMylist ] = useState(list.data)
  useEffect(()=>{
    // console.log(list)
    setMylist(list.data)
   })
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
   mylists.forEach(ele => {
     ele.introduce = marked(ele.introduce)
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
                视频教程
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
                <div className="list-context"
                 dangerouslySetInnerHTML={{__html: item.introduce}}
                ></div>  
              </List.Item>
            )}
          /> 
        </div>
        <Author key="right"></Author>  
      </Main>     
    )
}

myList.getInitialProps = async (ctx) => {  
  return await getArticleListById(ctx.query.id)  
  //  res.data
}
export default myList
