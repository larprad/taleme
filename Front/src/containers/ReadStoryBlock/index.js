// == Import npm
import { connect } from 'react-redux';

// == Import component
import ReadStoryBlock from '../../components/ReadStoryBlock';

// == Import action creator
import { getOneStory } from '../../actions/readStory';

const mapStateToProps = (state) => ({
  storyAuthor: state.readStory.currentStory.storyInformations.user.pseudo,
  storyTitle: state.readStory.currentStory.storyInformations.title,
  onGoing: state.readStory.onGoing,
  storyLoaded: state.readStory.storyLoaded,
  storyNotFound: state.readStory.storyNotFound,
});

const mapDispatchToProps = (dispatch) => ({
  getStory: (slug) => {
    dispatch(getOneStory(slug));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadStoryBlock);
