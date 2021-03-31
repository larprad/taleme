// == Import npm
import { connect } from 'react-redux';

// == Import component
import CreateStoryBlocks from '../../components/CreateStoryBlocks';

// == Import action creator
import {
  setCurrentCreatedBlock,
  setCurrentCreatedChoice,
} from '../../actions/createStory';

const mapStateToProps = (state) => ({
  storyTitle: state.createStory.currentCreatedStory.storyInformations.title,
  blocks: state.createStory.currentCreatedStory.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  createBlock: () => {
    dispatch(setCurrentCreatedBlock()); // new block is created, no id
    dispatch(setCurrentCreatedChoice());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryBlocks);
