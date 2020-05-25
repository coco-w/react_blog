import React, { useEffect, useState } from 'react'
import { getAD } from '../api/default'
import Router from 'next/router'
import {Divider} from 'antd'
import '../static/style/components/Advert.less'
import { withRouter } from 'next/router'
const Advert = ({ children, router, href }) => {
  const [Ads, setAds] = useState([])
  useEffect(() => {
    console.log( children, router, href)
    getAD().then(res => {
      setAds(res.data)
    })
  }, [])
  return (
    <div className="ad-div comm-box">
      <Divider>广告信息</Divider> 
      {Ads.map(ele => {
        return (
          <div key={ele.id}>
            <a href={ele.link} target='_blank'>
              <img src={ele.src} />
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(Advert)