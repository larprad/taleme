/**
 * Returns an array of choices
 * @param {array} choicesIds you are looking for
 * @param {object} storyData story data containing all story choices
 */

export const getChoicesFromIds = (choicesIds, storyData) => {
  if (storyData.choices.length > 0) {
    const choicesArray = choicesIds
      .map((choiceId) => storyData.choices
        .find((storyChoice) => storyChoice.id === choiceId));
    return choicesArray;
  }
  return [];
};

/**
 * Returns the initial object block from the story
 * @param {object} storyData;
 */

export const getInitialBlock = (storyData) => {
  const initialBlock = storyData.blocks.find((block) => block.type === 1);
  // Making sure that no prevChoices have been carried from previous games
  initialBlock.prevChoiceId = null;
  return initialBlock;
};

/**
 * Returns an object block corresponding to the Id in the story,
 * and add choice Id that have led to it
 * @param {number} blockId to where you go
 * @param {number} choiceId the choice Id selected
 * @param {object} storyData containing all storyblocks
 */

export const getBlockFromId = (blockId, choiceId = null, storyData) => {
  const targetBlock = storyData.blocks.find((block) => block.id === blockId);
  targetBlock.prevChoiceId = choiceId;
  return targetBlock;
};

/**
 * Return text from choice corresponding to the Id
 * @param {number} choiceId you are looking for
 * @param {object} storyData containing all choices
 */
export const getChoiceTextFromId = (choiceId, storyData) => {
  if (choiceId) {
    const choiceText = storyData.choices.find((choice) => choice.id === choiceId).text;
    return choiceText;
  }
  return false;
};

/**
 * Returns story Id from the URL slug
 * @param {string} slug got from the url
 * @param {array} storiesList where you wants to find the corresponding ID
 */

export const getStoryIdFromSlug = (slug, storiesList) => {
  const storySelected = storiesList.find((story) => story.slug === slug);
  if (storySelected) {
    return storySelected.id;
  }
  return null;
};

/**
 * Returns an array of string errors (will need to be updated)
 * @param {object} story to be checked
 */

export const checkStoryIntegrity = (story) => {
  const errors = [];
  if (story.blocks.length === 0) {
    errors.push('Story must contain at least one block');
  }
  if (story.blocks.choices === 0) {
    errors.push('Story must contain at least on choice');
  }
  return errors;
};

/**
 * Returns a string to inform if all choices of an array have been connected
 * @param {array} choices to be tested
 */

export const checkIfAllChoicesAreConnected = (choices) => {
  if (choices.length === 0) {
    return 'final';
  }
  const allChoiceAreConnected = choices.every(
    (choice) => Boolean(choice.idBlocks.belongToBlock) && Boolean(choice.idBlocks.leadsToBlock),
  );
  if (allChoiceAreConnected) {
    return 'allConnected';
  }
  return 'notAllConnected';
};

export const checkIfBlockIsConnected = (allChoices, blockId, type) => {
  if (type === 1) {
    return 'initial';
  }
  const blockIsConnected = allChoices.some(
    (choice) => choice.idBlocks.leadsToBlock === blockId,
  );
  if (blockIsConnected) {
    return 'connected';
  }
  return 'notConnected';
};

/**
 * Return an array of themes
 * @param {array} ids of searched themes
 * @param {array} themesSource is all themes available
 */

export const getThemesFromIds = (ids, themesSource) => {
  if (themesSource.length > 0 && ids) {
    const themeArray = ids.map((id) => themesSource.find((theme) => theme.id === id));
    return themeArray;
  }
  return [];
};

/**
 * Return a duration object
 * @param {number} id of searched duration
 * @param {array} durationSource is all durations available
 */

export const getDurationFromId = (id, durationSource) => {
  const durationObject = durationSource.find((duration) => duration.id === id);
  return durationObject;
};

/**
 * Return the title of block
 * @param {array} blocksArray all blocks
 * @param {number} blockId of the block
 */

export const getBlockTitleFromId = (blocksArray, blockId) => {
  if (blocksArray.length > 0 && blockId) {
    return blocksArray.find(
      (block) => block.id === blockId,
    ).title;
  }
  return null;
};

export const countEndBlocks = (blocks) => {
  const nbEndBlocks = blocks.filter(
    (bloc) => bloc.idChoices.length === 0 && bloc.type !== 1,
  ).length;
  return nbEndBlocks;
};

export const countLinkedChoices = (choices) => {
  const nbLinkedChoices = choices.filter(
    (choice) => choice.idBlocks.leadsToBlock !== null,
  ).length;
  return nbLinkedChoices;
};

export const countUnlinkedChoices = (choices) => {
  const nbUnlinkedChoices = choices.filter(
    (choice) => choice.idBlocks.leadsToBlock === null,
  ).length;
  return nbUnlinkedChoices;
};

export const storyStatuses = [
  { id: 1, text: 'En cours' },
  { id: 3, text: 'Publiée' },
];

export const getTranslatedStatus = (storyStatus) => {
  const foundStatus = storyStatuses.find((status) => status.id === storyStatus);
  if (foundStatus) {
    return foundStatus.text;
  }
  return null;
};

export const getBlockBackConnections = (allChoices, blockId) => {
  if (blockId) {
    const choicesConnected = allChoices.filter(
      (choice) => choice.idBlocks.leadsToBlock === blockId,
    );
    return choicesConnected;
  }
  return [];
};
