import React, {useEffect, useState,} from 'react'
import { getAD, updateAD } from '../api/ad'
import { Table, Button, Spin, Modal, Form, Input, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { getCookie } from '../lib/index'
import * as qiniu from 'qiniu-js'
import { imgUrl } from '@/config/baseConfig'
import { randomNum } from '@/util'
function UserInfo() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [formData, setFormData ] = useState({
    src: '',
    link: ''
  })
  const [upToken] = useState(getCookie('uploadToken'))
  const [imgLoading, setImgLoading] = useState(false)
  useEffect(()=> {
    getAD().then(res => {
      setAds(res.data)
      setLoading(false)
    })
  }, [])
  const handleEditAD = item => {
    setVisible(true)
    setFormData(item)
  }
  const handleDeleteAD = item => {

  }
  const handleUpdateAD = () => {
    updateAD(formData).then(res => {
      setVisible(false)
    })
    getAD().then(res => {
      setAds(res.data)
    })
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  function handleUpload (data) {
    setImgLoading(true)
    setFormData({
      ...formData,
      src: '',
    })
    const $file = data.file
    const name = $file.name.split('.')[0] + new Date().getTime() + randomNum() + '.' + $file.name.split('.')[1]
    const config = {
      useCdnDomain: true,
      region: null
    }
    var observable = qiniu.upload($file, name, upToken, {}, config)
    observable.subscribe((res) => {      
    }, (err) => {      
      // message.error(err)
      // setIsLoading(false)
    }, (res) => {
      setImgLoading(false)
      const name = `${imgUrl}${res.key}`
      setFormData({
        ...formData,
        src: name,
      })
    })  
  }
  const columns = [
    {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render: (text, item) => {
        const src = item.src + '?imageView2/0/interlace/1/q/25'
        return (
          <img width="120px" height="50px" src={src} alt={item.link}/>
        )
      }
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, item) => (
        <div>
          <Button type="primary"style={{marginRight: '30px'}} onClick={handleEditAD.bind(this, item)}>修改</Button> 
          <Button type="primary" danger onClick={handleDeleteAD.bind(this, item)}>删除</Button>
        </div>
      ),
    },
  ]
  const handleCancel = () => {
    setVisible(false)
  }
  const uploadButton = (
    <div>
      {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const ModalRender = (
    <Form
      initialValues={formData}
    >
      <Form.Item
        label="图片"
        name="src"
        rules={[{ required: true, message: '请上传图片' }]}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
      >
        {formData.src ? <img src={formData.src} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </Form.Item>
      <Form.Item
        label="链接"
        name="link"
        rules={[{ required: true, message: '请输入链接' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
  )
  return (
    <div>
      <Spin spinning={loading} tip="Loading...">
        <Table columns={columns} dataSource={ads}></Table>
      </Spin>
      <Modal
          title="Title"
          visible={visible}
          onOk={handleUpdateAD}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          {ModalRender}
        </Modal>
    </div>
  )
}

export default UserInfo