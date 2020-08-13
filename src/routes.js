import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

class PrivateRoute extends Component {
  estaLogado = () => {
    if(localStorage.getItem('TOKEN')) {
      return true
    } else {
      return false;
    }
  }

  render() {
    const { component: Component, ...props } = this.props

    if(this.estaLogado()) {
      return <Component {...props} />
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default function Roteamento() {
  return (
    <Switch>
      <PrivateRoute path="/" component={HomePage} exact/>
      <Route path="/login" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}