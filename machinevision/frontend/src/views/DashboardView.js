import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import WebcamStream from '../components/streaming/WebcamStream';

const DashboardView = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  const [camEnabled, setCamEnabled] = useState(false);

  return (
    <Typography
      component='div'
      style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
    >
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        style={{ minHeight: '80vh' }}
      >
        {camEnabled && (
          <Box mb={3}>
            <WebcamStream />
          </Box>
        )}
        <Button
          variant='contained'
          color='primary'
          onClick={() => setCamEnabled(!camEnabled)}
        >
          {camEnabled ? 'Turn off' : 'Turn on'}
        </Button>
      </Grid>
    </Typography>
  );
};

export default DashboardView;
