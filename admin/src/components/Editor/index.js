import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import { Spin, message } from 'antd'
import Editor from 'for-editor'
import SimpleMDE from "react-simplemde-editor"
import 'easymde/dist/easymde.min.css'
import * as qiniu from 'qiniu-js'
import './index.css'
import { getUploadToken } from '@/api/app'
import { getCookie } from '@/lib/index'
import { fileToBlob, randomNum } from '@/util'
import { imgUrl } from '@/config/baseConfig'

function Tinymce(props, ref) {
  const [value, setValue] = useState('')
  const [upToken, setUpToken] = useState(getCookie('uploadToken'))
  const [isLoading, setIsLoading] = useState(false)
  const [codeMirror, setCodeMirror] = useState(null)
  const [cursor, setCursor] = useState(null)
  const myRef = useRef()
  useImperativeHandle(ref, () => {
    return {
      val: value
    }
  })
  const handleChange = (val) => {
    setValue(val)
  }
  // useEffect(() => {
  //   getUploadToken().then(res => {
  //     setUpToken(res.uptoken)
  //   })
  // }, [])
  useEffect(() => {
    setValue(props.value)
  }, [props.value])
  const handleAddImg = () => {
    
    const $file = document.getElementById('uploadInput').files[0]
    if (!$file) return
    const length = document.getElementById('uploadInput').files.length
    console.log($file, length)
    const isJpgOrPng = $file.type === 'image/jpeg' || $file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
      return
    }
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
      const img = `![${res.key}](${name})`      
      const endCursor = Object.assign(cursor)
      codeMirror.replaceRange(img, cursor, endCursor)
      endCursor.ch += img.length
      const newValue = codeMirror.getValue()
      setValue(newValue)
      setIsLoading(false)
      codeMirror.focus()
      codeMirror.setCursor(endCursor)
    })  
  }
  return (
    <div ref={myRef} style={{width: '100%'}}>
      <Spin spinning={isLoading}>        
        {/* <Editor
          addImg={handleAddImg}
          value={value}
          onChange={handleChange}
          // height={props.height ? props.height : '600px'}
        /> */}
        <SimpleMDE
          id="editor"
          onChange={handleChange}
          value={value}
          options={{
            autofocus: true,
            spellChecker: false,
            toolbar: [
              'bold',
              'italic',
              'heading',
              '|',
              'quote',
              'code',
              'table',
              'horizontal-rule',
              'unordered-list',
              'ordered-list',
              '|',
              { name: 'image',
                action: (editor) => {
                  setCodeMirror(editor.codemirror)
                  setCursor(editor.codemirror.getCursor())
                 
                  document.getElementById('uploadInput').click()
                },
                className: 'fa fa-image',
                title: '上传图片'
              },
              '|',
              'side-by-side',
              'fullscreen',
            ]
          }}
        />
        <input type="file" style={{display: 'none'}} id="uploadInput" onChange={handleAddImg}></input>
      </Spin>
    </div>
  )
}

export default forwardRef(Tinymce)
