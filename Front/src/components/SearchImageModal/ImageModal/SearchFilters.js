/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Dropdown, Form, Menu,
} from 'semantic-ui-react';

import {
  typeOptions, orientationOptions, colorsOptions, langOptions,
} from './SearchFiltersData';

export const SearchFilters = ({
  defaultType,
  setType,
  defaultOrientation,
  setOrientation,
  defaultColor,
  setColor,
  defaultLang,
  setLang,
}) => {
  const handleSelectedType = (event, { value }) => {
    setType(value);
  };

  const handleSelectedOrientation = (event, { value }) => {
    setOrientation(value);
  };

  const handleSelectedColor = (event, { value }) => {
    setColor(value);
  };

  const handleSelectedLang = (event, { value }) => {
    setLang(value);
  };

  return (
    <div className="search-filters">
      <Segment basic>
        <Form className="filters-form">
          <Form.Field className="filters-field">
            <label> Langue de recherche</label>
            <Menu compact>
              <Dropdown
                item
                options={langOptions}
                value={defaultLang}
                onChange={handleSelectedLang}
                closeOnChange
              />
            </Menu>
          </Form.Field>
          <Form.Field className="filters-field">
            <label> Type d'images</label>
            <Menu compact>
              <Dropdown
                item
                options={typeOptions}
                value={defaultType}
                onChange={handleSelectedType}
                closeOnChange
              />
            </Menu>
          </Form.Field>
          <Form.Field className="filters-field">
            <label> Orientation</label>
            <Menu compact>
              <Dropdown
                item
                options={orientationOptions}
                value={defaultOrientation}
                onChange={handleSelectedOrientation}
                closeOnChange
              />
            </Menu>
          </Form.Field>
          <Form.Field className="filters-field">
            <label> Couleur</label>
            <Menu compact>
              <Dropdown
                scrolling
                clearable
                item
                options={colorsOptions}
                value={defaultColor}
                onChange={handleSelectedColor}
                closeOnChange
                placeholder="Choisir une couleur"
              />
            </Menu>
          </Form.Field>
        </Form>
      </Segment>
    </div>
  );
};

SearchFilters.propTypes = {
  defaultType: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  defaultOrientation: PropTypes.string.isRequired,
  setOrientation: PropTypes.func.isRequired,
  defaultColor: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  defaultLang: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
};

export default SearchFilters;
