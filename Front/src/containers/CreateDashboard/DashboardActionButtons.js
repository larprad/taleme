// == Import npm
import { connect } from 'react-redux';

// == Import component
import DashboardActionButtons from '../../components/CreateDashboard/DashboardActionButtons';

import {
  createNewStory,
  saveOnGoingStory,
  deleteOneStory,
  clearNotification,
  publishStory,
  manageTestStory,
} from '../../actions/createStory';

const mapStateToProps = (state) => ({
  id: state.createStory.currentCreatedStory.storyInformations.id,
  slug: state.createStory.currentCreatedStory.storyInformations.slug,
  loading: state.createStory.loading,
  storyStatus: state.createStory.currentCreatedStory.storyInformations.status,
  title: state.createStory.currentCreatedStory.storyInformations.title,
});

const mapDispatchToProps = (dispatch) => ({
  manageCreateStory: () => {
    dispatch(createNewStory());
  },
  manageSaveStory: () => {
    dispatch(saveOnGoingStory());
  },
  manageDeleteStory: (storyId) => {
    dispatch(deleteOneStory(storyId));
  },
  clearNotification: () => {
    dispatch(clearNotification());
  },
  managePublishStory: (storyStatus) => {
    dispatch(publishStory(storyStatus));
  },
  handleTestStory: () => {
    dispatch(manageTestStory());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardActionButtons);
