import React, {useState, useEffect} from 'react'
import ArticleEdit from './ArticleEdit'
function AddArticle(props) {
 
  return (    
    <ArticleEdit edit={true} id={props.location.state.id}></ArticleEdit>
  )
}

export default AddArticle