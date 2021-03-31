// == Import npm
import { connect } from 'react-redux';

// == Import component
import StoryBlock from '../../../components/CreateStoryBlocks/StoryBlock';

// == Import actions creator
import {
  setCurrentCreatedBlock,
  setCurrentCreatedChoice,
  deleteBlock,
  linkChoiceToBlock,
} from '../../../actions/createStory';

// Import utils
import { getChoicesFromIds } from '../../../utils/storyUtils';

const mapStateToProps = (state, ownProps) => ({
  choices: getChoicesFromIds(
    ownProps.idChoices,
    state.createStory.currentCreatedStory,
  ),
  loading: state.createStory.loading,
  allChoices: state.createStory.currentCreatedStory.choices,
});

const mapDispatchToProps = (dispatch) => ({
  editBlock: (id) => {
    dispatch(setCurrentCreatedBlock(id));
    dispatch(setCurrentCreatedChoice(id));
  },
  deleteBlock: (id) => {
    dispatch(deleteBlock(id));
  },
  linkChoiceToBlock: (choiceId, toBlockId) => dispatch(linkChoiceToBlock(choiceId, toBlockId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryBlock);
