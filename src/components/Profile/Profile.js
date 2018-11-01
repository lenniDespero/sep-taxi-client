import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import styles from './Profile.module.css';
import { connect } from 'react-redux';
import {
  getIsLoading,
  getUserData,
  profileRequest,
  getError
} from '../../modules/Profile';
import { getToken } from '../../modules/Auth';

class Profile extends PureComponent {
  componentDidMount() {
    const { profileRequest, token } = this.props;
    profileRequest(token);
  }

  render() {
    const { data, isLoading, error } = this.props;

    return (
      <Card className={styles.card}>
        <h3 className={styles.title}>Профиль</h3>
        <p className={styles.content}>
          ID: {isLoading ? 'Загрузка...' : data ? data.id : null}
        </p>
        <p className={styles.content}>
          Email: {isLoading ? 'Загрузка...' : data ? data.email : null}
        </p>
        {error && <p className={styles.content + ' ' + styles.error}>Error: {error.status} {error.text}</p>}
      </Card>
    );
  }
}

export default connect(
  state => ({
    isLoading: getIsLoading(state),
    data: getUserData(state),
    token: getToken(state),
    error: getError(state)
  }),
  { profileRequest }
)(Profile);
