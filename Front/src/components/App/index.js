// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

// == Import styles
import './styles.scss';
import 'semantic-ui-css/semantic.min.css';

// == Import components
import ReadListContainer from '../../containers/ReadList';
import NavBarContainer from '../../containers/NavBar';
import HomeContainer from '../../containers/Home';
import ReadStoryBlockContainer from '../../containers/ReadStoryBlock';
import CreateList from '../../containers/CreateList';
import NotFound from '../NotFound';
import CreationStoryContainer from '../../containers/CreationStory';
import TermsOfUse from '../Footer/FooterPages/TermsOfUse';
import AboutUs from '../Footer/FooterPages/AboutUs';
import ProtectedRouteContainer from '../../containers/ProtectedRoute';

const App = ({
  loadStories, loadDuration, loadThemes, loading, tokenLogIn,
}) => {
  // Get all stories immediately after the first render
  if (localStorage.getItem('token')) {
    tokenLogIn(localStorage.getItem('token'));
  }

  useEffect(() => {
    loadStories();
    loadDuration();
    loadThemes();
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBarContainer />
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route exact path="/lecture">
            <ReadListContainer />
          </Route>
          <Route exact path="/conditionsdutilisation">
            <TermsOfUse />
          </Route>
          <Route exact path="/a-propos">
            <AboutUs />
          </Route>
          <Route exact path="/lecture/:slug">
            {!loading && <ReadStoryBlockContainer />}
          </Route>
          <ProtectedRouteContainer exact path="/creation">
            <CreateList />
          </ProtectedRouteContainer>
          <ProtectedRouteContainer exact path="/creation/nouveau">
            <CreationStoryContainer isNew />
          </ProtectedRouteContainer>
          <ProtectedRouteContainer exact path="/creation/edition/:slug">
            <CreationStoryContainer isNew={false} />
          </ProtectedRouteContainer>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = {
  loadStories: PropTypes.func.isRequired,
  loadDuration: PropTypes.func.isRequired,
  loadThemes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tokenLogIn: PropTypes.func.isRequired,
};

// == Export
export default App;
