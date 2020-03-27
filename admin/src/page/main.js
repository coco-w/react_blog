import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Login from './login'
import MyLayout from './Layout'
import AddArticle from './AddArticle'
import Home from './Home'
function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact></Route>
        <MyLayout>        
          <Route path="/" component={Home} exact></Route>
          <Route path="/addArticle" component={AddArticle} exact></Route>
        </MyLayout>
        
      </Switch>
    </Router>
  )
}

export default Main