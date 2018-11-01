import { createAction } from 'redux-actions';

//регистрация
export const registration = createAction('AUTH/REGISTRATION');
export const registrationRequest = createAction('AUTH/REGISTRATION_REQUEST');
export const registrationSuccess = createAction('AUTH/REGISTRATION_SUCCESS');
export const registrationFailure = createAction('AUTH/REGISTRATION_FAILURE');
//установка значений
export const setUserCredentals = createAction('AUTH/SET_USER_CREDENTIALS');
export const setToken = createAction('AUTH/SET_TOKEN');
//авторизация
export const authorization = createAction('AUTH/AUTHORIZATION');
export const authorizationRequest = createAction('AUTH/AUTHORIZATION_REQUEST');
export const authorizationSuccess = createAction('AUTH/AUTHORIZATION_SUCCESS');
export const authorizationFailure = createAction('AUTH/AUTHORIZATION_FAILURE');
//чистка ошибок
export const clearError = createAction('AUTH/CLEAR_ERROR');
export const clearErrorSuccess = createAction('AUTH/CLEAR_ERROR_SUCCESS');
