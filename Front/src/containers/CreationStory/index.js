// == Import npm
import { connect } from 'react-redux';

import { resetDashboard, setCreateErrors, getOneUserStoryBySlug } from '../../actions/createStory';

import { setStoryNotFound } from '../../actions/readStory';

// == Import component
import CreationStory from '../../components/CreationStory';

const mapStateToProps = (state) => ({
  title: state.createStory.currentCreatedStory.storyInformations.title,
  createStoryLoaded: state.createStory.createStoryLoaded,
  storyNotFound: state.readStory.storyNotFound,
  storiesList: state.createStory.userStoriesList,
  storyStatus: state.createStory.currentCreatedStory.storyInformations.status,
  loading: state.createStory.loading,
});

const mapDispatchToProps = (dispatch) => ({
  cleanDashboard: () => {
    dispatch(resetDashboard());
  },
  setCreateErrors: (error) => dispatch(setCreateErrors(error)),
  getOneStory: (slug) => {
    dispatch(getOneUserStoryBySlug(slug));
  },
  setStoryNotFound: (bool) => dispatch(setStoryNotFound(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreationStory);
