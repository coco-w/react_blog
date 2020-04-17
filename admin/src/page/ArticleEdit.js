import React, {useState, useEffect, useRef} from 'react'
import '../static/css/addArticle.css'
import {Row, Col, Input, Select, Button, message} from 'antd'
import { getTypeInfo, addArticle, getArticleDetail, updateArticle } from '../api/app'
import Editor from '@/components/Editor'
const { Option } = Select
function ArticleEdit(props) {
  const [content, setContent] = useState('') //文章内容
  const [title, setTitle] = useState('') //文章标题
  const [id, setId] = useState(0) //文章id
  const [typeInfo, setTypeInfo] = useState([]) //文章所有分类
  const [type, setType] = useState('请选择') //文章类型  
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [submitBtnText, setSubmitBtnText] = useState('发布文章')
  const editorRef = useRef()
  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleTypeChange = val => {
    setType(val)
  }
  const handleSubmitClick = () => {
    console.log(isUpdate, 'isupdate')
    if (isUpdate) {
      handleUpdateArticle()
    }else {
      handleAddArticle()
    }
  }
  const handleAddArticle = () => {
    if (testArticle()) {
      const obj = {
        type: type,
        content: editorRef.current.val,
        title: title,      
      }    
      setSubmitIsLoading(true)
      addArticle(obj).then(res => {
        setSubmitIsLoading(false)
        if (res.isSuccess) {
          message.success('添加文章成功')
        }else {
          message.success('添加文章失败')
        }
      })
    }
  }
  const handleUpdateArticle = () => {
    if (testArticle()) {
      const obj = {
        type: type,
        content: editorRef.current.val,
        title: title,   
        id: id,   
      }    
      setSubmitIsLoading(true)
      updateArticle(obj).then(res => {
        setSubmitIsLoading(false)
        if (res.isSuccess) {
          message.success('更新文章成功')
        }else {
          message.success('更新文章失败')
        }
      })
    }
  }
  const testArticle = () => {
    if (!title) {
      message.error('请输入文章标题')
      return false
    }
    if (!typeInfo.find(ele => ele.id === type)) {
      message.error('请选择文章类型')
      return false
    }
    return true
  }
  useEffect(() => {
    getTypeInfo().then(res => {
      setTypeInfo(res.data)
    })
    const id = props.match.params.id
    if (id) {
      setSubmitBtnText('修改文章')
      setIsUpdate(true)
      getArticleDetail({id}).then(res => {
        const data = res.data[0]
        setContent(data.content)
        setId(data.id)
        setTitle(data.title)
        setTitle(data.title)
        setType(data.typeId)
      })
    }
  }, [])
  return (    
    <Row gutter={5}>
      <Col span={24}>
        <Row gutter={10}>
          <Col span={20}>
            <Input 
              placeholder="标题名称"
              size="large"
              value={title}
              onChange={handleTitleChange}
            />            
          </Col>
          <Col span={4}>
            <Select
              value={type}
              size="large"    
              onChange={handleTypeChange}          
            >
              {
                typeInfo.map((ele,index) => {
                  return (
                    <Option key={index} value={ele.id}>
                      {ele.type_info}
                    </Option>
                  )
                })
              }
            </Select>
            <Button 
              type="primary" 
              size="large"
              onClick={handleSubmitClick}
              loading={submitIsLoading}
              style={{float: 'right'}}
            >{submitBtnText}</Button>
          </Col>
        </Row>
        <br/>
        <Row >          
          <Editor 
            ref={editorRef}
            height="645px"
            value={content}
          />
        </Row>
      </Col>
    </Row>    
  )
}

export default ArticleEdit