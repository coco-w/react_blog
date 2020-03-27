import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Spin, Form, message } from 'antd'

import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../static/css/login.css'
import { userLogin } from '../api/app'
import { setCookie, getCookie, routerPush } from '../lib/index'
function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  }
  useEffect(() => {
    console.log('useEffect')
    if (getCookie('token')) {
      // console.log(getToken())
      props.history.push('/')
    }
  })
  const checkLogin = () => {
    
    
  }  
  const onFinish = values => {
    setIsLoading(true)    
    userLogin(values).then(res => {      
      setIsLoading(false)
      if (res.code == 200) {
        setCookie('token',res.token, 1)
        setCookie('user',res.data.userName, 1)
        setCookie('user_id',res.data.id, 1)
        console.log(getCookie('token'))
        props.history.push('/')
      }else {
        message.error('账号或密码错误')
        
      }
    })    
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>        
        <Card title="博客登录" bordered={true} style={{width: 400}}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ 
              userName: userName,
              password: password
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="userName"
              label="用户"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
            <Input                            
              size="large"
              placeholder="用户名"
              prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}            
            />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                id="Password"
                size="large"
                placeholder="密码"            
                prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}                
              />
            </Form.Item>
            <Form.Item 
              wrapperCol={{
                span: 24
              }}
            >
              <Button type="primary" htmlType="submit" size="large" block>
                Submit
              </Button>
            </Form.Item>
          </Form>                                
        </Card>
      </Spin>
    </div>
  )
}


export default Login