import { connect } from 'react-redux';

import { getAllStories, getDuration, getThemes } from '../../actions/readStory';
import { tokenLogIn } from '../../actions/auth';

import App from '../../components/App';

const mapStateToProps = (state) => ({
  loading: state.readStory.loading,
  storyLoaded: state.readStory.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => {
    dispatch(getAllStories());
  },
  loadDuration: () => {
    dispatch(getDuration());
  },
  loadThemes: () => {
    dispatch(getThemes());
  },
  tokenLogIn: (token) => dispatch(tokenLogIn(token)),
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(App);
