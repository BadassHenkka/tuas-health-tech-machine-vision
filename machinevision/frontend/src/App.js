import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { loadUserProfile } from './store';

import Container from '@material-ui/core/Container';

import Alerts from './components/layout/Alerts/Alerts';
import DashboardView from './views/DashboardView/DashboardView';
import HeaderMenuBar from './components/layout/HeaderMenuBar/HeaderMenuBar';
import Loader from './components/layout/Loader/Loader';
import Login from './components/accounts/Login/Login';
import Register from './components/accounts/Register/Register';
import Footer from './components/layout/Footer/Footer';

// Alert Options
const alertOptions = {
  timeout: 4000,
  position: 'top center',
  containerStyle: {
    zIndex: 10000,
  },
};

const AppContainer = () => {
  const userState = useRecoilValue(loadUserProfile);

  return (
    <Router>
      <Fragment>
        <HeaderMenuBar userState={userState} />
        <Alerts />
        <Container>
          <div>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <DashboardView isAuthenticated={userState.isAuthenticated} />
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
          <Footer/>
          </div>
        </Container>
      </Fragment>
    </Router>
  );
};

const queryCache = new QueryCache();

const App = () => {
  return (
    <RecoilRoot>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Suspense fallback={<Loader />}>
            <AppContainer />
          </Suspense>
        </AlertProvider>
      </ReactQueryCacheProvider>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
