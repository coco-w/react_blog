import React, {useState, useEffect} from 'react'
import { List, Spin } from 'antd'
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { getArticleList } from '../api/app'
function ArticleList() {
  const [articleList, setArticleList] = useState([])
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getArticleList({page: 1, pageSize: pageSize}).then(res => {
      // console.log(res.count[`COUNT(*)`])
      setArticleList(res.data)
      setTotal(res.total)
      setLoading(false)
    })
  },[])
  const IconText = ({icon, text}) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  )
  return (
    <Spin spinning={loading} tip="Loading...">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)          
            setLoading(true)
            getArticleList({page: page, pageSize: pageSize}).then(res => {              
              setLoading(false)
              setArticleList(res.data)              
            }).catch(err => {
              setLoading(false)
            })
          },
          pageSize: pageSize,
          total: total,
        }}
        dataSource={articleList}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={CalendarOutlined} text={item.create_time} key="list-vertical-star-o" />,
              <IconText icon={FireOutlined} text={item.viewCount} key="list-vertical-like-o" />,
              <IconText icon={FolderOpenOutlined} text={item.type_info} key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta            
              title={<a>{item.title}</a>}
              description={item.introduce}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Spin>
  )
}

export default ArticleList