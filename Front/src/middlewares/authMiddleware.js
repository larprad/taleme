/* eslint-disable no-console */
// == Imports npm
import axios from 'axios';

// == Import utils
import { decodeToken, tokenHasNotExpired } from '../utils/authUtils';

// == Import action creators
import {
  LOG_IN, saveUser, SUBSCRIBE_USER, logIn, setAuthLoader, setServerErrors, TOKEN_LOG_IN, logOut,
} from '../actions/auth';
import { getUserStories } from '../actions/createStory';

const API_URL = 'http://34.228.57.17/Vous-etes-le-heros/Back/Heroes_App/public/api/';
// const API_URL = 'http://sebastien-duclut.vpnuser.lan/App_Heroes/Vous-etes-le-heros/Back/Heroes_App/public/api/';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN: {
      const { email, password, remember } = action;
      const logInRequest = `${API_URL}login_check`;
      store.dispatch(setAuthLoader(true));
      axios.post(logInRequest, { username: email, password })
        .then((response) => {
          const { token } = response.data;
          const {
            roles, username, pseudo, id,
          } = decodeToken(token);
          store.dispatch(saveUser({
            email: username, id, pseudo, role: roles, token,
          }));
          store.dispatch(setServerErrors({}));
          store.dispatch(getUserStories(token));
          if (remember) {
            localStorage.setItem('token', token);
          }
        })
        .catch((error) => {
          if (error.response.status) {
            console.log(error);
            store.dispatch(setServerErrors(error.response.data));
          }
        })
        .finally(() => {
          store.dispatch(setAuthLoader(false));
        });
    }
      next(action);
      break;
    case SUBSCRIBE_USER: {
      store.dispatch(setAuthLoader(true));
      const { email, password, pseudo } = action;
      const subscribeRequest = `${API_URL}users/subscribe`;
      axios.post(subscribeRequest, { email, password, pseudo })
        .then(() => {
          store.dispatch(setServerErrors({}));
          store.dispatch(logIn({ email, password }));
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422) {
            store.dispatch(setServerErrors(error.response.data));
          }
        })
        .finally(() => {
          store.dispatch(setAuthLoader(false));
        });
    }
      next(action);
      break;
    case TOKEN_LOG_IN: {
      try {
        const {
          roles, username, pseudo, id, exp,
        } = decodeToken(action.token);
        if (tokenHasNotExpired(exp)) {
          store.dispatch(saveUser({
            email: username, id, pseudo, role: roles, token: action.token,
          }));
          store.dispatch(getUserStories(action.token));
        }
        else {
          store.dispatch(logOut());
        }
      }
      catch (error) {
        console.log('Automatic token login error, please login manually');
        console.log(error);
      }
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};

export default authMiddleware;
