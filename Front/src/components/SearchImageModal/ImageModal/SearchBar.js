import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Input, Form, Segment,
} from 'semantic-ui-react';

const SearchBar = ({
  manageSubmit, search, setSearch, setImages, setScrolling, setTotalHits,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    manageSubmit();
  };

  const refInput = useRef(null);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div>
      <Segment basic>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              action="Rechercher"
              placeholder="Rechercher"
              icon="search"
              iconPosition="left"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setImages([]);
                setScrolling(false);
                setTotalHits(null);
              }}
              ref={refInput}
            />
          </Form.Field>
        </Form>
      </Segment>
    </div>
  );
};

SearchBar.propTypes = {
  manageSubmit: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
  setScrolling: PropTypes.func.isRequired,
  setTotalHits: PropTypes.func.isRequired,
};

export default SearchBar;
