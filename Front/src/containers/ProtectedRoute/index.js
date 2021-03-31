import { connect } from 'react-redux';
import ProtectedRoute from '../../components/ProtectedRoute';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

// === création de l'assistant
export default connect(mapStateToProps)(ProtectedRoute);
