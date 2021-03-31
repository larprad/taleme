import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

const DropdownDuration = ({
  durations, defaultValue, onChange,
}) => {
  const durationOptions = durations.map((duration) => ({
    key: duration.id,
    text: duration.length,
    value: duration.id,
  }));

  return (

    <Dropdown
      placeholder="Durée"
      fluid
      selection
      onChange={onChange}
      options={durationOptions}
      value={defaultValue}
      clearable
    />
  );
};

DropdownDuration.defaultProps = {
  defaultValue: null,
};

DropdownDuration.propTypes = {
  durations: PropTypes.array.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

export default DropdownDuration;
