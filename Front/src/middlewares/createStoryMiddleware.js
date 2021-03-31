/* eslint-disable no-console */
import axios from 'axios';

import { getStoryIdFromSlug } from '../utils/storyUtils';

import {
  GET_USER_STORIES,
  saveUserStories,
  CREATE_NEW_STORY,
  saveOneUserStory,
  GET_ONE_USER_STORY,
  setCreationLoader,
  DELETE_CHOICE,
  SAVE_ON_GOING_STORY,
  saveUpdatedStory,
  DELETE_ONE_STORY,
  addNotification,
  PATCH_BLOCK_INFOS,
  POST_CHOICES_INFOS,
  PATCH_CHOICES_INFOS,
  patchChoicesInfos,
  postChoicesInfos,
  POST_BLOCK_INFOS,
  LINK_CHOICE_TO_BLOCK,
  linkChoiceToBlock,
  DELETE_BLOCK,
  GET_ONE_USER_STORY_BY_ID,
  getOneUserStoryById,
  PUBLISH_STORY,
  setCreateErrors,
  setCreateStoryLoaded,
  getUserStories,
} from '../actions/createStory';

import {
  setStoryNotFound,
} from '../actions/readStory';

const API_URL = 'http://34.228.57.17/Vous-etes-le-heros/Back/Heroes_App/public/api/';
// const API_URL = 'http://sebastien-duclut.vpnuser.lan/App_Heroes/Vous-etes-le-heros/Back/Heroes_App/public/api/';

const createStoryMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_USER_STORIES: {
      const { token } = store.getState().auth;
      if (token) {
        store.dispatch(setCreateStoryLoaded(false));
        store.dispatch(setCreationLoader(true));
        axios.get(
          `${API_URL}stories/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
          .then((response) => {
            store.dispatch(saveUserStories(response.data));
            store.dispatch(setCreateStoryLoaded(true));
          })
          .catch((error) => {
            console.log(error.response);
            store.dispatch(setCreateErrors(error.response.data));
          }).finally(() => {
            store.dispatch(setCreationLoader(false));
          });
      }
      next(action);
      break;
    }

    case DELETE_CHOICE: {
      const { token } = store.getState().auth;
      axios.delete(
        `${API_URL}choices/${action.idChoice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(() => {
          // Choice is deleted from dataBase, calling the whole story to update state accordingly
          const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
          store.dispatch(getOneUserStoryById(id));
          store.dispatch(setCreateErrors({}));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(setCreateErrors(error.response.data));
        });
      next(action);
      break;
    }

    case CREATE_NEW_STORY: {
      const {
        title, summary, idThemes, idDuration, image,
      } = store.getState().createStory.currentCreatedStory.storyInformations;
      const { token } = store.getState().auth;
      store.dispatch(setCreationLoader(true));
      axios.post(
        `${API_URL}stories`,
        {
          title,
          summary,
          image,
          rating: null,
          theme: idThemes,
          duration: idDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        store.dispatch(saveOneUserStory(response.data));
        store.dispatch(setCreateErrors({}));
      })
        .catch((error) => {
          store.dispatch(setCreateErrors(error.response.data.error));
        })
        .finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      next(action);
      break;
    }

    case GET_ONE_USER_STORY: {
      const { token } = store.getState().auth;
      const { userStoriesList } = store.getState().createStory;
      const storyId = getStoryIdFromSlug(action.slug, userStoriesList);
      store.dispatch(setStoryNotFound(false));
      store.dispatch(setCreateStoryLoaded(false));
      if (storyId !== null && userStoriesList.length > 0) {
        const requestOneUserStory = `${API_URL}stories/${storyId}`;
        store.dispatch(setCreationLoader(true));
        axios.get(requestOneUserStory, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const story = response.data;
          store.dispatch(saveOneUserStory(story));
          store.dispatch(setCreateStoryLoaded(true));
        }).catch((error) => {
          console.log(error);
          store.dispatch(setCreateErrors(error.response.data));
          store.dispatch(setCreateStoryLoaded(true));
          if (error.response.status === 404) {
            store.dispatch(setStoryNotFound(true));
          }
        }).finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      }
      else {
        store.dispatch(setStoryNotFound(true));
        store.dispatch(setCreateStoryLoaded(true));
      }
      next(action);
      break;
    }

    case SAVE_ON_GOING_STORY: {
      const { token } = store.getState().auth;
      const {
        id, title, summary, idThemes, idDuration, image,
      } = store.getState().createStory.currentCreatedStory.storyInformations;
      store.dispatch(setCreationLoader(true));
      axios.patch(
        `${API_URL}stories/${id}`,
        {
          title,
          summary,
          image,
          rating: null,
          theme: idThemes,
          duration: idDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        store.dispatch(saveUpdatedStory(response.data));
        store.dispatch(setCreateErrors({}));
      })
        .catch((error) => {
          console.log(error.response);
          store.dispatch(setCreateErrors(error.response.data));
        })
        .finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      next(action);
      break;
    }

    case DELETE_ONE_STORY: {
      const { token } = store.getState().auth;
      const id = action.storyId;
      store.dispatch(setCreationLoader(true));
      axios.delete(
        `${API_URL}stories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        store.dispatch(addNotification(response.data.message));
        store.dispatch(setCreateErrors({}));
        store.dispatch(getUserStories());
      })
        .catch((error) => {
          console.log(error.response);
          store.dispatch(setCreateErrors(error.response.data));
        })
        .finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      next(action);
      break;
    }
    case PATCH_BLOCK_INFOS: {
      const { token } = store.getState().auth;
      const {
        title, text, type, id, image,
      } = store.getState().createStory.currentCreatedBlock;
      const story = store.getState().createStory.currentCreatedStory.storyInformations.id;
      const payload = {
        title,
        text,
        blockType: type,
        story,
        image,
      };
      store.dispatch(setCreationLoader(true));
      const patchRequest = `${API_URL}blocks/${id}`;
      axios.patch(
        patchRequest,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        store.dispatch(postChoicesInfos());
        store.dispatch(setCreateErrors({}));
      }).catch((error) => {
        console.log(error.response);
        store.dispatch(setCreateErrors(error.response.data));
      }).finally(() => {
        store.dispatch(setCreationLoader(false));
      });
      next(action);
      break;
    }

    case POST_CHOICES_INFOS: {
      const { token } = store.getState().auth;
      const choicesToSend = [...store.getState().createStory.currentCreatedChoices];
      // If choice object have idBlocks property, it means that he is already
      // existing in the database, hence a Patch method will be necessary
      const choicesToPost = choicesToSend.filter((choice) => !Object.prototype.hasOwnProperty.call(choice, 'idBlocks'));

      // Data needs to be formated before being sent to back
      // If action.blockId exists it means that this choice is created inside a new block
      // hence we need to provide the belongToBlock value that result from a previous Block POST
      const choicesToPostButWithoutId = choicesToPost.map(
        ({ text, belongToBlock, leadsToBlock }) => ({
          text, belongToBlock: action.blockId || belongToBlock, leadsToBlock,
        }),
      );

      store.dispatch(setCreationLoader(true));

      // POST new choices
      if (choicesToPostButWithoutId.length > 0) {
        const postRequest = `${API_URL}choices`;
        const postPayload = choicesToPostButWithoutId;
        axios.post(
          postRequest,
          postPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ).then(() => {
          store.dispatch(patchChoicesInfos());
        }).catch((error) => {
          console.log(error.response);
          store.dispatch(setCreateErrors(error.response.data));
        }).finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      }
      else {
        store.dispatch(patchChoicesInfos());
      }
      next(action);
      break;
    }

    case PATCH_CHOICES_INFOS: {
      const { token } = store.getState().auth;
      const choicesToSend = [...store.getState().createStory.currentCreatedChoices];

      // If choice object have idBlocks property, it means that he is already
      // existing in the database, hence a Patch method will be necessary
      const choicesToPatch = choicesToSend.filter((choice) => Object.prototype.hasOwnProperty.call(choice, 'idBlocks'));

      const choicesToPatchFormated = choicesToPatch.map(
        ({ text, idBlocks, id }) => ({
          id, text, belongToBlock: idBlocks.belongToBlock, leadsToBlock: idBlocks.leadsToBlock,
        }),
      );

      store.dispatch(setCreationLoader(true));

      // PATCH updated choices
      if (choicesToPatchFormated.length > 0) {
        choicesToPatchFormated.forEach((choiceToPatch, index) => {
          const patchRequest = `${API_URL}choices/${choiceToPatch.id}`;
          const patchPayload = {
            text: choiceToPatch.text,
            belongToBlock: choiceToPatch.belongToBlock,
            leadsToBlock: choiceToPatch.leadsToBlock,
          };
          axios.patch(
            patchRequest,
            patchPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ).then(() => {
          // If the last choice to patch have been patched then we are getting
          // the whole updated story from the back to refresh the state
            if (index === choicesToPatchFormated.length - 1) {
              const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
              store.dispatch(getOneUserStoryById(id));
            }
          }).catch((error) => {
            console.log(error.response);
          }).finally(() => {
            store.dispatch(setCreationLoader(false));
          });
        });
      }
      else {
        const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
        store.dispatch(getOneUserStoryById(id));
      }
      next(action);
      break;
    }

    case POST_BLOCK_INFOS: {
      const { token } = store.getState().auth;
      const {
        title, text, image,
      } = store.getState().createStory.currentCreatedBlock;
      const story = store.getState().createStory.currentCreatedStory.storyInformations.id;
      const payload = {
        title,
        text,
        blockType: 2, // default bloc is standard
        story,
        image,
      };
      store.dispatch(setCreationLoader(true));
      const postRequest = `${API_URL}blocks`;
      axios.post(
        postRequest,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        store.dispatch(postChoicesInfos(response.data.id));
        const { fromChoiceId } = store.getState().createStory.currentCreatedBlock;
        if (fromChoiceId) {
          store.dispatch(linkChoiceToBlock(fromChoiceId, response.data.id));
        }
      }).catch((error) => {
        console.log(error.response);
      }).finally(() => {
        store.dispatch(setCreationLoader(false));
      });
      next(action);
      break;
    }

    case LINK_CHOICE_TO_BLOCK: {
      const { token } = store.getState().auth;

      store.dispatch(setCreationLoader(true));

      // PATCH updated choices
      const patchRequest = `${API_URL}choices/${action.choiceId}`;
      const patchPayload = {
        leadsToBlock: action.toBlockId,
      };
      axios.patch(
        patchRequest,
        patchPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
        store.dispatch(getOneUserStoryById(id));
      }).catch((error) => {
        console.log(error.response);
      }).finally(() => {
        store.dispatch(setCreationLoader(false));
      });
      next(action);
      break;
    }

    case DELETE_BLOCK: {
      const { token } = store.getState().auth;
      axios.delete(
        `${API_URL}blocks/${action.blockId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(() => {
          // Choice is deleted from dataBase, calling the whole story to update state accordingly
          const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
          store.dispatch(getOneUserStoryById(id));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case GET_ONE_USER_STORY_BY_ID: {
      const { token } = store.getState().auth;
      const { storyId } = action;
      if (storyId !== null) {
        const requestOneUserStory = `${API_URL}stories/${storyId}`;
        store.dispatch(setCreationLoader(true));
        axios.get(requestOneUserStory, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const story = response.data;
          store.dispatch(saveOneUserStory(story));
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      }
      next(action);
      break;
    }

    case PUBLISH_STORY: {
      const { token } = store.getState().auth;
      const { id } = store.getState().createStory.currentCreatedStory.storyInformations;
      const newStatus = action.storyStatus === 1 ? 3 : 1;
      store.dispatch(setCreationLoader(true));
      axios.patch(
        `${API_URL}stories/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        store.dispatch(saveUpdatedStory(response.data));
      })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(setCreationLoader(false));
        });
      next(action);
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default createStoryMiddleware;
