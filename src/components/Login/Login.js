import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './Login.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getIsAuthorized,
  getError,
  registration,
  authorization,
  clearError
} from '../../modules/Auth';

class Login extends PureComponent {
  state = {
    authEnabled: true,
    email: '',
    password: '',
    showPassword: false
  };
  
  clearError = () => {
    const {clearError, error} = this.props;

    if (error) {
      clearError();
    }
  }

  handleClickTitle = event => {
    const state = this.state;
    
    this.clearError();
    this.setState({ ...state, authEnabled: !state.authEnabled });
  };

  handleChange = event => {
    const state = this.state;
    
    this.clearError();
    this.setState({
      ...state,
      [event.target.name]: event.target.value,
      error: null
    });
  };

  handleClickShowPassword = event => {
    const state = this.state;

    this.setState({ ...state, showPassword: !state.showPassword });
  };

  handleSubmit = () => {
    const { email, password, authEnabled } = this.state;
    const { registration, authorization } = this.props;
    let params = { email: email, password: password };

    !authEnabled ? registration(params) : authorization(params);
  };

  handlePressEnter = event => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const { isAuthorized, error } = this.props;
    const { authEnabled, email, password, showPassword} = this.state;

    if (isAuthorized) {
      return <Redirect to="/profile" />;
    }

    return (
      <Card className={styles.form}>
        <h5 className={styles.header}>
          <span
            className={
              styles.header_text + ` ${authEnabled ? styles.enabled : ''}`
            }
            onClick={this.handleClickTitle}
          >
            Авторизация
          </span>{' '}
          /{' '}
          <span
            className={
              styles.header_text + ` ${!authEnabled ? styles.enabled : ''}`
            }
            onClick={this.handleClickTitle}
          >
            Регистрация
          </span>
        </h5>
        <CardContent>
          <FormControl className={styles.input + ` ${error && 'error'}`}>
            <InputLabel htmlFor="email">Почта</InputLabel>
            <Input
              name="email"
              value={email}
              onChange={this.handleChange}
              onKeyPress={this.handlePressEnter}
            />
          </FormControl>
          <FormControl className={styles.input + ` ${error && 'error'}`}>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={this.handleChange}
              onKeyPress={this.handlePressEnter}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {error && <p className={styles.error}>{error.status}: {error.text}</p>}

          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={this.handleSubmit}
          >
            {authEnabled ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state),
    error: getError(state),
  }),
  { registration, authorization, clearError }
)(Login);
