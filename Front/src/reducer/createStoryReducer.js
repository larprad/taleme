import {
  SAVE_USER_STORIES,
  UPDATE_STORY_INFOS,
  SAVE_DURATION_SELECTED,
  SAVE_THEMES_SELECTED,
  SAVE_ONE_USER_STORY,
  RESET_DASHBOARD,
  SET_CREATION_LOADER,
  UPDATE_BLOCK_INFOS,
  UPDATE_CHOICES_INFOS,
  DELETE_CHOICE_INFOS,
  ADD_NEW_CHOICE_INFOS,
  SET_CURRENT_CREATED_BLOCK,
  SET_CURRENT_CREATED_CHOICES,
  SAVE_UPDATED_STORY,
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  SAVE_CHOSEN_IMAGE_STORY,
  SAVE_IMAGE_BLOCK,
  SET_CREATE_ERRORS,
  SET_CREATE_STORY_LOADED,
} from '../actions/createStory';

const initialState = {
  loading: false,
  userStoriesList: [],
  storyTheme: [],
  notification: '',
  errors: {},
  currentCreatedStory: {
    storyInformations: {
      id: null,
      title: '',
      summary: '',
      image: null,
      status: null,
      rating: null,
      slug: '',
      idThemes: [],
      idDuration: null,
      user: {},
    },
    blocks: [],
    choices: [],
  },
  currentCreatedBlock: {
  },
  currentCreatedChoices: [],
  createStoryLoaded: false,
};

const createStoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER_STORIES:
      return {
        ...state,
        userStoriesList: action.userStories,
      };

      // TODO TROUVER MIEUUUX ( ╯°□°)╯ ┻━━┻
    case UPDATE_STORY_INFOS: {
      const tempStoryInfo = { ...state.currentCreatedStory.storyInformations };
      const newStoryInfo = { ...tempStoryInfo, [action.name]: action.newValue };
      const newCurrentCreatedStory = {
        ...state.currentCreatedStory, storyInformations: newStoryInfo,
      };
      return {
        ...state,
        currentCreatedStory: newCurrentCreatedStory,
      };
    }

    case SAVE_DURATION_SELECTED: {
      const tempStoryInfo = { ...state.currentCreatedStory.storyInformations };
      const newStoryInfo = { ...tempStoryInfo, idDuration: action.duration };
      const newCurrentCreatedStory = {
        ...state.currentCreatedStory, storyInformations: newStoryInfo,
      };
      return {
        ...state,
        currentCreatedStory: newCurrentCreatedStory,
      }; }

    case SAVE_THEMES_SELECTED: {
      const tempStoryInfo = { ...state.currentCreatedStory.storyInformations };
      const newStoryInfo = { ...tempStoryInfo, idThemes: action.themes };
      const newCurrentCreatedStory = {
        ...state.currentCreatedStory, storyInformations: newStoryInfo,
      };
      return {
        ...state,
        currentCreatedStory: newCurrentCreatedStory,
      }; }

    case SAVE_ONE_USER_STORY: {
      return {
        ...state,
        currentCreatedStory: action.currentCreatedStory,
      }; }

    case RESET_DASHBOARD: {
      const tempStoryInfo = { ...state.currentCreatedStory.storyInformations };
      const newStoryInfo = {
        ...tempStoryInfo,
        id: null,
        title: '',
        summary: '',
        idThemes: [],
        idDuration: null,
        slug: '',
        image: null,
        status: null,
      };
      const newCreatedStory = {
        ...state.currentCreatedStory,
        storyInformations: newStoryInfo,
        blocks: [],
        choices: [],
      };

      return {
        ...state,
        currentCreatedStory: newCreatedStory,
      }; }

    case SET_CREATION_LOADER:
      return {
        ...state,
        loading: action.bool,
      };

    case UPDATE_BLOCK_INFOS: {
      const newCurrentCreatedBlock = {
        ...state.currentCreatedBlock,
        [action.name]: action.newValue,
      };
      return {
        ...state,
        currentCreatedBlock: newCurrentCreatedBlock,
      };
    }

    case UPDATE_CHOICES_INFOS: {
      // It is horrible code, it gets the choice corresponding to the id,
      // then isolate it, change only the text value, then put it back on the state
      const newCurrentCreatedChoices = [
        ...state.currentCreatedChoices];
      let choiceIndex;
      const choiceToEdit = newCurrentCreatedChoices.find((choice, index) => {
        choiceIndex = index;
        return choice.id === action.id;
      });
      const editedChoice = { ...choiceToEdit, text: action.newValue };
      newCurrentCreatedChoices.splice(choiceIndex, 1, editedChoice);
      return {
        ...state, currentCreatedChoices: newCurrentCreatedChoices,
      };
    }

    case DELETE_CHOICE_INFOS: {
      const newCurrentCreatedChoices = [
        ...state.currentCreatedChoices];
      const choiceIndex = newCurrentCreatedChoices.findIndex((choice) => choice.id === action.id);
      newCurrentCreatedChoices.splice(choiceIndex, 1);
      return {
        ...state, currentCreatedChoices: newCurrentCreatedChoices,
      };
    }

    case ADD_NEW_CHOICE_INFOS: {
      const currentCreatedChoices = [
        ...state.currentCreatedChoices];
      let maxId = 0;
      currentCreatedChoices.forEach((choice) => {
        if (choice.id > maxId) {
          maxId = choice.id;
        }
      });
      const newId = maxId + 1;
      const newChoice = {
        id: newId,
        text: '',
        belongToBlock: action.blockId,
        leadsToBlock: null,
      };
      const newCurrentCreatedChoices = [...currentCreatedChoices, newChoice];
      return {
        ...state, currentCreatedChoices: newCurrentCreatedChoices,
      };
    }

    case SET_CURRENT_CREATED_BLOCK: {
      // Checking if asking for an existent block or a new one
      if (action.id) {
        const targetBlock = state.currentCreatedStory.blocks
          .find((block) => block.id === action.id);
        return { ...state, currentCreatedBlock: targetBlock };
      }

      const newBlock = {
        id: null,
        title: '',
        text: '',
        image: '',
        idChoices: [],
        type: 2,
        fromChoiceId: action.fromChoiceId || null,
      };

      return { ...state, currentCreatedBlock: newBlock };
    }

    case SET_CURRENT_CREATED_CHOICES: {
      // Checking if asking for an existent choice or a new one
      if (action.id) {
        const targetChoices = state.currentCreatedStory.choices
          .filter((choice) => choice.idBlocks.belongToBlock === action.id);
        return { ...state, currentCreatedChoices: targetChoices };
      }

      const newChoices = [{
        id: 1,
        text: '',
        belongToBlock: action.id,
        leadsToBlock: null,
      }];
      return { ...state, currentCreatedChoices: newChoices };
    }

    case SAVE_UPDATED_STORY: {
      const newCurrentUpdatedStory = {
        ...state.currentCreatedStory,
        storyInformations: action.storyUpdated,
      };
      return {
        ...state,
        currentCreatedStory: newCurrentUpdatedStory,
      }; }

    case ADD_NOTIFICATION: {
      return {
        ...state,
        notification: action.message,
      };
    }

    case CLEAR_NOTIFICATION: {
      return {
        ...state,
        notification: '',
      };
    }

    case SAVE_CHOSEN_IMAGE_STORY: {
      const tempStoryInfo = { ...state.currentCreatedStory.storyInformations };
      const newStoryInfo = { ...tempStoryInfo, image: action.webformatURL };
      const newCurrentCreatedStory = {
        ...state.currentCreatedStory, storyInformations: newStoryInfo,
      };
      return {
        ...state,
        currentCreatedStory: newCurrentCreatedStory,
      };
    }

    case SAVE_IMAGE_BLOCK: {
      const tempBlockInfo = { ...state.currentCreatedBlock };
      const newBlockInfo = { ...tempBlockInfo, image: action.webformatURL };
      return {
        ...state,
        currentCreatedBlock: newBlockInfo,
      };
    }

    case SET_CREATE_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      };
    }

    case SET_CREATE_STORY_LOADED: {
      return {
        ...state,
        createStoryLoaded: action.bool,
      };
    }

    default:
      return state;
  }
};

export default createStoryReducer;
