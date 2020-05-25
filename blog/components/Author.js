import React, { Component, useEffect, useState } from 'react'
import { Avatar, Divider, Tooltip } from 'antd'
import Advert from '../components/Advert'
import '../static/style/components/author.css'
import { getUserInfo } from '../api/default'

function Author() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    getUserInfo().then(res => {
      const data = res.data
      data.socialAccount = JSON.parse(data.socialAccount)
      setUserInfo({
        ...data
      })
    })
  }, [])
  const handleAvatarClick = (ele) => {
    window.open(ele.linc, '_blank')
  }
  const IconButton = function() {
    if (userInfo.socialAccount) {
      return (
        userInfo.socialAccount.map(ele => {
          if (ele.model === 'link') {
            return (
              <a key={ele.icon} href={ele.link} target='_blank'>
                <Avatar  size={28} icon={ele.icon} className="account" alt={ele.alt}>
                </Avatar>  
              </a>
              
            )
          }else {
            return (
              <Tooltip  key={ele.icon} placement="bottom" title={() => <img width='150' src={ele.img}></img>}>
                <Avatar size={28} icon={ele.icon} className="account"> 
                </Avatar>
              </Tooltip>
            )
          }    
        }) 
      )
    }
  }
    
  
  return( 
    <div>
      <div className="author-div comm-box">
        <div>
          <Avatar size={100} src={userInfo.avatar}></Avatar>          
        </div>
        <div className="author-introduction">
          <span>{userInfo.introduce}</span>
          <Divider>社交账号</Divider>
          {
           IconButton()
            
          }
          
          {/* <Avatar size={28} icon="qq" className="account"></Avatar>
          <Avatar size={28} icon="wechat" className="account"></Avatar> */}
        </div>
      </div>
        <Advert></Advert>
    </div>
  )
}

export default Author