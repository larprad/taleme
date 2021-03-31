// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// == Import Components
import {
  Checkbox, Divider,
} from 'semantic-ui-react';
import StoryBlockContainer from '../../containers/CreateStoryBlocks/StoryBlock';
import CreateBlockModal from './CreateBlockModal';

// == Import styles & images
import './create-story-blocks.scss';

const CreateStoryBlocks = ({ blocks, createBlock }) => {
  // Handling popup local state
  const [open, setOpen] = useState(false);

  // Handling creation status
  const [status, setStatus] = useState('edit');

  // Feature variables that allows to link a choice to a block by clicking on the link,
  // then on the targeted block
  const [clickLink, setClickLink] = useState(false);

  // Feature that allows to hover a choice and display the linked block,
  // by slightly changing its style
  const [hoverLink, setHoverLink] = useState(false);

  // Feature variables that allows to click on a choice ans display the linked block,
  // as long as the choice is not modified, suppressed, or the view button clicked again
  const [lockLink, setLockLink] = useState([]);

  const [showAllBlocks, setShowAllBlocks] = useState(false);

  const hoverLinkFeature = {
    hoverLink,
    setHoverLink,
  };

  const lockLinkFeature = {
    lockLink,
    setLockLink,
  };

  const clickLinkFeature = {
    clickLink,
    setClickLink,
  };

  const handleToggleCheckBox = () => {
    setShowAllBlocks(!showAllBlocks);
  };

  const handleCreateClick = () => {
    setStatus('new');
    createBlock();
    setClickLink(null);
  };

  return (
    <div className="create-story-blocks">
      <div className="create-story-blocks-actions-container">
        <CreateBlockModal
          open={open}
          setOpen={setOpen}
          handleClick={handleCreateClick}
          status={status}
          setStatus={setStatus}
          button="bigNew"
        />
        <Checkbox className="create-story-blocks-checkbox" label="Développer tous les blocs" toggle defaultChecked onChange={handleToggleCheckBox} />
      </div>
      <Divider />
      <div className="create-story-blocks-container">
        <div className="create-story-blocks-container-flex">
          { blocks.map((block) => (
            <StoryBlockContainer
              key={block.id}
              {...block}
              {...clickLinkFeature}
              {...hoverLinkFeature}
              {...lockLinkFeature}
              open={open}
              setOpen={setOpen}
              status={status}
              setStatus={setStatus}
              showAllBlocks={showAllBlocks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

CreateStoryBlocks.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
    },
  ).isRequired).isRequired,
  storyTitle: PropTypes.string.isRequired,
  createBlock: PropTypes.func.isRequired,
};

export default withRouter(CreateStoryBlocks);
