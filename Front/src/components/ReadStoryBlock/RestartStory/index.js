// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

// == Import style
import './restart-story.scss';

function RestartStory({ restart, onGoing }) {
  const history = useHistory();
  function handleLeave() {
    history.push('/lecture');
  }
  if (onGoing) {
    return null;
  }
  return (
    <div className="restart-story-container">
      <Button className="restart-story-container-restart" onClick={restart} labelPosition="left" icon="redo" content="Recommencer" />
      <Button className="restart-story-container-menu" onClick={handleLeave} labelPosition="right" color="grey" icon="book" content="Liste des histoires" />
    </div>
  );
}

RestartStory.propTypes = {
  restart: PropTypes.func.isRequired,
  onGoing: PropTypes.bool.isRequired,
};

export default RestartStory;
