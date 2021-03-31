/* eslint-disable no-console */
// == Import npm
import { connect } from 'react-redux';

// == Import component
import BlockChoice from '../../../components/CreateStoryBlocks/BlockChoice';

// == Import actions creator
import {
  setCurrentCreatedBlock,
  setCurrentCreatedChoice,
  deleteChoice,
  linkChoiceToBlock,
} from '../../../actions/createStory';

// Import utils
import { getBlockTitleFromId } from '../../../utils/storyUtils';

const mapStateToProps = (state, ownProps) => ({
  leadsToBlockTitle: getBlockTitleFromId(
    state.createStory.currentCreatedStory.blocks,
    ownProps.idBlocks.leadsToBlock,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  deleteChoice: (choiceId) => dispatch(deleteChoice(choiceId)),
  createBlock: (fromChoiceId) => {
    dispatch(setCurrentCreatedBlock(false, fromChoiceId)); // new block is created, no id
    dispatch(setCurrentCreatedChoice());
  },
  unLinkChoice: (choiceId) => dispatch(linkChoiceToBlock(choiceId, null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockChoice);
