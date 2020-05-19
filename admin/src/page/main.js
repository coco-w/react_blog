import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Login from './login'
import MyLayout from '@/page/Layout'
import Home from './Home'
import ArticleList from './ArticleList'
import ArticleEdit from './ArticleEdit'
import UserInfo from './UserInfo'
import Error from './Error'
import Advertisement from './Advertisement'
function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact></Route>
        <MyLayout>        
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/article/addArticle" component={ArticleEdit} exact></Route>
            <Route path="/article/articleList" component={ArticleList} exact></Route>
            <Route path="/userInfo/user" component={UserInfo} exact></Route>
            <Route path="/userInfo/AD" component={Advertisement} exact></Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </MyLayout>
        
      </Switch>
    </Router>
  )
  }

export default Main