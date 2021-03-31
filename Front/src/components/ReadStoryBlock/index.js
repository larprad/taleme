/* eslint-disable max-len */
// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router';

// == Import composants
import { Segment, Button } from 'semantic-ui-react';
import ReadBlockContentContainer from '../../containers/ReadStoryBlock/ReadBlockContent';
import HeaderLoading from './ReadStoryLoading/HeaderLoading';
import ContentLoading from './ReadStoryLoading/ContentLoading';
import NotFound from '../NotFound';

// == Import style
import './read-story-block.scss';

function ReadStoryBlock({
  storyAuthor, storyTitle, getStory, storyLoaded, storyNotFound, onGoing,
}) {
  const { slug } = useParams();
  useEffect(() => getStory(slug), []);
  if (storyNotFound) {
    return <NotFound />;
  }

  const history = useHistory();
  function handleLeave() {
    history.push('/lecture');
  }

  return (
    <div className="read-story-block">
      {storyLoaded ? (
        <div className="read-story-block-title-container">
          <h1>{storyTitle}</h1>
          <h4> Une histoire de {storyAuthor}</h4>
        </div>
      ) : <HeaderLoading /> }
      {storyLoaded ? (
        <Segment className="read-story-block-content">
          <ReadBlockContentContainer />
          {onGoing && <Button className="quit-story-button" onClick={handleLeave} labelPosition="right" color="grey" icon="book" content="Quitter et revenir à la liste des histoires" />}
        </Segment>
      ) : <ContentLoading /> }
    </div>
  );
}

ReadStoryBlock.defaultProps = {
  storyAuthor: 'Auteur(e) inconnu(e)',
};

ReadStoryBlock.propTypes = {
  storyAuthor: PropTypes.string,
  storyTitle: PropTypes.string.isRequired,
  getStory: PropTypes.func.isRequired,
  storyLoaded: PropTypes.bool.isRequired,
  storyNotFound: PropTypes.bool.isRequired,
  onGoing: PropTypes.bool.isRequired,
};

export default ReadStoryBlock;
