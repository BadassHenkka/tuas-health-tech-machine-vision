import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import HeaderMenuBar from './components/layout/HeaderMenuBar';

const App = () => {
  return (
    <Fragment>
      <HeaderMenuBar />
      <Container>
        <Typography
          component='div'
          style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
        />
      </Container>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
