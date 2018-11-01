import { request } from '../utils/network';

export const profRequest = token => {
  const path = '/user/me';
  const method = 'GET';
  return request({ path: path, method: method, token: token });
};
