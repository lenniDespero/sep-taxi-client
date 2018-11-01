import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { profileSuccess, profileRequest, profileFailure } from './actions';

const isLoading = handleActions(
  {
    [profileRequest]: (_state, action) => true,
    [profileFailure]: (_state, action) => false,
    [profileSuccess]: (_state, action) => false
  },
  false
);

const data = handleActions(
  {
    [profileSuccess]: (_state, action) => action.payload
  },
  null
);

const error = handleActions(
  {
    [profileRequest]: (_state, action) => null,
    [profileFailure]: (_state, action) => action.payload,
    [profileSuccess]: (_state, action) => null
  },
  null
)

export default combineReducers({
  isLoading,
  data,
  error
});
