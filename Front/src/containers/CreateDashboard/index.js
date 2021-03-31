// == Import npm
import { connect } from 'react-redux';

import { getOneUserStoryBySlug } from '../../actions/createStory';

// == Import component
import CreateDashboard from '../../components/CreateDashboard';

const mapStateToProps = (state) => ({
  loading: state.createStory.loading,
  storiesList: state.createStory.userStoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  getOneStory: (slug) => {
    dispatch(getOneUserStoryBySlug(slug));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDashboard);
