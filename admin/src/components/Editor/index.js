import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import { Spin, message } from 'antd'
import Editor from 'for-editor'
import * as qiniu from 'qiniu-js'
import './index.css'
import { getUploadToken } from '@/api/app'
import { fileToBlob, randomNum } from '@/util'
import { imgUrl } from '@/config/baseConfig'

function Tinymce(props, ref) {
  const [value, setValue] = useState('')
  const [upToken, setUpToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const myRef = useRef()
  useImperativeHandle(ref, () => {
    return {
      val: value
    }
  })
  const handleChange = (val) => {
    setValue(val)
  }
  useEffect(() => {
    getUploadToken().then(res => {
      setUpToken(res.uptoken)
    })
  }, [])
  useEffect(() => {
    setValue(props.value)
  }, [props.value])
  const handleAddImg = ($file) => {
    setIsLoading(true)
    const name = $file.name.split('.')[0] + new Date().getTime() + randomNum() + '.' + $file.name.split('.')[1]
    const config = {
      useCdnDomain: true,
      region: null
    }
    var observable = qiniu.upload($file, name, upToken, {}, config)
    observable.subscribe((res) => {      
    }, (err) => {      
      message.error(err)
      setIsLoading(false)
    }, (res) => {
      const name = `${imgUrl}${res.key}`
      const newValue = `${value}![${res.key}](${name})`
      setValue(newValue)
      setIsLoading(false)
    })  
  }
  return (
    <div ref={myRef} style={{width: '100%'}}>
      <Spin spinning={isLoading}>        
        <Editor
          addImg={handleAddImg}
          value={value}
          onChange={handleChange}
          height={props.height ? props.height : '600px'}
        />
      </Spin>
    </div>
  )
}

export default forwardRef(Tinymce)
