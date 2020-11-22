import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AlarmList from '../../components/alarms/AlarmList/AlarmList';
import WebcamStream from '../../components/streaming/WebcamStream/WebcamStream';
import { alarmDrawerWidth, cameraGrowTimeout } from '../../constants';

import './DashboardView.css';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: alarmDrawerWidth,
  },
  cameraButton: {
    marginTop: 100,
    backgroundColor: '#0d003f',
    color: 'white',
     '&:hover': {
      color: '#eae527',
      background: '#0d003f',
        }
     },
}));

const DashboardView = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  const classes = useStyles();
  const [camEnabled, setCamEnabled] = useState(false);
  const [camBtnDisabled, setCamBtnDisabled] = useState(false);
  const [grow, setGrow] = useState(false);
  const [alarmDrawerOpen, setAlarmDrawerOpen] = useState(false);

  const handleCameraOn = () => {
    setAlarmDrawerOpen(true);
    setCamBtnDisabled(true);
    setGrow(true);
    setCamEnabled(true);
    setTimeout(() => {
      setCamBtnDisabled(false);
    }, cameraGrowTimeout);
  };

  const handleCameraOff = () => {
    setAlarmDrawerOpen(false);
    setCamBtnDisabled(true);
    setGrow(false);
    setTimeout(() => {
      setCamEnabled(false);
      setCamBtnDisabled(false);
    }, cameraGrowTimeout);
  };

  return (
    <Typography component='div' className='dashboard-container'>
      <AlarmList open={alarmDrawerOpen} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: alarmDrawerOpen,
        })}
      >
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ minHeight: '80vh' }}
        >
          <WebcamStream grow={grow} camEnabled={camEnabled} />
          <Button
            disabled={camBtnDisabled}
            className={classes.cameraButton}
            variant='contained'
            size='large'
            onClick={() => {
              camEnabled === false ? handleCameraOn() : handleCameraOff();
            }}
          >
            {camEnabled ? 'Camera off' : 'Camera on'}
          </Button>
        </Grid>
      </main>
    </Typography>
  );
};

export default DashboardView;
