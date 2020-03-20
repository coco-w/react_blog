import React, {useState} from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import '../static/css/addArticle.css'
import {Row, Col, Input, Select, Button, message} from 'antd'
const { Option } = Select
const { TextArea } = Input
function AddArticle() {
  const [content, setContent] = useState('') //文章内容
  const [contentMD, setContentMD] = useState('') //文章内容 markdown
  const [introduce, setIntroduce] = useState('') //文章简介
  const [introduceMD, setIntroduceMD] = useState('') //文章简介 markdown
  const [title, setTitle] = useState('') //文章标题
  const [id, setId] = useState(0) //文章id
  const [typeInfo, setTypeInfo] = useState([]) //文章所有分类
  const [type, setType] = useState('1') //文章类型
  // const [id, setId] = useState(0) //文章id
  const [submitIsLoading, setSubmitIsLoading] = useState(false)

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
  const handleContentChange = e => {      
    const html  = marked(e.target.value)
    setContent(e.target.value)
    setContentMD(html)
  }
  const handleIntroduceChange = e => {      
    const html  = marked(e.target.value)
    setIntroduce(e.target.value)
    setIntroduceMD(html)
  }
  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleTypeChange = val => {
    setType(val)
  }
  const handleSubmitClick = () => {
    const obj = {
      type: type,
      content: content,
      contentMD: contentMD,
      introduce: introduce,
      introduceMD: introduceMD,
      title: title,      
    }
    setSubmitIsLoading(true)
    setTimeout(() => {
      setSubmitIsLoading(false)
      message.success(`提交成功`)
    }, 1000);

  }
  return (
    <Row gutter={5}>
      <Col span={18}>
        <Row gutter={10}>
          <Col span={20}>
            <Input 
              placeholder="标题名称"
              size="large"
              defaultValue={title}
              onChange={handleTitleChange}
            />            
          </Col>
          <Col span={4}>
            <Select
              defaultValue={type}
              size="large"    
              onChange={handleTypeChange}          
            >
              <Option value="1">
                视频教程
              </Option>
            </Select>
          </Col>
        </Row>
        <br/>
        <Row gutter={10}>
          <Col span={12}>
            <TextArea 
              className="markdown-content"
              rows={35}
              placeholder="文章内容"
              defaultValue={content}
              onChange={handleContentChange}
            />
          </Col>
          <Col span={12}>
            <div 
              className="show-html"
              dangerouslySetInnerHTML={{__html: contentMD}}  
            ></div>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row className="operation">
          <Col 
            span={24}
            className="operation-buttons"
          >
            <Button size="large">暂存文章</Button>
            <Button 
              type="primary" 
              size="large"
              onClick={handleSubmitClick}
              loading={submitIsLoading}
            >发布文章</Button>
          </Col>
          <Col span={24}>
            <TextArea 
              rows={4}
              placeholder="文章简介"
              defaultValue={introduce}
              onChange={handleIntroduceChange}
            />      
          </Col>
          <Col span={24}>
            <div 
              className="introduce-html"
              dangerouslySetInnerHTML={{__html: introduceMD}}  
            ></div>    
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AddArticle