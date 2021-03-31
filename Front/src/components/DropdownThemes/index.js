import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

const DropdownTheme = ({
  themes, defaultValue, onChange,
}) => {
  const themesOptions = themes.map((theme) => ({
    key: theme.id,
    text: theme.name,
    value: theme.id,
  }));

  return (
    <Dropdown
      placeholder="Thème"
      fluid
      multiple
      selection
      onChange={onChange}
      options={themesOptions}
      value={defaultValue}
    />
  );
};

DropdownTheme.defaultProps = {
  defaultValue: [],
};

DropdownTheme.propTypes = {
  themes: PropTypes.array.isRequired,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default DropdownTheme;
