// == Import npm
import { connect } from 'react-redux';

// == Import component
import ReadBlockContent from '../../../components/ReadStoryBlock/ReadBlockContent';

// == Import utils
import { getChoiceTextFromId } from '../../../utils/storyUtils';

const mapStateToProps = (state) => ({
  image: state.readStory.currentBlock.image,
  text: state.readStory.currentBlock.text,
  prevChoice: getChoiceTextFromId(
    state.readStory.currentBlock.prevChoiceId,
    state.readStory.currentStory,
  ),
  onGoing: state.readStory.onGoing,
});

export default connect(mapStateToProps)(ReadBlockContent);
