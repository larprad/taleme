import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import {
  Card, Image, Button, Icon, Segment, Grid, Divider,
} from 'semantic-ui-react';

import { getTranslatedStatus } from '../../utils/storyUtils';

import defaultImage from '../../assets/images/defaultImage.jpeg';

import DeleteModal from '../../containers/DeleteModal';

const CreateListStories = ({
  // eslint-disable-next-line max-len
  id,
  title,
  summary,
  image,
  status,
  themes,
  duration,
  slug,
  loading,
  manageDeleteStory,
  clearNotification,
}) => {
  const [open, setOpen] = useState(false);

  const statusText = getTranslatedStatus(status);

  const history = useHistory();
  const handleEditClick = () => {
    history.push(`/creation/edition/${slug}`);
  };

  const handleDeleteClick = () => {
    manageDeleteStory(id);
    setTimeout(() => {
      setOpen(false);
      clearNotification();
    }, 2000);
  };

  const statusClass = classNames({ published: statusText === 'Publiée' });

  return (

    <Card fluid raised centered className="card-story">
      <Card.Content>
        <Grid verticalAlign="middle">
          <Grid.Column mobile={8} computer={3}>
            <Image
              className="card-image"
              size="small"
              src={image || defaultImage}
            />
          </Grid.Column>
          <Grid.Column className="story-buttons" mobile={8} computer={3}>
            <Button className="edit-button" icon onClick={handleEditClick} color="blue">
              <Icon name="edit outline" />
            </Button>
            <DeleteModal
              open={open}
              setOpen={setOpen}
              loading={loading}
              handleDeleteClick={handleDeleteClick}
            >
              <Button icon negative>
                <Icon name="trash alternate" />
              </Button>
            </DeleteModal>
            <Segment basic className="story-status">
              <Card.Meta className={statusClass}>Status : { statusText } </Card.Meta>
              <Card.Meta>{duration ? `Durée : ${duration.length}` : null} </Card.Meta>
            </Segment>
          </Grid.Column>

          <Grid.Column mobile={16} computer={10}>
            <Card.Header className="story-header">{title}</Card.Header>
            <Card.Meta>{themes.map((theme) => `${theme.name} · `)}</Card.Meta>
            <Divider />
            <Card.Description> {summary} </Card.Description>
          </Grid.Column>
        </Grid>

      </Card.Content>
    </Card>
  );
};
CreateListStories.defaultProps = {
  duration: null,
  themes: [{ name: null }],
  image: null,
};

CreateListStories.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  image: PropTypes.string,
  status: PropTypes.number.isRequired,
  themes: PropTypes.array,
  duration: PropTypes.shape({
    length: PropTypes.string,
  }),
  slug: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  manageDeleteStory: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
};

export default CreateListStories;
