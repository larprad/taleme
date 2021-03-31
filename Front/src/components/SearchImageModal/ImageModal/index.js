/* eslint-disable max-len */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Modal, Dimmer, Loader, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';
import ImagesResults from '../Result';

const ImageModal = ({ image, handleUpdateImage }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [scrolling, setScrolling] = useState(false);
  // These states below are used to make precised images search
  const [type, setType] = useState('all');
  const [orientation, setOrientation] = useState('all');
  const [color, setColor] = useState('');
  const [lang, setLang] = useState('fr');

  const pixabayUrl = 'https://pixabay.com/api/?key=20023965-3b00d5f4b27532c41f5df8626&';

  const makeSearch = () => {
    setLoading(true);

    axios.get(`${pixabayUrl}q=${search}&image_type=${type}&orientation=${orientation}&colors=${color}&lang=${lang}&per_page=50&page=${page}`)
      .then((response) => {
        setImages([...images, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
        setScrolling(true);
      })
      .catch((error) => {
        console.log(error);
        setImages([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (search) {
      makeSearch();
    }
  }, [page]);

  useEffect(() => {
    setSearch('');
    setImages([]);
    setPage(1);
    setTotalHits(null);
    setScrolling(false);
    setType('all');
    setOrientation('all');
    setColor('');
    setLang('fr');
  }, [open]);

  useEffect(() => {
    setImages([]);
    setTotalHits(null);
    setScrolling(false);
  }, [type, orientation, color, lang]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button primary className="button-change-image">
          {image ? 'Choisir une autre image' : 'Télécharger une image' }
        </Button>
      )}
    >
      <Modal.Header>Entrer un mot clé pour rechercher des images</Modal.Header>
      <Modal.Content scrolling={scrolling}>
        <Modal.Description>
          <div className="modal-content">
            <SearchBar
              manageSubmit={makeSearch}
              search={search}
              setSearch={setSearch}
              setImages={setImages}
              setScrolling={setScrolling}
              setTotalHits={setTotalHits}
            />
            <SearchFilters
              defaultType={type}
              setType={setType}
              defaultOrientation={orientation}
              setOrientation={setOrientation}
              defaultColor={color}
              setColor={setColor}
              defaultLang={lang}
              setLang={setLang}
              setImages={setImages}
            />
            {totalHits > 0 && search !== '' && (<p>{totalHits} images trouvées</p>)}
            {totalHits === 0 && search !== '' && (<p>Aucune image n'a été trouvée</p>)}
            <ImagesResults images={images} setOpen={setOpen} handleUpdateImage={handleUpdateImage} />
            <Segment basic textAlign="center">
              {totalHits > 50 && (
                <Button loading={loading} primary onClick={handleSeeMore} circular>
                  Voir plus
                </Button>
              )}
            </Segment>
            {loading && (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )}
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Annuler</Button>
      </Modal.Actions>
    </Modal>
  );
};

ImageModal.defaultProps = {
  image: null,
};

ImageModal.propTypes = {
  image: PropTypes.string,
  handleUpdateImage: PropTypes.func.isRequired,
};

export default ImageModal;
