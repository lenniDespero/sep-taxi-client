import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import styles from './Router.module.css'
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';

class Router extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Switch>
          <PrivateRoute  path="/profile" component={Profile} />
          <Route path="/" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
