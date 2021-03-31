// == Import npm
import { connect } from 'react-redux';

// == Import component
import ReadChoices from '../../../components/ReadStoryBlock/ReadChoices';

// == Import actions creator
import { changeCurrentBlock } from '../../../actions/readStory';

// Import utils
import { getChoicesFromIds } from '../../../utils/storyUtils';

const mapStateToProps = (state) => ({
  choices: getChoicesFromIds(
    state.readStory.currentBlock.idChoices,
    state.readStory.currentStory,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  choiceAction: (blockId, choiceId) => dispatch(changeCurrentBlock(blockId, choiceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadChoices);
