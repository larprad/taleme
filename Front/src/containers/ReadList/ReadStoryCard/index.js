import { connect } from 'react-redux';
import ReadStoryCard from '../../../components/ReadStoryCard';

// == Import utils
import { getThemesFromIds, getDurationFromId } from '../../../utils/storyUtils';

const mapStateToProps = (state, ownProps) => ({
  datas: state.readStory.storiesList,
  loading: state.readStory.loading,
  themesArray: getThemesFromIds(ownProps.idThemes, state.readStory.themesList),
  durationObject: getDurationFromId(ownProps.idDuration, state.readStory.durationList),
});

// == assitant creation :
export default connect(mapStateToProps)(ReadStoryCard);
