import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Stream from '../../components/streaming/Stream/Stream';

import './DashboardView.css';

const DashboardView = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  const [camEnabled, setCamEnabled] = useState(false);

  return (
    <Typography component='div' className='dashboard-container'>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        style={{ minHeight: '80vh' }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={() => setCamEnabled(!camEnabled)}
        >
          {camEnabled ? 'Turn off' : 'Turn on'}
        </Button>
        {camEnabled && (
          <Box mb={3}>
            <Stream />
          </Box>
        )}
      </Grid>
    </Typography>
  );
};

export default DashboardView;
