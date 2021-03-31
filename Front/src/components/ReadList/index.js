// == Import npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Card,
} from 'semantic-ui-react';
import ReadStoryCardContainer from '../../containers/ReadList/ReadStoryCard';
import DropdownTheme from '../../containers/DropdownThemes';
import DropdownDuration from '../../containers/DropdownDuration';

// == Import syles
import './readlist.scss';

// ReadList is the component who show us all the stories (apply filters in V2)
// it's the homepage of the Reading Story part of the application

const ReadList = ({
  datas,
  getAllStories,
  saveThemes,
  saveDuration,
  defaultValueThemes,
  defaultValueDuration,
}) => {
  useEffect(() => {
    getAllStories();
    saveDuration(null);
    saveThemes([]);
  }, []);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(datas);
  }, [datas]);

  const handleSelectDuration = (event, { value }) => {
    saveDuration(value);
  };
  const handleSelectThemes = (event, { value }) => {
    saveThemes(value);
  };

  useEffect(() => {
    let tempFilter = datas;
    if (defaultValueDuration) {
      tempFilter = datas.filter((story) => story.idDuration === defaultValueDuration);
      setFilteredData(tempFilter);
    }
    if (defaultValueThemes.length > 0) {
      const tempFilterAgain = tempFilter
        .filter((story) => defaultValueThemes
          .some((theme) => story.idThemes.includes(theme)));
      setFilteredData(tempFilterAgain);
    }
    if (defaultValueThemes.length === 0 && !defaultValueDuration) {
      setFilteredData(datas);
    }
  }, [defaultValueThemes, defaultValueDuration]);

  return (
    <main className="read-list">
      <div className="read-list-title-container">
        <h1 className="read-list-title">
          Choisissez une Aventure
        </h1>
        <h4 className="read-list-sub-title">
          Laissez vous emporter par une aventure interactive aux multiples embranchements !
        </h4>
      </div>

      <div className="read-list-dropdown-container">
        <p className="read-list-dropdown-container-title">Filtres</p>
        <div className="read-list-dropdown-inner-container">
          <DropdownTheme
            defaultValue={defaultValueThemes}
            onChange={handleSelectThemes}
          />
          <DropdownDuration
            defaultValue={defaultValueDuration}
            onChange={handleSelectDuration}
          />
        </div>
      </div>
      <Card.Group itemsPerRow={3} doubling centered className="read-list-cards-container">
        {filteredData.map((data) => (
          <ReadStoryCardContainer
            key={data.id}
            {...data}
          />
        ))}
      </Card.Group>
    </main>
  );
};

ReadList.defaultProps = {
  defaultValueDuration: null,
  defaultValueThemes: [],
};

ReadList.propTypes = {
  loading: PropTypes.bool.isRequired,
  datas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  getAllStories: PropTypes.func.isRequired,
  defaultValueDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValueThemes: PropTypes.array,
  saveDuration: PropTypes.func.isRequired,
  saveThemes: PropTypes.func.isRequired,
};
export default ReadList;
