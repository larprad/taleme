// == Import npm
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// == Import reducer
import allReducers from '../reducer';

// == Import middlewares
import readStoryMiddleware from '../middlewares/readStoryMiddleware';
import createStoryMiddleware from '../middlewares/createStoryMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

const store = createStore(allReducers,
  composeWithDevTools(applyMiddleware(
    authMiddleware,
    readStoryMiddleware,
    createStoryMiddleware,
  )));

export default store;
