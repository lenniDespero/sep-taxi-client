import { createAction } from 'redux-actions';

export const profileRequest = createAction('PROFILE/REQUEST');
export const profileSuccess = createAction('PROFILE/SUCCESS');
export const profileFailure = createAction('PROFILE/FAILURE');
