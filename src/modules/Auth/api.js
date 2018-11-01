import { request } from '../utils/network';

//регистрация
export const regRequest = credits => {
  const path = '/user';
  const method = 'POST';
  let body = JSON.stringify(credits);
  return request({ path: path, method: method, body: body });
};

//авторизация
export const logRequest = credits => {
  const path = '/session';
  const method = 'POST';
  let body = JSON.stringify(credits);
  return request({ path: path, method: method, body: body });
};
