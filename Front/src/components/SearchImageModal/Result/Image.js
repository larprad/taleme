import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image as ImageUI } from 'semantic-ui-react';

const Image = ({
  webformatURL, handleUpdateImage, setOpen,
}) => {
  const handleClickImage = () => {
    handleUpdateImage(webformatURL);
    setOpen(false);
  };

  return (
    <Card onClick={handleClickImage}>
      <ImageUI src={webformatURL} wrapped ui={false} alt={webformatURL} />
    </Card>
  );
};

Image.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  handleUpdateImage: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Image;
