import React from 'react';
import PropTypes from 'prop-types';

import './search-image-modal.scss';

import {
  Header, Segment, Icon, Image,
} from 'semantic-ui-react';
import ImageModal from './ImageModal';

const SearchImageModal = ({ image, handleUpdateImage }) => (
  <>
    {image
      ? (
        <Segment placeholder className="block-image" basic>
          <Image className="image-chosen" src={image} size="large" centered />
          <ImageModal image={image} handleUpdateImage={handleUpdateImage} />
        </Segment>
      )
      : (
        <Segment placeholder className="block-image">
          <Header icon>
            <Icon name="file image outline" />
          </Header>
          <ImageModal handleUpdateImage={handleUpdateImage} />
        </Segment>
      )}
  </>

);
SearchImageModal.defaultProps = {
  image: null,
};

SearchImageModal.propTypes = {
  image: PropTypes.string,
  handleUpdateImage: PropTypes.func.isRequired,
};

export default SearchImageModal;
