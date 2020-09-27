import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { loadUserProfile } from './store';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import HeaderMenuBar from './components/layout/HeaderMenuBar';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';

const Dashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Typography
      component='div'
      style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
    ></Typography>
  );
};

const AppContainer = () => {
  // TODO: Add error handling when authState returns an error
  const userState = useRecoilValue(loadUserProfile);

  return (
    <Router>
      <Fragment>
        <HeaderMenuBar userState={userState} />
        <Container>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Dashboard isAuthenticated={userState.isAuthenticated} />
              )}
            />
            <Route
              exact
              path='/login'
              render={() => (
                <Login isAuthenticated={userState.isAuthenticated} />
              )}
            />
            <Route
              exact
              path='/register'
              render={() => (
                <Register isAuthenticated={userState.isAuthenticated} />
              )}
            />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
};

const App = () => {
  // TODO: Add better fallback component

  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <AppContainer />
      </Suspense>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
