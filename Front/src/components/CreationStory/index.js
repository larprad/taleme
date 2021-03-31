/* eslint-disable max-len */
// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import classNames from 'classnames';

// == Import components
import {
  Divider, Icon,
} from 'semantic-ui-react';
import CreateDashboardContainer from '../../containers/CreateDashboard';
import CreateStoryBlocksContainer from '../../containers/CreateStoryBlocks';
import NotFound from '../NotFound';

// == Import style
import './creation-story.scss';

const CreationStory = ({
  isNew,
  title,
  cleanDashboard,
  setCreateErrors,
  createStoryLoaded,
  storyNotFound,
  getOneStory,
  storiesList,
  setStoryNotFound,
  storyStatus,
  loading,
}) => {
  const [page, setPage] = useState('dashboard');

  const { slug } = useParams();

  useEffect(() => {
    if (!isNew) {
      getOneStory(slug);
    }
    else {
      setStoryNotFound(false);
    }
  }, [storiesList]);

  const history = useHistory();
  const handleClick = () => {
    history.push('/creation');
    cleanDashboard();
    setCreateErrors({});
  };
  const handleCreationClick = () => {
    setPage('blocks'); // Displaying StoryCreationBlocks component
  };
  const handleDasboardClick = () => {
    setPage('dashboard'); // Displaying dashboard component
  };

  if (storyNotFound && !loading && createStoryLoaded) {
    return <NotFound />;
  }

  const dashboardClasseName = classNames('creation-story-button dashboard', { active: page === 'dashboard' });
  const createClassName = classNames('creation-story-button create', { active: page === 'blocks' });

  return (
    <div className="creation-story">
      <div className="creation-story-title-container">
        <h3 className="creation-story-up-title">Vous travaillez sur</h3>
        {isNew
          ? <h1 className="creation-story-title">Une histoire sans titre</h1>
          : <h1 className="creation-story-title">{createStoryLoaded ? title : 'Chargement...'}</h1>}
      </div>
      <div className="creation-story-buttons-container">
        <button type="button" className="creation-story-button menu" color="grey" onClick={handleClick}>
          <Icon name="list" />
        </button>
        <button type="button" className={dashboardClasseName} onClick={handleDasboardClick}>Tableau de bord</button>
        <button type="button" className={createClassName} onClick={handleCreationClick} disabled={isNew || storyStatus !== 1}>
          { storyStatus === 3 ? 'Dépublier pour créer des blocs' : 'Créer des blocs'}
        </button>
      </div>
      <Divider />
      { page === 'dashboard' && <CreateDashboardContainer isNew={isNew} createStoryLoaded={createStoryLoaded} /> }
      { page === 'blocks' && <CreateStoryBlocksContainer /> }
    </div>

  );
};

CreationStory.defaultProps = {
  title: '-',
  storyStatus: null,
};

CreationStory.propTypes = {
  isNew: PropTypes.bool.isRequired,
  title: PropTypes.string,
  cleanDashboard: PropTypes.func.isRequired,
  setCreateErrors: PropTypes.func.isRequired,
  createStoryLoaded: PropTypes.bool.isRequired,
  storyNotFound: PropTypes.bool.isRequired,
  getOneStory: PropTypes.func.isRequired,
  storiesList: PropTypes.array.isRequired,
  setStoryNotFound: PropTypes.func.isRequired,
  storyStatus: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

export default CreationStory;
