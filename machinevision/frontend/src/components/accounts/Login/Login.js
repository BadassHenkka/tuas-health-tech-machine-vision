import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authTokenState, errorState, messageState } from '../../../store';
import { handleLogin } from '../../../utils/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ isAuthenticated }) => {
  const classes = useStyles();
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const setErrorStatus = useSetRecoilState(errorState);
  const setMessage = useSetRecoilState(messageState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuthTokenState({
          token: res.data.token,
        });
        setMessage({
          loginSuccess: `Welcome ${res.data.user.username}!`,
        });
      })
      .catch((err) => {
        localStorage.removeItem('token');
        setAuthTokenState({
          token: null,
        });
        setErrorStatus({
          status: err.response.status,
          msg: err.response.data,
        });
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      {isAuthenticated ? <Redirect to='/' /> : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={onLoginSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to='/register'>
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
