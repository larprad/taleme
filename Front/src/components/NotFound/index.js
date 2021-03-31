import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ImageNotFound from '../../assets/images/notfound.png';

import './not-found.scss';

const notFound = () => {
  const history = useHistory();
  function handleLeaveRead() {
    history.push('/lecture');
  }
  function handleLeaveHome() {
    history.push('/');
  }
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Cette page n'existe pas...</h2>
      <div className="not-found-button-container" not-found-button-container>
        <Button className="" onClick={handleLeaveRead} labelPosition="right" color="grey" icon="book" content="Aller lire une histoire" />
        <Button className="" onClick={handleLeaveHome} labelPosition="right" color="grey" icon="warehouse" content="Page d'accueil" />
      </div>
      <div className="not-found-image-container">
        <img src={ImageNotFound} alt="not found" />
      </div>
    </div>
  );
};

export default notFound;
