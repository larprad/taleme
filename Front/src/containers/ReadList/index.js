import { connect } from 'react-redux';
import ReadList from '../../components/ReadList';

import {
  getAllStories, saveThemesSelectedFilter, saveDurationSelectedFilter,
} from '../../actions/readStory';

const mapStateToProps = (state) => ({
  datas: state.readStory.storiesList,
  loading: state.readStory.loading,
  defaultValueThemes: state.readStory.themesFilter,
  defaultValueDuration: state.readStory.durationFilter,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStories: () => dispatch(getAllStories()),
  saveThemes: (themes) => dispatch(saveThemesSelectedFilter(themes)),
  saveDuration: (duration) => dispatch(saveDurationSelectedFilter(duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadList);
