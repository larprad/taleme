// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import styles
import './read-choices-button.scss';

function ReadChoiceButton({
  text, id, idBlocks, choiceAction, setErrorMessage, testing,
}) {
  const handleClick = () => {
    // If no block is linked to a choice, display an error message
    if (idBlocks.leadsToBlock === null) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
    else {
      choiceAction(idBlocks.leadsToBlock, id);
    }
  };

  const buttonClassName = classNames('read-choices-button', { test: testing });

  return (
    <button type="button" onClick={handleClick} className={buttonClassName}>
      {text}
    </button>
  );
}

ReadChoiceButton.defaultProps = {
  idBlocks: PropTypes.shape({
    leadsToBlock: null,
  }),
  setErrorMessage: null,
  testing: false,
};

ReadChoiceButton.propTypes = {
  text: PropTypes.string.isRequired,
  idBlocks: PropTypes.shape({
    belongToBlock: PropTypes.number.isRequired,
    leadsToBlock: PropTypes.number,
  }),
  choiceAction: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setErrorMessage: PropTypes.func,
  testing: PropTypes.bool,
};

export default ReadChoiceButton;
