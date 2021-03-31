import {
  SAVE_USER, LOG_OUT, SET_AUTH_LOADER, SET_SERVER_ERRORS,
} from '../actions/auth';

const initialState = {
  id: '',
  pseudo: 'Jean',
  token: '', // JWT token
  role: '',
  isLogged: false,
  email: '',
  loading: false,
  errors: {},
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        pseudo: action.pseudo,
        token: action.token,
        role: action.role,
        isLogged: true,
        email: action.email,
        id: action.id,
        errors: {},
      };
    case LOG_OUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        isLogged: false,
        token: null,
        role: null,
        pseudo: null,
        email: null,
        id: null,
        errors: {},
      }; }
    case SET_AUTH_LOADER: {
      return {
        ...state,
        loading: action.bool,
      }; }
    case SET_SERVER_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      }; }
    default:
      return state;
  }
};

export default authReducer;
