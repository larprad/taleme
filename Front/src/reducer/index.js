import { combineReducers } from 'redux';

import readStory from './readStoryReducer';
import createStory from './createStoryReducer';
import auth from './authReducer';

export default combineReducers({ readStory, createStory, auth });
