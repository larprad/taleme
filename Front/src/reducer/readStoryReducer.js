/* eslint-disable max-len */
/* eslint-disable no-console */
// == Import actions
import {
  CHANGE_CURRENT_BLOCK,
  SAVE_ALL_STORIES,
  SET_LOADER,
  SAVE_ONE_STORY,
  SET_INITIAL_BLOCK,
  SET_STORY_LOADED,
  SET_STORY_NOT_FOUND,
  SAVE_DURATION,
  SAVE_THEMES,
  SAVE_DURATION_SELECTED_FILTER,
  SAVE_THEMES_SELECTED_FILTER,
} from '../actions/readStory';

// == Import utils
import { getBlockFromId, getInitialBlock } from '../utils/storyUtils';
import { FILL_STORY_REDUCER } from '../actions/createStory';

const initialState = {
  // NEW! It is usefull to know if there is an ongoing story
  onGoing: true,
  // NEW! Useful to know if the list of all stories has been loaded or not
  loading: true,
  // NEW! Useful to know if the a current story have been newly loaded.
  // Workaround for infinite loading loop
  storyLoaded: false,
  // NEW! Story not found is useful to dipsplay 404 indication to the user
  // in the Read Block part of the application
  storyNotFound: false,
  storiesList: [],
  filteredStoriesList: [],
  durationList: [],
  themesList: [],
  currentStory: {
    storyInformations: {
      id: null,
      title: '',
      summary: '',
      image: null,
      status: null,
      rating: null,
      slug: '',
      theme: [],
      duration: {},
      user: {},
    },
    blocks: [],
    choices: [],
  },
  currentBlock: {
    id: '',
    title: '',
    text: '',
    image: '',
    type: '',
    idChoices: [],
  },
  themesFilter: [],
  durationFilter: null,
};

const readStoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_ALL_STORIES: {
      return {
        ...state,
        storiesList: action.storiesList,
      };
    }
    case SET_LOADER: {
      return {
        ...state,
        loading: action.bool,
      };
    }
    case SAVE_ONE_STORY: {
      return {
        ...state,
        currentStory: action.story,
      };
    }
    case CHANGE_CURRENT_BLOCK: {
      const newCurrentBlock = getBlockFromId(
        action.blockId,
        action.choiceId,
        state.currentStory,
      );
      // Checking is the story is still onGoing
      const onGoing = newCurrentBlock.idChoices.length > 0;
      return { ...state, currentBlock: newCurrentBlock, onGoing };
    }
    case SET_INITIAL_BLOCK: {
      const initialBlock = getInitialBlock(state.currentStory);
      return { ...state, currentBlock: initialBlock, onGoing: true };
    }
    case SET_STORY_LOADED: {
      return {
        ...state,
        storyLoaded: action.bool,
        onGoing: true,
      };
    }
    case SET_STORY_NOT_FOUND: {
      return {
        ...state,
        storyNotFound: action.bool,
      };
    }
    case SAVE_DURATION: {
      return {
        ...state,
        durationList: action.duration,
      };
    }
    case SAVE_THEMES: {
      return {
        ...state,
        themesList: action.themes,
      };
    }

    case SAVE_DURATION_SELECTED_FILTER: {
      return {
        ...state,
        durationFilter: action.duration,
      };
    }

    case SAVE_THEMES_SELECTED_FILTER: {
      return {
        ...state,
        themesFilter: action.themes,
      };
    }

    case FILL_STORY_REDUCER: {
      return {
        ...state,
        currentStory: action.storyToTest,
      };
    }

    default: return state;
  }
};

export default readStoryReducer;
