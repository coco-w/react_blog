import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Login from './login'
import MyLayout from '@/page/Layout'
import AddArticle from './AddArticle'
import Home from './Home'
import ArticleList from './ArticleList'
import UpdateArticle from './UpdateArticle'
import ArticleEdit from './ArticleEdit'

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact></Route>
        <MyLayout>        
          <Route path="/" component={Home} exact></Route>
          <Route path="/addArticle" component={ArticleEdit} exact></Route>
          <Route path="/addArticle/:id" component={ArticleEdit} exact></Route>
          <Route path="/articleList" component={ArticleList} exact></Route>          
        </MyLayout>
        
      </Switch>
    </Router>
  )
  }

export default Main