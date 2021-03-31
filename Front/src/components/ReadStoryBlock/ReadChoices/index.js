// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import component
import ReadChoiceButton from '../ReadChoiceButton';

// == Import styles
import './read-choices.scss';

function ReadChoices({
  choices, choiceAction, setErrorMessage, testing,
}) {
  // Prevent application crash if a block
  return (
    <div className="read-choices">
      {choices.map((choice) => (
        <ReadChoiceButton
          key={choice.id}
          {...choice}
          choiceAction={choiceAction}
          setErrorMessage={setErrorMessage}
          testing={testing}
        />
      )) }
    </div>
  );
}

ReadChoices.defaultProps = {
  setErrorMessage: null,
  testing: false,
};

ReadChoices.propTypes = {
  choices: PropTypes.array.isRequired,
  choiceAction: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func,
  testing: PropTypes.bool,
};

export default ReadChoices;
