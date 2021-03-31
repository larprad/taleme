// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import composants
import {
  Header, Message, Segment, Button, Icon,
} from 'semantic-ui-react';
import ReadBlockContentContainer from '../../../containers/ReadStoryBlock/ReadBlockContent';
import ReadChoicesContainer from '../../../containers/ReadStoryBlock/ReadChoices';

import '../../ReadStoryBlock/ReadBlockContent/read-block-content.scss';

// == Import style

const TestStoryBlock = ({
  storyTitle, onGoing, setOpen, goBack, prevBlockId,
}) => {
  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleGoBackClick = () => {
    goBack(prevBlockId);
  };

  const [errorMessage, setErrorMessage] = useState(false);

  return (
    <div className="test-story-block">
      <Segment basic>
        <Header as="h3" textAlign="center">{storyTitle}</Header>
      </Segment>

      <Segment className="test-story-block-content">
        <ReadBlockContentContainer testing />
        {errorMessage && (
          <Message color="red">
            <Message.Content><p>Ce choix n'est relié à aucun bloc !</p></Message.Content>
          </Message>
        ) }
        {onGoing && <ReadChoicesContainer setErrorMessage={setErrorMessage} testing />}
        {!onGoing && <Message color="purple" className="test-story-bloc-ending" header="Votre histoire est terminée !" content="Satisfait de votre histoire ? Il est peut-être temps de la publier 😉 ! Sinon, vous pouvez toujours retourner travailler dessus !" />}
      </Segment>
      <Segment basic>
        <Button icon labelPosition="left" onClick={handleCloseClick}>
          <Icon name="stop" />
          Retour
        </Button>
        {prevBlockId && (
        <Button icon labelPosition="left" onClick={handleGoBackClick}>
          <Icon name="undo" />
          Choix précédent
        </Button>
        )}
      </Segment>
    </div>
  );
};

TestStoryBlock.defaultProps = {
  prevBlockId: false,
};

TestStoryBlock.propTypes = {
  storyTitle: PropTypes.string.isRequired,
  onGoing: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  prevBlockId: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  goBack: PropTypes.func.isRequired,
};

export default TestStoryBlock;
