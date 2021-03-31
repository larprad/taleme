// == Import npm
import { connect } from 'react-redux';

// == Import component
import CreateList from '../../components/CreateList';

import { resetDashboard, getUserStories } from '../../actions/createStory';

const mapStateToProps = (state) => ({
  userStories: state.createStory.userStoriesList,
  isLogged: state.auth.isLogged,
  loading: state.createStory.loading,
});

const mapDispatchToProps = (dispatch) => ({
  cleanDashboard: () => {
    dispatch(resetDashboard());
  },
  loadUserStories: () => {
    dispatch(getUserStories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
