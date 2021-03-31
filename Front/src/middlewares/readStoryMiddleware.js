/* eslint-disable no-console */

import axios from 'axios';

import {
  GET_ALL_STORIES,
  saveAllStories,
  setLoader,
  GET_ONE_STORY,
  saveOneStory,
  setInitialBlock,
  setStoryLoaded,
  setStoryNotFound,
  GET_DURATION,
  saveDuration,
  GET_THEMES,
  saveThemes,
  GET_STORIES_BY_DURATION,
} from '../actions/readStory';

import { MANAGE_TEST_STORY, fillReadReducer } from '../actions/createStory';

import { getStoryIdFromSlug, checkStoryIntegrity } from '../utils/storyUtils';

const API_URL = 'http://34.228.57.17/Vous-etes-le-heros/Back/Heroes_App/public/api/';
// const API_URL = 'http://sebastien-duclut.vpnuser.lan/App_Heroes/Vous-etes-le-heros/Back/Heroes_App/public/api/';

const readStoryMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_STORIES: {
      store.dispatch(setLoader(true));
      const requestAllStories = `${API_URL}stories`;
      axios.get(requestAllStories)
        .then((response) => {
          store.dispatch(saveAllStories(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(setLoader(false));
        });
      next(action);
      break; }
    case GET_ONE_STORY: {
      const { storiesList } = store.getState().readStory;
      const storyId = getStoryIdFromSlug(action.slug, storiesList);
      const requestOneStory = `${API_URL}stories/${storyId}`;
      store.dispatch(setStoryLoaded(false));
      store.dispatch(setStoryNotFound(false));
      axios.get(requestOneStory)
        .then((response) => {
          const story = response.data;
          // Check if story is valid to avoid whole app crash.
          const storyErrors = checkStoryIntegrity(story);
          if (storyErrors.length === 0) {
            store.dispatch(saveOneStory(story));
            store.dispatch(setInitialBlock());
          }
          else {
            console.log('---------STORY-ERRORS---------');
            storyErrors.forEach((error) => console.log(error));
            console.log('------------------------------');
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            store.dispatch(setStoryNotFound(true));
          }
        })
        .finally(() => {
          store.dispatch(setStoryLoaded(true));
        });
      next(action);
      break; }

    case GET_DURATION: {
      axios.get(`${API_URL}durations`)
        .then((response) => {
          store.dispatch(saveDuration(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case GET_THEMES: {
      axios.get(`${API_URL}themes`)
        .then((response) => {
          store.dispatch(saveThemes(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case GET_STORIES_BY_DURATION: {
      store.dispatch(setLoader(true));
      const requestStoriesByDuration = `${API_URL}stories`;
      axios.get(requestStoriesByDuration)
        .then((response) => {
          store.dispatch(saveAllStories(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(setLoader(false));
        });
      next(action);
      break;
    }

    case MANAGE_TEST_STORY: {
      const storyToTest = store.getState().createStory.currentCreatedStory;
      store.dispatch(fillReadReducer(storyToTest));
      store.dispatch(setInitialBlock());
      next(action);
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default readStoryMiddleware;
