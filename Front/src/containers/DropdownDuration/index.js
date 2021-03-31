import { connect } from 'react-redux';
import dropdownduration from '../../components/DropdownDuration';

// import { saveDurationSelected } from '../../actions/createStory';

const mapStateToProps = (state) => ({
  durations: state.readStory.durationList,
});

export default connect(mapStateToProps)(dropdownduration);
