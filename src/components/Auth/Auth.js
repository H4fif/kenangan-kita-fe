import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signIn, signUp } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !showPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !isSignUp);
    setShowPassword(false);
  };

  const onGoogleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleFailure = (response) => {
    console.log('google submit failed', response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />

            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            clientId="603600989141-4i80guue7tmo6vfdb7vjrm1sb27h68da.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : 'Don\t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
