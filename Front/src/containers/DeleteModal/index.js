// == Import npm
import { connect } from 'react-redux';

// == Import component
import DeleteModal from '../../components/DeleteModal';

import { setCreationLoader } from '../../actions/createStory';

const mapStateToProps = (state) => ({
  notification: state.createStory.notification,
});

const mapDispatchToProps = (dispatch) => ({
  setCreationLoader: (bool) => {
    dispatch(setCreationLoader(bool));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
