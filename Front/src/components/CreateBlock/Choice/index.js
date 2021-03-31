// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import component
import { Input, Button, Icon } from 'semantic-ui-react';

// == Import styles
import './choice.scss';

const Choice = ({
  text,
  id,
  updateChoiceInfos,
  deleteLocalChoice,
  idBlocks,
  setChoicesToDelete,
  choicesToDelete,

}) => {
  const handleChange = (event) => {
    updateChoiceInfos(id, event.target.value);
  };

  // Checking is the choice is already existing in the database or not
  const dataBaseDelete = idBlocks;

  const handleClick = () => {
    deleteLocalChoice(id);
    if (dataBaseDelete) {
      // deleteDatabaseChoice(id);
      const newChoicesToDelete = choicesToDelete.concat(id);
      setChoicesToDelete(newChoicesToDelete);
    }
  };

  return (
    <div className="choice">
      <Input className="choice-input" type="text" placeholder="Ceci est un choix" name="choice" value={text} onChange={handleChange} />
      <Button basic icon color="red" onClick={handleClick}>
        <Icon name="delete" />
      </Button>
    </div>
  );
};

Choice.defaultProps = {
  idBlocks: false,
};

Choice.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  updateChoiceInfos: PropTypes.func.isRequired,
  deleteLocalChoice: PropTypes.func.isRequired,
  idBlocks: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  setChoicesToDelete: PropTypes.func.isRequired,
  choicesToDelete: PropTypes.array.isRequired,
};

export default Choice;
