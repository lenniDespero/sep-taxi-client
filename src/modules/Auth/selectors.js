export const getIsAuthorized = state => (state.auth.jwtToken ? true : false);

export const getToken = state =>
  state.auth ? (state.auth.jwtToken ? state.auth.jwtToken : null) : null;

export const getError = state => state.auth.error;