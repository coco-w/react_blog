import React, {useState, useEffect} from 'react'
import ArticleEdit from './ArticleEdit'

function AddArticle() {
  return (    
    <ArticleEdit edit={false}></ArticleEdit>
  )
}

export default AddArticle