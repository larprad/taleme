/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import Footer from '../Footer';

import './home.scss';

const Home = ({ isLogged }) => {
  const history = useHistory();
  const handleReadClick = () => {
    history.push('/lecture');
  };
  const handleCreateClick = () => {
    history.push('/creation');
  };

  const disabledClassName = className('home-image right', { disabled: !isLogged });

  return (
    <div className="home">
      <div className="home-split-container">

        <div className="side home-split-left ">
          <div className="home-image left" />
          <div className="home-title left">
            <Button onClick={handleReadClick} className="home-button-left">Vivre une aventure</Button>
          </div>
        </div>

        <div className="side home-split-right">
          <div className={disabledClassName} />
          <div className="home-title right">
            <Button onClick={handleCreateClick} secondary className="home-button-right" disabled={!isLogged}>
              {!isLogged ? 'Connectez vous pour créer' : 'Créer une histoire'}
            </Button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

Home.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default Home;
