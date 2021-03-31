import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import {
  Segment, Header, Button, Icon, Grid, Message,
} from 'semantic-ui-react';

import DeleteModal from '../../containers/DeleteModal';
import TestStoryModal from './TestStoryModal';
import DashboardStats from '../../containers/CreateDashboard/DashboardStats';

const DashboardActionButtons = ({
  id,
  isNew,
  manageCreateStory,
  manageSaveStory,
  slug,
  loading,
  manageDeleteStory,
  clearNotification,
  managePublishStory,
  storyStatus,
  handleTestStory,
  setTitleError,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [unPublishable, setUnpublishable] = useState(true);

  const history = useHistory();
  useEffect(() => {
    if (slug !== '') {
      history.push(`/creation/edition/${slug}`);
    }
  });

  const handleSaveClick = () => {
    if (title !== '') {
      if (isNew) {
        manageCreateStory();
      }
      else {
        manageSaveStory();
      }
    }
    else {
      setTitleError(true);
      setTimeout(() => setTitleError(false), 3000);
    }
  };

  const handleDeleteClick = () => {
    manageDeleteStory(id);
    setTimeout(() => {
      history.push('/creation');
      clearNotification();
    }, 0);
  };

  const handlePublishClick = () => {
    managePublishStory(storyStatus);
  };

  return (
    <div className="dashboardExtras">
      <Grid columns={2}>
        <Grid.Column mobile={16} computer={9}>
          <DashboardStats
            unPublishable={unPublishable}
            setUnpublishable={setUnpublishable}
          />
        </Grid.Column>

        <Grid.Column mobile={16} computer={7}>
          <Segment className="dashboard-actions">
            <Header size="medium">Actions</Header>
            <Grid centered>
              <Grid.Row columns={1}>
                <Button color="grey" positive onClick={handleSaveClick} loading={loading}>
                  <Icon name="save" />
                  Sauvegarder l'histoire
                </Button>
              </Grid.Row>

              {isNew && (
              <Grid.Row columns={1}>
                <Message info>
                  Sauvegardez votre histoire une première fois pour commencer à créer des blocs !
                </Message>
              </Grid.Row>
              )}

              {!isNew && (
                <>
                  <Grid.Row columns={1}>
                    <TestStoryModal>
                      <Button primary fluid={false} onClick={handleTestStory}>
                        <Icon name="play circle outline" />
                        Tester l'histoire
                      </Button>
                    </TestStoryModal>
                  </Grid.Row>

                  <Grid.Row columns={1}>
                    { storyStatus === 1
                      ? (
                        <Button color="violet" basic={unPublishable} disabled={unPublishable} onClick={handlePublishClick} loading={loading}>
                          <Icon name="book" />
                          Publier l'histoire
                        </Button>
                      )
                      : (
                        <Button basic color="violet" onClick={handlePublishClick} loading={loading}>
                          <Icon name="eye slash" />
                          Dépublier l'histoire
                        </Button>
                      )}

                  </Grid.Row>

                  <Grid.Row columns={1}>
                    <DeleteModal
                      open={open}
                      setOpen={setOpen}
                      loading={loading}
                      handleDeleteClick={handleDeleteClick}
                    >
                      <Button negative>
                        <Icon name="trash alternate" />
                        Supprimer l'histoire
                      </Button>
                    </DeleteModal>
                  </Grid.Row>
                </>
              )}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

DashboardActionButtons.defaultProps = {
  id: null,
  storyStatus: null,
  title: '',
};

DashboardActionButtons.propTypes = {
  id: PropTypes.number,
  isNew: PropTypes.bool.isRequired,
  manageCreateStory: PropTypes.func.isRequired,
  manageSaveStory: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  manageDeleteStory: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
  managePublishStory: PropTypes.func.isRequired,
  storyStatus: PropTypes.number,
  handleTestStory: PropTypes.func.isRequired,
  title: PropTypes.string,
  setTitleError: PropTypes.func.isRequired,
};

export default DashboardActionButtons;
