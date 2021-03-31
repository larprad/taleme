// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import components & hooks
import {
  Button, Icon,
} from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import LoginModal from './LoginModal';

// == Import styles & images
import logo7 from '../../assets/images/logo7.png';
import './nav-bar.scss';

const NavBar = ({ isLogged, logOut, pseudo }) => {
  // Handling popup local state
  const [open, setOpen] = useState(false);

  const history = useHistory();

  function handleLogOutClick() {
    setOpen(false);
    logOut();
    history.push('/');
  }
  return (
    <div className="complete-nav-bar">
      <div className="nav-bar-connection-container">
        {isLogged
          ? <div className="nav-bar-connection-sub-container"><div className="nav-bar-connection-sub-container-pseudo">Hey {pseudo} !</div><Button icon circular basic color="grey" size="mini" onClick={handleLogOutClick}><Icon name="log out" /></Button></div>
          : (
            <LoginModal
              open={open}
              setOpen={setOpen}
            />
          )}
      </div>
      <div className="nav-bar">
        <NavLink className="nav-bar-navigation-container-links" activeClassName="selected" to="/lecture">Jouer</NavLink>
        <NavLink className="nav-bar-img" to="/"><img src={logo7} alt="logo1" /></NavLink>
        { isLogged ? <NavLink className="nav-bar-navigation-container-links" activeClassName="selected" to="/creation">Créer</NavLink>
          : <p className="nav-bar-navigation-container-links disabled">Créer</p>}
      </div>
    </div>
  );
};

NavBar.defaultProps = {
  pseudo: '',
};

NavBar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  pseudo: PropTypes.string,
};

export default NavBar;
