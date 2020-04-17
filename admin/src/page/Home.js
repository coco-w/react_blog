import React, {useState, useRef} from 'react'
import Editor from '@/components/Editor'
import { Button } from 'antd'
function Home(props) {
  const tinymce = useRef()
  const handleSetValue = () => {
    // console.log(tinymce.current.value)
    console.log(tinymce.current)
  }
  
  return (
    <div>
      <Editor ref={tinymce}></Editor>
      <Button onClick={handleSetValue}>获取</Button>
    </div>
  )

}

export default Home