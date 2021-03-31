import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Segment, Form } from 'semantic-ui-react';

import DropdownTheme from '../../containers/DropdownThemes';
import DropdownDuration from '../../containers/DropdownDuration';
import DashboardFormField from './DashboardFormField';
import SearchImageModal from '../../containers/SearchImageModal';

const DashboardForm = ({
  title,
  summary,
  updateStoryInfos,
  image,
  manageImageStory,
  handleDurationSelected,
  handleThemesSelected,
  defaultValueDuration,
  defaultValueTheme,
  titleError,
  serverErrors,
}) => {
  const handleImageStory = (webformatURL) => {
    manageImageStory(webformatURL);
  };
  const handleSelectDuration = (event, { value }) => {
    handleDurationSelected(value);
  };
  const handleSelectThemes = (event, { value }) => {
    handleThemesSelected(value);
  };

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (serverErrors.title) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 2000);
    }
  }, [serverErrors]);

  return (
    <Segment>
      <Form className="dashboard-form dashboard-form-message-container">
        { errorMessage// Error object is not empty ?
        && (
        <div className="dashboard-form-message"> <h4>😲 Il y a un petit problème... Ce titre est déjà pris !</h4>
          <p>L'histoire n'a pas été sauvegardée</p>
        </div>
        )}
        <div className="dashboard-image">
          <SearchImageModal image={image} handleUpdateImage={handleImageStory} />
        </div>
        <div className="dashboard-infos">
          <DashboardFormField name="title" placeholder={titleError ? 'Le texte du titre ne peut pas être vide' : 'Titre de votre histoire'} label="Titre" value={title} manageChange={updateStoryInfos} error={titleError} />
          <DashboardFormField name="summary" placeholder="Résumé de votre histoire" label="Résumé" value={summary} manageChange={updateStoryInfos} />
          <div className="dashboard-dropdown-container">
            <DropdownDuration
              onChange={handleSelectDuration}
              defaultValue={defaultValueDuration}
            />
            <DropdownTheme
              onChange={handleSelectThemes}
              defaultValue={defaultValueTheme}
            />
          </div>
        </div>
      </Form>
    </Segment>
  );
};

DashboardForm.defaultProps = {
  defaultValueDuration: null,
  defaultValueTheme: [],
  image: null,
  serverErrors: { title: null },
};

DashboardForm.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  updateStoryInfos: PropTypes.func.isRequired,
  image: PropTypes.string,
  manageImageStory: PropTypes.func.isRequired,
  handleDurationSelected: PropTypes.func.isRequired,
  handleThemesSelected: PropTypes.func.isRequired,
  defaultValueDuration: PropTypes.number,
  defaultValueTheme: PropTypes.array,
  titleError: PropTypes.bool.isRequired,
  serverErrors: PropTypes.shape({ title: PropTypes.string }),
};

export default DashboardForm;
