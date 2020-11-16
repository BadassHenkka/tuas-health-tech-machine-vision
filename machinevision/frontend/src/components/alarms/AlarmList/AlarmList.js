import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import AlarmCard from '../AlarmCard/AlarmCard';
import { fetchAlarmList } from '../../../utils/alarms';
import { authTokenState } from '../../../store';
import { alarmDrawerWidth, alarmCheckInterval } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: alarmDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: alarmDrawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
  },
  drawerHeaderText: {
    fontWeight: 'bold',
  },
  centerAndMt: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorMsg: {
    width: '80%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const AlarmList = ({ open }) => {
  const classes = useStyles();
  const authToken = useRecoilValue(authTokenState).token;
  const {
    data: alarmData,
    refetch: refetchAlarms,
    isLoading: loadingAlarms,
    isError: isAlarmsFetchError,
    error: alarmFetchError,
  } = useQuery(
    'alarmData',
    () => {
      if (open) {
        return fetchAlarmList(authToken);
      }
    },
    // interval for refetching/checking for new alarms
    { refetchInterval: alarmCheckInterval }
  );

  useEffect(() => {
    if (open) {
      refetchAlarms();
    }
  }, [open]);

  let DrawerContent = () => {
    if (loadingAlarms) {
      return (
        <div className={classes.centerAndMt}>
          <CircularProgress />
        </div>
      );
    }

    if (isAlarmsFetchError) {
      let errorMsg = `${alarmFetchError.message}`;
      return (
        <div className={classes.errorMsg}>
          <strong>Error fetching the alarms:</strong>
          <p>{errorMsg}</p>
        </div>
      );
    }

    return (
      <List>
        {!!alarmData &&
          alarmData.data.map((alarm) => {
            return (
              <AlarmCard
                key={alarm.created_at}
                alarm={alarm}
                authToken={authToken}
              />
            );
          })}
      </List>
    );
  };

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerHeader}>
        <Typography className={classes.drawerHeaderText}>ALARMS</Typography>
      </div>
      <Divider />
      <DrawerContent />
    </Drawer>
  );
};

export default AlarmList;
