import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Image from '../../../containers/SearchImageModal/Result/Image';

const ImagesResults = ({
  images, setOpen, handleUpdateImage,
}) => (
  <Card.Group itemsPerRow={2}>
    {images.map((image) => (
      <Image
        key={image.id}
        {...image}
        setOpen={setOpen}
        handleUpdateImage={handleUpdateImage}
      />
    ))}
  </Card.Group>
);

ImagesResults.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  setOpen: PropTypes.func.isRequired,
  handleUpdateImage: PropTypes.func.isRequired,
};

export default ImagesResults;
