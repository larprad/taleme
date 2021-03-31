// == Import npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import components
import {
  Segment,
} from 'semantic-ui-react';
import ReadChoicesContainer from '../../../containers/ReadStoryBlock/ReadChoices';
import RestartStoryContainer from '../../../containers/ReadStoryBlock/RestartStory';

// == Import style & image
import './read-block-content.scss';
import defaultImage from '../../../assets/images/defaultImage.jpeg';

function ReadBlockContent({
  image, text, prevChoice, onGoing, testing,
}) {
  let imageToDisplay;
  if (image === '' || image === null) {
    imageToDisplay = defaultImage;
  }
  else {
    imageToDisplay = image;
  }

  const [newText, setNewText] = useState(false);

  useEffect(() => {
    if (!testing) {
      setNewText(true);
      setTimeout(() => setNewText(false), 500);
    }
  },
  [text]);

  const textClassName = classNames('read-block-content-text', { test: testing, fade: newText });
  const previousClassName = classNames('read-block-content-previous', { test: testing });
  const imageClassName = classNames('read-block-content-image', { test: testing, fade: newText });

  return (
    <div className="read-block-content">
      <div className="read-block-content-image-container">
        <img src={imageToDisplay} alt="" className={imageClassName} />
      </div>
      <div className="read-block-content-text-container">
        <Segment vertical className={previousClassName}>
          { prevChoice
            ? (
              <div>
                <h4>Choix précédent</h4>
                <h3>{prevChoice}</h3>
              </div>
            )
            : <div><h4 color="grey" as="h5">{ !testing && 'Votre histoire commence'}</h4><h3>...</h3></div> }
        </Segment>
        <div className="read-block-flex-trick">
          {text ? <div className={textClassName}><p>{text}</p></div> : <br />}
          {(onGoing && !testing) && <ReadChoicesContainer />}
          {(!onGoing && !testing) && (
          <div className="read-story-bloc-ending">
            <h4>L'histoire est terminée !</h4>
            <p>
              Rééssayez en faisant des choix différents...
              Ou lancez vous dans une nouvelle aventure !
            </p>
          </div>
          )}
          {!testing && <RestartStoryContainer />}
        </div>
      </div>
    </div>
  );
}

ReadBlockContent.defaultProps = {
  prevChoice: false,
  image: '',
  text: '',
  testing: false,
};

ReadBlockContent.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  prevChoice: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onGoing: PropTypes.bool.isRequired,
  testing: PropTypes.bool,
};

export default ReadBlockContent;
