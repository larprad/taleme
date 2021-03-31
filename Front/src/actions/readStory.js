// Action type
export const GET_ALL_STORIES = 'GET_ALL_STORIES';
export const SAVE_ALL_STORIES = 'SAVE_ALL_STORIES';
export const SET_LOADER = 'SET_LOADER';
export const GET_ONE_STORY = 'GET_ONE_STORY';
export const SAVE_ONE_STORY = 'SAVE_ONE_STORY';
export const GET_ONE_BLOCK = 'GET_ONE_BLOCK';
export const CHANGE_CURRENT_BLOCK = 'CHANGE_CURRENT_BLOCK';
export const SET_INITIAL_BLOCK = 'SET_INITIAL_BLOCK';
export const SET_STORY_LOADED = 'SET_STORY_LOADED';
export const SET_STORY_NOT_FOUND = 'SET_STORY_NOT_FOUND';
export const GET_DURATION = 'GET_DURATION';
export const SAVE_DURATION = 'SAVE_DURATION';
export const GET_THEMES = 'GET_THEMES';
export const SAVE_THEMES = 'SAVE_THEMES';
export const GET_STORIES_BY_DURATION = 'GET_STORY_BY_DURATION';
export const SAVE_DURATION_SELECTED_FILTER = 'SAVE_DURATION_SELECTED_FILTER';
export const SAVE_THEMES_SELECTED_FILTER = 'SAVE_THEMES_SELECTED_FILTER';
export const SET_FILTERED_STORIES = 'SET_FILTERED_STORIES';

// Action creator
export const getAllStories = () => ({
  type: GET_ALL_STORIES,
});

export const saveAllStories = (storiesList) => ({
  type: SAVE_ALL_STORIES,
  storiesList,
});

export const setLoader = (bool) => ({
  type: SET_LOADER,
  bool,
});

export const getOneStory = (slug) => ({
  type: GET_ONE_STORY,
  slug,
});

export const saveOneStory = (story) => ({
  type: SAVE_ONE_STORY,
  story,
});

export const getOneBlock = (blockId) => ({
  type: GET_ONE_BLOCK,
  blockId,
});

export const changeCurrentBlock = (blockId, choiceId) => ({
  type: CHANGE_CURRENT_BLOCK,
  choiceId,
  blockId,
});

export const setInitialBlock = () => ({
  type: SET_INITIAL_BLOCK,
});

export const setStoryLoaded = (bool) => ({
  type: SET_STORY_LOADED,
  bool,
});

export const setStoryNotFound = (bool) => ({
  type: SET_STORY_NOT_FOUND,
  bool,
});

export const getDuration = () => ({
  type: GET_DURATION,
});

export const saveDuration = (duration) => ({
  type: SAVE_DURATION,
  duration,
});

export const getThemes = () => ({
  type: GET_THEMES,
});

export const saveThemes = (themes) => ({
  type: SAVE_THEMES,
  themes,
});

export const saveDurationSelectedFilter = (duration) => ({
  type: SAVE_DURATION_SELECTED_FILTER,
  duration,
});

export const saveThemesSelectedFilter = (themes) => ({
  type: SAVE_THEMES_SELECTED_FILTER,
  themes,
});
