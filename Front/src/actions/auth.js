export const LOG_IN = 'LOG_IN';
export const SUBSCRIBE_USER = 'SUBSCRIBE_USER';
export const SAVE_USER = 'SAVE_USER';
export const LOG_OUT = 'LOG_OUT';
export const SET_AUTH_LOADER = 'SET_AUTH_LOADER';
export const SET_SERVER_ERRORS = 'SET_SERVER_ERRORS';
export const TOKEN_LOG_IN = 'TOKEN_LOG_IN';

export const logIn = ({ email, password, remember }) => ({
  type: LOG_IN,
  email,
  password,
  remember,
});

export const saveUser = ({
  token, pseudo, role, email, id,
}) => ({
  type: SAVE_USER,
  token,
  pseudo,
  role,
  email,
  id,
});

export const subscribeUser = ({ email, password, pseudo }) => ({
  type: SUBSCRIBE_USER,
  email,
  password,
  pseudo,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setAuthLoader = (bool) => ({
  type: SET_AUTH_LOADER,
  bool,
});

export const setServerErrors = (errors) => ({
  type: SET_SERVER_ERRORS,
  errors,
});

export const tokenLogIn = (token) => ({
  type: TOKEN_LOG_IN,
  token,
});
