import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import './createList.scss';
import {
  Button, Card, Icon,
} from 'semantic-ui-react';

import CreateListStoriesContainer from '../../containers/CreateList/CreateListStories';

const CreateList = ({
  userStories, isLogged, cleanDashboard, loadUserStories,
}) => {
  const history = useHistory();
  const handleClick = () => {
    cleanDashboard();
    history.push('/creation/nouveau');
  };

  useEffect(() => {
    loadUserStories();
  }, []);

  return (
    <div className="create-list">

      {isLogged && userStories.length === 0
        ? (
          <div className="create-list-no-story">
            <div className="create-list-image">
              <Button className="create-list-main-button" onClick={handleClick}>Créez une nouvelle Histoire !
                <Icon name="arrow alternate circle right" />
              </Button>
            </div>
          </div>
        )
        : (
          <div className="create-list-container">
            <div className="create-list-header">
              <h1 className="create-list-title">
                Vos histoires
              </h1>
              <h4 className="create-list-sub-title">
                Laissez libre cours à votre imagination et créez votre propre aventure !
              </h4>
            </div>

            <div className="create-list-new-story">
              <Button className="create-list-main-button" onClick={handleClick}>Créez une nouvelle Histoire !
                <Icon name="arrow alternate circle right" />
              </Button>
            </div>

            <div className="create-list-stories">
              <Card.Group className="create-list-group-stories">
                {userStories.map((story) => (
                  <CreateListStoriesContainer key={story.id} {...story} />
                ))}
              </Card.Group>
            </div>
          </div>
        )}
    </div>
  );
};

CreateList.propTypes = {
  userStories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  isLogged: PropTypes.bool.isRequired,
  cleanDashboard: PropTypes.func.isRequired,
  loadUserStories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateList;
