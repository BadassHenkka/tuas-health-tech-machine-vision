import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authTokenState, errorState, messageState } from '../../../store';
import { handleRegister } from '../../../utils/auth';

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
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ isAuthenticated }) => {
  const classes = useStyles();
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const setErrorStatus = useSetRecoilState(errorState);
  const setMessage = useSetRecoilState(messageState);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) {
      setMessage({
        passwordsDontMatch: 'Passwords do not match.',
      });
    } else {
      handleRegister(username, email, password)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          setAuthTokenState({
            token: res.data.token,
          });
          setMessage({
            registerSuccess:
              'Registered successfully. Request account activation from the site admin.',
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
    }
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
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='userame'
                label='Username'
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Type password again'
                type='password'
                id='password2'
                autoComplete='current-password'
                onChange={(event) => setPassword2(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={onRegisterSubmit}
          >
            Register
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
