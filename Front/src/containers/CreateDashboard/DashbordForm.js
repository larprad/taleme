// == Import npm
import { connect } from 'react-redux';

// == Import component
import DashboardForm from '../../components/CreateDashboard/DashboardForm';

import {
  updateStoryInfos, saveThemesSelected, saveDurationSelected, saveChosenImageStory,
} from '../../actions/createStory';

const mapStateToProps = (state) => ({
  title: state.createStory.currentCreatedStory.storyInformations.title,
  summary: state.createStory.currentCreatedStory.storyInformations.summary,
  image: state.createStory.currentCreatedStory.storyInformations.image,
  defaultValueDuration: state.createStory.currentCreatedStory.storyInformations.idDuration,
  defaultValueTheme: state.createStory.currentCreatedStory.storyInformations.idThemes,
  serverErrors: state.createStory.errors,
});

const mapDispatchToProps = (dispatch) => ({

  updateStoryInfos: (newValue, name) => {
    dispatch(updateStoryInfos(newValue, name));
  },

  manageImageStory: (webformatURL) => {
    dispatch(saveChosenImageStory(webformatURL));
  },

  handleThemesSelected: (themes) => {
    dispatch(saveThemesSelected(themes));
  },
  handleDurationSelected: (duration) => {
    dispatch(saveDurationSelected(duration));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardForm);
