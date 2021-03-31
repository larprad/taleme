import React from 'react';
import PropTypes from 'prop-types';

import { Form, TextArea } from 'semantic-ui-react';

const DashboardFormField = ({
  label, placeholder, name, value, manageChange, error,
}) => {
  const handleChange = (event) => {
    manageChange(event.target.value, name);
  };

  return (
    <div className="dashboard-infos-field">
      {name === 'title' ? (
        <Form.Field required error={error}>
          <label htmlFor={name}>{label}</label>
          <input placeholder={placeholder} name={name} value={value} onChange={handleChange} />
        </Form.Field>
      )
        : (
          <>
            <label htmlFor={name}>{label}</label>
            <TextArea className="dashboard-infos-field-summary" placeholder={placeholder} name={name} value={value} onChange={handleChange} />
          </>
        )}
    </div>
  );
};

DashboardFormField.defaultProps = {
  error: false,
};

DashboardFormField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  manageChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default DashboardFormField;
