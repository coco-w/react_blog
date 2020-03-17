import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import Link from 'next/link'
import '../static/style/components/index.css'
import { Row, Col, List, Icon } from 'antd'
import Main from '../components/Main'
const Home = (list) => {
  const [myList, setMyList] = useState(
    list.data
  )    
  return (
    <Main title="Home">
      <div key="left">
              <List 
              header={<div>最新日志</div>}
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
                  <span><Icon type="calendar"/> {item.addTime} </span>
                  <span><Icon type="folder"/> {item.typeName} </span>
                  <span><Icon type="fire"/> {item.viewCount}人 </span>
                </div>
                <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
      </div>
      <Author key="right"></Author>  
    </Main>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleList').then(res=>{        
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default Home
