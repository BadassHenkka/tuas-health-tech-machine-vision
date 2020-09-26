import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import HeaderMenuBar from './components/layout/HeaderMenuBar';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';

const Dashboard = () => {
  return (
    <Typography
      component='div'
      style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
    ></Typography>
  );
};

const App = () => {
  return (
    <Router>
      <Fragment>
        <HeaderMenuBar />
        <Container>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
