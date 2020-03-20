import React, { useState } from 'react'
import { Card, Input, Button, Spin, Form } from 'antd'
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../static/css/login.css'

function Login() {
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
  const checkLogin = () => {
    
    
  }
  const onFinish = values => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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