import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
  iconAndText: {
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    display: 'inline-block',
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
  acknowledgedTrue: {
    color: 'green',
  },
  acknowledgedFalse: {
    color: 'red',
  },
}));

const AlarmCard = ({ alarm }) => {
  const classes = useStyles();

  return (
    <ListItem button className={classes.item}>
      <Container>
        <ListItemIcon
          className={classes.iconAndText}
          style={!alarm.acknowledged ? { color: 'red' } : { color: 'green' }}
        >
          <WarningIcon className={classes.icon} />
          <ListItemText primary='Alarm' />
        </ListItemIcon>
      </Container>
      <Container>
        <Typography>
          <span className={classes.bold}>Time: </span>
          {alarm.created_at}
        </Typography>
        <Typography>
          <span className={classes.bold}>Acknowledged: </span>
          <span
            className={
              alarm.acknowledged
                ? classes.acknowledgedTrue
                : classes.acknowledgedFalse
            }
          >
            {alarm.acknowledged ? 'True' : 'False'}
          </span>
        </Typography>
        <Divider className={classes.divider} />
        <Typography>{alarm.message}</Typography>
      </Container>
    </ListItem>
  );
};

export default AlarmCard;
