import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  registration,
  authorization,
  authorizationRequest,
  authorizationFailure,
  authorizationSuccess,
  setUserCredentals,
  setToken,
  clearError,
  clearErrorSuccess
} from './actions';
import { regRequest, logRequest } from './api';
import { save, load } from '../utils/localstorage';

//токен
export function* authFlow() {
  let token;
  token = yield call(load);

  if (token) {
    yield put(setToken(token));
  }
}

//подписка на регистрация
function* fetchRegistration() {
  yield takeEvery(registration, registrationFlow);
}

//подписка на авторизацию
function* fetchAuthorization() {
  yield takeEvery(authorization, authorizationFlow);
}

//ошибки
function* fetchError() {
  yield takeEvery(clearError, errorFlow);
}

//чистка ошибок
export function* errorFlow() {
  try {
    yield put(clearErrorSuccess());
  } catch (wtf) {}
}

//регистрация
export function* registrationFlow(action) {
  try {
    yield put(registrationRequest());

    let request = yield call(regRequest, action.payload);

    if (request && request.ok) {
      yield put(registrationSuccess());
      yield put(authorization(action.payload));
    }
  } catch (wtf) {
    yield put(
      registrationFailure({ status: wtf.status, text: wtf.statusText })
    );
  }
}

//авторизация
export function* authorizationFlow(action) {
  try {
    yield put(authorizationRequest());
    let request = yield call(logRequest, action.payload);

    if (request && request.ok) {
      yield put(authorizationSuccess());
      yield put(
        setUserCredentals({ email: request.user.email, id: request.user.id })
      );
      yield put(setToken(request.token));
      yield call(save, request.token);
    }
  } catch (wtf) {
    yield put(
      authorizationFailure({ status: wtf.status, text: wtf.statusText })
    );
  }
}

export default function*() {
  yield fork(fetchAuthorization); //авторизация
  yield fork(fetchRegistration); //регистрация
  yield fork(authFlow); //токен
  yield fork(fetchError); //ошибки
}
