export const GET_USER_STORIES = 'GET_USER_STORIES';
export const SAVE_USER_STORIES = 'SAVE_USER_STORIES';
export const UPDATE_STORY_INFOS = 'UPDATE_STORY_INFOS';
export const SAVE_DURATION_SELECTED = 'SAVE_DURATION_SELECTED';
export const SAVE_THEMES_SELECTED = 'SAVE_THEMES_SELECTED';
export const CREATE_NEW_STORY = 'CREATE_NEW_STORY';
export const SAVE_ONE_USER_STORY = 'SAVE_ONE_USER_STORY';
export const RESET_DASHBOARD = 'RESET_DASHBOARD';
export const GET_ONE_USER_STORY = 'GET_ONE_USER_STORY';
export const SET_CREATION_LOADER = 'SET_CREATION_LOADER';
export const DELETE_CHOICE = 'DELETE_CHOICE';
export const UPDATE_BLOCK_INFOS = 'UPDATE_BLOCK_INFOS';
export const UPDATE_CHOICES_INFOS = 'UPDATE_CHOICES_INFOS';
export const DELETE_CHOICE_INFOS = 'DELETE_CHOICE_INFOS';
export const ADD_NEW_CHOICE_INFOS = 'ADD_NEW_CHOICE_INFOS';
export const SET_CURRENT_CREATED_BLOCK = 'SET_CURRENT_CREATED_BLOCK';
export const SET_CURRENT_CREATED_CHOICES = 'SET_CURRENT_CREATED_CHOICES';
export const SAVE_ON_GOING_STORY = 'SAVE_ON_GOING_STORY';
export const SAVE_UPDATED_STORY = 'SAVE_UPDATED_STORY';
export const DELETE_ONE_STORY = 'DELETE_ONE_STORY';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const PATCH_BLOCK_INFOS = 'PATCH_BLOCK_INFOS';
export const POST_CHOICES_INFOS = 'POST_CHOICES_INFOS';
export const SAVE_NEW_CHOICES = 'SAVE_NEW_CHOICES';
export const PATCH_CHOICES_INFOS = 'PATCH_CHOICES_INFOS';
export const POST_BLOCK_INFOS = 'POST_BLOCK_INFOS';
export const LINK_CHOICE_TO_BLOCK = 'LINK_CHOICE_TO_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const GET_ONE_USER_STORY_BY_ID = 'GET_ONE_USER_STORY_BY_ID';
export const PUBLISH_STORY = 'PUBLISH_STORY';
export const SAVE_CHOSEN_IMAGE_STORY = 'SAVE_CHOSEN_IMAGE_STORY';
export const SAVE_IMAGE_BLOCK = 'SAVE_IMAGE_BLOCK';
export const MANAGE_TEST_STORY = 'MANAGE_TEST_STORY';
export const FILL_STORY_REDUCER = 'FILL_STORY_REDUCER';
export const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
export const SET_CREATE_STORY_LOADED = 'SET_CREATE_STORY_LOADED';

export const getUserStories = (token) => ({
  type: GET_USER_STORIES,
  token,
});

export const saveUserStories = (userStories) => ({
  type: SAVE_USER_STORIES,
  userStories,
});

export const updateStoryInfos = (newValue, name) => ({
  type: UPDATE_STORY_INFOS,
  newValue,
  name,
});

export const saveDurationSelected = (duration) => ({
  type: SAVE_DURATION_SELECTED,
  duration,
});

export const saveThemesSelected = (themes) => ({
  type: SAVE_THEMES_SELECTED,
  themes,
});

export const deleteChoice = (idChoice) => ({
  type: DELETE_CHOICE,
  idChoice,
});

export const createNewStory = () => ({
  type: CREATE_NEW_STORY,
});

export const saveOneUserStory = (currentCreatedStory) => ({
  type: SAVE_ONE_USER_STORY,
  currentCreatedStory,
});

export const resetDashboard = () => ({
  type: RESET_DASHBOARD,
});

export const getOneUserStoryBySlug = (slug) => ({
  type: GET_ONE_USER_STORY,
  slug,
});

export const setCreationLoader = (bool) => ({
  type: SET_CREATION_LOADER,
  bool,
});

export const updateBlockInfos = (name, newValue) => ({
  type: UPDATE_BLOCK_INFOS,
  newValue,
  name,
});

export const updateChoicesInfos = (id, newValue) => ({
  type: UPDATE_CHOICES_INFOS,
  newValue,
  id,
});

export const deleteChoiceInfos = (id) => ({
  type: DELETE_CHOICE_INFOS,
  id,
});

export const addNewChoiceInfos = (blockId) => ({
  type: ADD_NEW_CHOICE_INFOS,
  blockId,
});

export const setCurrentCreatedBlock = (id, fromChoiceId) => ({
  type: SET_CURRENT_CREATED_BLOCK,
  id,
  fromChoiceId,
});

export const setCurrentCreatedChoice = (id) => ({
  type: SET_CURRENT_CREATED_CHOICES,
  id,
});

export const saveOnGoingStory = () => ({
  type: SAVE_ON_GOING_STORY,
});

export const saveUpdatedStory = (storyUpdated) => ({
  type: SAVE_UPDATED_STORY,
  storyUpdated,
});

export const deleteOneStory = (storyId) => ({
  type: DELETE_ONE_STORY,
  storyId,
});

export const addNotification = (message) => ({
  type: ADD_NOTIFICATION,
  message,
});

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});

export const patchBlockInfos = () => ({
  type: PATCH_BLOCK_INFOS,
});

export const postChoicesInfos = (blockId) => ({
  type: POST_CHOICES_INFOS,
  blockId,
});

export const saveNewChoices = (choices) => ({
  type: SAVE_NEW_CHOICES,
  choices,
});

export const patchChoicesInfos = () => ({
  type: PATCH_CHOICES_INFOS,
});

export const postBlockInfos = () => ({
  type: POST_BLOCK_INFOS,
});

export const linkChoiceToBlock = (choiceId, toBlockId) => ({
  type: LINK_CHOICE_TO_BLOCK,
  choiceId,
  toBlockId,
});

export const deleteBlock = (blockId) => ({
  type: DELETE_BLOCK,
  blockId,
});

export const getOneUserStoryById = (storyId) => ({
  type: GET_ONE_USER_STORY_BY_ID,
  storyId,
});

export const publishStory = (storyStatus) => ({
  type: PUBLISH_STORY,
  storyStatus,
});

export const saveChosenImageStory = (webformatURL) => ({
  type: SAVE_CHOSEN_IMAGE_STORY,
  webformatURL,
});

export const saveImageBlock = (webformatURL) => ({
  type: SAVE_IMAGE_BLOCK,
  webformatURL,
});

export const manageTestStory = () => ({
  type: MANAGE_TEST_STORY,
});

export const fillReadReducer = (storyToTest) => ({
  type: FILL_STORY_REDUCER,
  storyToTest,
});

export const setCreateErrors = (errors) => ({
  type: SET_CREATE_ERRORS,
  errors,
});

export const setCreateStoryLoaded = (bool) => ({
  type: SET_CREATE_STORY_LOADED,
  bool,
});
