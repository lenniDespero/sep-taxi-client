import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { setToken, setUserCredentals, clearErrorSuccess, authorizationFailure, registrationFailure } from './actions';

const id = handleActions(
  {
    [setUserCredentals]: (_state, action) => action.payload.id
  },
  null
);

const email = handleActions(
  {
    [setUserCredentals]: (_state, action) => action.payload.email
  },
  null
);

const jwtToken = handleActions(
  {
    [setToken]: (_state, action) => action.payload
  },
  null
);

const error = handleActions(
  {
    [clearErrorSuccess]: (_state, action) => null,
    [authorizationFailure]: (_state, action) => action.payload,
    [registrationFailure]: (_state, action) => action.payload,
  },
  null
)

export default combineReducers({
  id,
  email,
  jwtToken,
  error
});
