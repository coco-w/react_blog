import React, { Component } from 'react'
import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'
class Author extends Component {
  render() {
    return (
      <div className="author-div comm-box">
        <div>
          <Avatar size={100} src="https://img.wlq.cool/42274898.jpg"></Avatar>          
        </div>
        <div className="author-introduction">
          你好呀！这是个人介绍！！你知道了吗？？
          <Divider>社交账号</Divider> 
          <Avatar size={28} icon="github" className="account"></Avatar>
          <Avatar size={28} icon="qq" className="account"></Avatar>
          <Avatar size={28} icon="wechat" className="account"></Avatar>
        </div>
      </div>
    )
  }
}

export default Author