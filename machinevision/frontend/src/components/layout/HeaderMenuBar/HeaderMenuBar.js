import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authTokenState, errorState, messageState } from '../../../store';
import { handleLogout } from '../../../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#0d003f',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonAccount: {
    marginRight: 10,
    backgroundColor: 'white',
    color: '#0d003f',
    '&:hover': {
      color: '#0d003f',
      background: '#eae527',
    },
  },
  buttonLogout: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      color: '#0d003f',
      background: 'red',
    },
  },
  rightName: {
    marginRight: 10,
    color: '#eae527',
  },
}));

const HeaderMenuBar = ({ userState }) => {
  const classes = useStyles();
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const setErrorStatus = useSetRecoilState(errorState);
  const setMessage = useSetRecoilState(messageState);

  const onLogoutClick = () => {
    handleLogout(userState.token)
      .then(() => {
        localStorage.removeItem('token');
        setAuthTokenState({
          token: null,
        });
        setMessage({
          logoutSuccess: 'Logged out successfully.',
        });
      })
      .catch((err) => {
        // TODO: Test what message comes from this logout failure
        // and add it to the alerts component (input wrong token for example)
        setErrorStatus({
          status: err.response.status,
          msg: err.response.data,
        });
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Link
            component={RouterLink}
            to='/'
            color='inherit'
            underline='none'
            variant='h6'
            className={classes.title}
          >
            Health Tech Lab - Machine vision
          </Link>
          {userState.isAuthenticated && (
            <>
              <Typography className={classes.rightName}>
                Logged in as {userState.user.username}
              </Typography>
              {/* TODO: Add account view and direct there on click */}
              <Button
                className={classes.buttonAccount}
                onClick={() => alert('Go to account view!')}
                variant='contained'
                size='small'
              >
                Account
              </Button>
              <Button
                onClick={onLogoutClick}
                className={classes.buttonLogout}
                variant='contained'
                size='small'
              >
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderMenuBar;
