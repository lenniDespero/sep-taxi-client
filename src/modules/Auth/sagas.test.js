import { registrationFlow, authorizationFlow, errorFlow,authFlow } from './sagas';
import { select, call, put } from 'redux-saga/effects';
import { regRequest, logRequest } from './api';
import { save, load } from '../utils/localstorage';import {
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


describe('errorFlow', () => {
  const iterator = errorFlow();

  it('Первый yield — put(clearErrorSuccess())', () => {
    expect(iterator.next().value).toEqual(put(clearErrorSuccess()));
  });
});


describe('registrationFlow', () => {
  const iterator = registrationFlow(registration({email: "test",password: "test",}));

  it('Первый yield — put(registrationRequest())', () => {
    expect(iterator.next().value).toEqual(put(registrationRequest()));
  });

  it('Второй yield — call(regRequest, action.payload)', () => {
    expect(iterator.next({"email": "test", "password": "test"}).value).toEqual(
      call(regRequest, {"email": "test", "password": "test"})
    );
  });
});

describe('authorizationFlow', () => {
  const iterator = authorizationFlow(authorization({email: "test",password: "test",}));

  it('Первый yield — put(authorizationRequest())', () => {
    expect(iterator.next().value).toEqual(put(authorizationRequest()));
  });

  it('Второй yield — call(logRequest, action.payload)', () => {
    expect(iterator.next({"email": "test", "password": "test"}).value).toEqual(
      call(logRequest, {"email": "test", "password": "test"})
    );
  });
});