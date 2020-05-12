import React, {useState, useEffect, useRef } from 'react'
import { List, Spin, Button, message, Modal } from 'antd'
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { getArticleList, deleteArticle } from '../api/app'
import { useHistory  } from 'react-router-dom'
import ArticleEdit from './ArticleEdit'
function ArticleList() {
  const [articleList, setArticleList] = useState([])
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const [editVisible, setEditVisible] = useState(false)
  const [articleId, setArticleId] = useState(0)
  const [modal, contextHolder] = Modal.useModal()
  const updateModal = useRef()
  const history = useHistory()
  useEffect(() => {
    getArticleList({page: 1, pageSize: pageSize}).then(res => {
      // console.log(res.count[`COUNT(*)`])
      setArticleList(res.data)
      setTotal(res.total)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  },[])
  const IconText = ({icon, text}) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  )
  const handleEditArticle = (item) => {
    // history.push({pathname: `/article/addArticle/${item.id}`})
    const m = modal.confirm({
      title:"修改文章",
      onCancel:handleEditCancel,
      onOk:handleArticleUpdate,
      style: {top: 0 },
      width:"1000",
      content: <div style={{height: '800px'}}>
        <ArticleEdit id={item.id} ref={updateModal}></ArticleEdit>
      </div>
    })
    
  }
  const handleDeleteArticle = (item) => {
    setDeleteId(item.id)
    setVisible(true)
  }  
  const handleCancel = () => {
    setVisible(false)
  }
  const handleEditCancel = () => {
    setEditVisible(false)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    deleteArticle({id: deleteId}).then(res => {
      message.success('删除成功')
      setConfirmLoading(false)
      setVisible(false)
      setLoading(true)
      getArticleList({page: 1, pageSize: pageSize}).then(res => {        
        setArticleList(res.data)
        setTotal(res.total)
        setLoading(false)
      })  
    })
  }
  const handleArticleUpdate = () => {
    updateModal.current.update()
    setEditVisible(false)
  }
  
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
          showTotal: total => `共 ${total} 条`
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
            extra={
              <div style={{marginTop: '30px'}}>
                <Button type="primary"style={{marginRight: '30px'}} onClick={handleEditArticle.bind(this, item)}>修改</Button> 
                <Button type="primary" danger onClick={handleDeleteArticle.bind(this, item)}>删除</Button>                
                      
              </div>
            }
          >
            <List.Item.Meta            
              title={<a >{item.title}</a>}
              description={item.introduce}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Modal
        title='删除文章'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>确认删除?</p>
      </Modal>
      {/* <Modal
        title="修改文章"
        visible={editVisible}
        confirmLoading={confirmLoading}
        onCancel={handleEditCancel}
        onOk={handleArticleUpdate}
        style={{ top: 0 }}
        width="1000"
        destroyOnClose={true}
      >
      </Modal> */}
      {contextHolder}
    </Spin>
  )
}

export default ArticleList