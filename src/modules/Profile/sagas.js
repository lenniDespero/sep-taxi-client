import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { profileFailure, profileSuccess, profileRequest } from './actions';
import { profRequest } from './api';

function* fetchProfile() {
  yield takeEvery(profileRequest, profileFlow);
}

export function* profileFlow(action) {
  try {
      let request = yield call(profRequest, action.payload);
      if (request && request.ok) {
        yield put(profileSuccess(request));
      }
  } catch (wtf) {
    yield put(profileFailure({status: wtf.status, text: wtf.text}));
  }
}

export default function*() {
  yield fork(fetchProfile);
}
