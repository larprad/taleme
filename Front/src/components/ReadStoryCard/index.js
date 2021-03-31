// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

// == Import components
import { Card, Image } from 'semantic-ui-react';

// == Import styles & images
import './readstorycard.scss';
import defaultImage from '../../assets/images/defaultImage.jpeg';

const ReadStoryCard = ({
  title, summary, image, user, slug, themesArray, durationObject,
}) => {
  const history = useHistory();
  function handleCardClick() {
    history.push(`/lecture/${slug}`);
  }

  let imageToDisplay;
  if (!image) {
    imageToDisplay = defaultImage;
  }
  else {
    imageToDisplay = image;
  }

  return (
    <div className="card-container">
      <Card raised link onClick={handleCardClick}>
        <Image className="card-container-image" src={imageToDisplay} fluid />
        <Card.Content className="card-container-content">
          <div className="card-container-title" style={{ overflowWrap: 'break-word' }}>{title}</div>
          <Card.Meta>Auteur·e : <b>{user.pseudo}</b></Card.Meta>
          <Card.Meta>Themes :<b>{themesArray ? themesArray.map((item) => ` ${item.name}`) : null}</b></Card.Meta>
          <Card.Meta>Durée : <b>{durationObject.length}</b></Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Description className="card-container-description" style={{ overflowWrap: 'break-word' }}>
            {summary}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

ReadStoryCard.defaultProps = {
  image: '',
  durationObject: {
    id: null,
    length: null,
  },
  themesArray: [{
    id: null,
    name: null,
  }],

};

ReadStoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  image: PropTypes.string,
  themesArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  durationObject: PropTypes.shape({
    id: PropTypes.number,
    length: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReadStoryCard;
