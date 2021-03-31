// == Import npm
import { connect } from 'react-redux';

// == Import component
import RestartStory from '../../../components/ReadStoryBlock/RestartStory';

// == Import action creator
import { setInitialBlock } from '../../../actions/readStory';

const mapStateToProps = (state) => ({
  onGoing: state.readStory.onGoing,
});

const mapDispatchToProps = (dispatch) => ({
  restart: () => {
    dispatch(setInitialBlock());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestartStory);
