// == Import npm
import { connect } from 'react-redux';

// == Import component
import SubscribeForm from '../../components/SubscribeForm';

// == Import action creator
import { subscribeUser, setServerErrors } from '../../actions/auth';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  pseudo: state.auth.pseudo,
  loading: state.auth.loading,
  serverErrors: state.auth.errors,
});

const mapDispatchToProps = (dispatch) => ({
  subscribeUser: ({ email, password, pseudo }) => dispatch(
    subscribeUser({ email, password, pseudo }),
  ),
  initServerErrors: () => dispatch(setServerErrors({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeForm);
