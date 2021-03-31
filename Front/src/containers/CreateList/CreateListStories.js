// == Import npm
import { connect } from 'react-redux';

// == Import component
import CreateListStories from '../../components/CreateList/CreateListStories';

import { deleteOneStory, clearNotification, getUserStories } from '../../actions/createStory';

// == Import utils
import { getThemesFromIds, getDurationFromId } from '../../utils/storyUtils';

const mapStateToProps = (state, ownProps) => ({
  themes: getThemesFromIds(ownProps.idThemes, state.readStory.themesList),
  duration: getDurationFromId(ownProps.idDuration, state.readStory.durationList),
  loading: state.createStory.loading,
});

const mapDispatchToProps = (dispatch) => ({
  manageDeleteStory: (storyId) => {
    dispatch(deleteOneStory(storyId));
  },
  clearNotification: () => {
    dispatch(clearNotification());
  },
  getUserStories: () => {
    dispatch(getUserStories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateListStories);
