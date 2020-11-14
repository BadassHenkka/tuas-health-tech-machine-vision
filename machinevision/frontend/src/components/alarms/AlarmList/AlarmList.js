import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AlarmCard from '../AlarmCard/AlarmCard';
import { alarmDrawerWidth } from '../../../constants';

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
}));

const alarmData = [
  {
    created_at: '10:00',
    message: 'Aaargh Alert!',
    acknowledged: false,
  },
  {
    created_at: '11:00',
    message: 'Blaargh Alert!',
    acknowledged: false,
  },
  {
    created_at: '12:00',
    message: 'Wooaaah Alert!',
    acknowledged: false,
  },
  {
    created_at: '13:00',
    message: 'Gaassh Alert!',
    acknowledged: true,
  },
  {
    created_at: '14:00',
    message: 'Brraap Alert!',
    acknowledged: true,
  },
  {
    created_at: '15:00',
    message: 'Aaargh Alert!',
    acknowledged: true,
  },
  {
    created_at: '16:00',
    message: 'Blaargh Alert!',
    acknowledged: true,
  },
  {
    created_at: '17:00',
    message: 'Wooaaah Alert!',
    acknowledged: true,
  },
  {
    created_at: '18:00',
    message: 'Gaassh Alert!',
    acknowledged: true,
  },
  {
    created_at: '19:00',
    message: 'Brraap Alert!',
    acknowledged: true,
  },
];

const AlarmList = ({ open }) => {
  const classes = useStyles();

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
      <List>
        {alarmData.map((alarm) => {
          return <AlarmCard key={alarm.created_at} alarm={alarm} />;
        })}
      </List>
    </Drawer>
  );
};

export default AlarmList;
