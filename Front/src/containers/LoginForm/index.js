// == Import npm
import { connect } from 'react-redux';

// == Import component
import LoginForm from '../../components/LoginForm';

// == Import action creator
import { logIn, setServerErrors } from '../../actions/auth';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  pseudo: state.auth.pseudo,
  loading: state.auth.loading,
  serverErrors: state.auth.errors,
});

const mapDispatchToProps = (dispatch) => ({
  logInUser: ({ email, password, remember }) => dispatch(
    logIn({ email, password, remember }),
  ),
  initServerErrors: () => dispatch(setServerErrors({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
