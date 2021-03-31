// == Import npm
import { connect } from 'react-redux';

// == Import component
import Home from '../../components/Home';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps)(Home);
