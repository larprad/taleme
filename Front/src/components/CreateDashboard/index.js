import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './createDashboard.scss';

import DashboardForm from '../../containers/CreateDashboard/DashbordForm';
import DashboardActionButtons from '../../containers/CreateDashboard/DashboardActionButtons';
import DashboardFormPlaceholder from './Placeholders/DashboardFormPlaceholder';

const CreateDashboard = ({
  isNew, createStoryLoaded,
}) => {
  const [titleError, setTitleError] = useState(false);

  return (
    <div className="create-dashboard">

      {createStoryLoaded || isNew
        ? <DashboardForm titleError={titleError} />
        : <DashboardFormPlaceholder />}
      {createStoryLoaded || isNew
        ? <DashboardActionButtons isNew={isNew} setTitleError={setTitleError} />
        : <DashboardFormPlaceholder />}

    </div>
  );
};

CreateDashboard.propTypes = {
  isNew: PropTypes.bool.isRequired,
  createStoryLoaded: PropTypes.bool.isRequired,
};

export default CreateDashboard;
