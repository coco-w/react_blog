import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login'
import Index from './index'


function Main() {
  return (
    <Router>
      <Route path="/login" component={Login} exact></Route>
      <Route path="/index" component={Index} exact></Route>
    </Router>
  )
}

export default Main