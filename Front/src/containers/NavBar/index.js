// == Import npm
import { connect } from 'react-redux';

// == Import component
import NavBar from '../../components/NavBar';

// == Import action creator
import { logOut } from '../../actions/auth';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  pseudo: state.auth.pseudo,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
