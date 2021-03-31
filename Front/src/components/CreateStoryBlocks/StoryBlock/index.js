// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import components
import { Button, Icon } from 'semantic-ui-react';
import BlockChoiceContainer from '../../../containers/CreateStoryBlocks/BlockChoice';
import CreateBlockModal from '../CreateBlockModal';

// == Import styles & images
import './story-block.scss';

// == Import utils
import { checkIfAllChoicesAreConnected, checkIfBlockIsConnected, getBlockBackConnections } from '../../../utils/storyUtils';

const StoryBlock = ({
  title,
  choices,
  type,
  editBlock,
  id,
  deleteBlock,
  allChoices,
  setClickLink,
  clickLink,
  linkChoiceToBlock,
  showAllBlocks,
  hoverLink,
  setHoverLink,
  setLockLink,
  lockLink,
  open,
  setOpen,
  status,
  setStatus,
}) => {
  // If choices are modified in the database, we must check if the locked link is still existing
  // If not, the lock link feature is reseted
  useEffect(() => {
    if (lockLink[0]) {
      const choiceExist = allChoices.find((choice) => choice.id === lockLink[0]);
      if (!choiceExist) {
        setLockLink([]);
      }
    }
  }, [allChoices]);
  // Handling style with local state
  const [accordeon, setAccordeon] = useState(false);

  // When component mount and showAllBlocks is changing, update accordeon local state,
  useEffect(() => setAccordeon(showAllBlocks), [showAllBlocks]);

  // Check if allChoiceAreConnected
  const choicesConnectionStatus = checkIfAllChoicesAreConnected(choices);
  const blockConnectionStatus = checkIfBlockIsConnected(allChoices, id, type);
  const blockBackConnections = getBlockBackConnections(allChoices, id);

  const titleInfosContainerClassBack = classNames('story-block-title-infos', {
    connected: blockConnectionStatus === 'connected',
    notConnected: blockConnectionStatus === 'notConnected',
  });

  const titleInfosContainerClassFront = classNames('story-block-title-infos', {
    active: choicesConnectionStatus === 'allConnected',
    final: choicesConnectionStatus === 'final',
    ongoing: choicesConnectionStatus === 'notAllConnected',
  });

  const storyBlockClass = classNames({ haslink: hoverLink === id || lockLink[1] === id });

  const choicesQuantity = choices.length;
  const choicesConnected = choices.filter((choice) => choice.idBlocks.leadsToBlock !== null).length;

  /*   // Handling popup local state
  const [open, setOpen] = useState(false);

  // Handling creation status
  const [status, setStatus] = useState('edit'); */

  // Deal with accrodeon effect
  const classNameChoices = classNames('story-block-choices-container', { mini: accordeon });

  // Handling color code depending on the state of the block
  const classNameButton = classNames({ 'rotate-0': accordeon }, { 'rotate-180': !accordeon });

  // Put selected block in currentCreatedBlock in the state
  const handleEditClick = () => {
    setStatus('edit');
    editBlock(id);
    setClickLink(null);
  };

  const handleDeleteClick = () => {
    deleteBlock(id);
    setClickLink(null);
    // If the deleted block was highlited by a choice, the corresponding choice view
    // option should not be active
    if (lockLink[1] === id) {
      setLockLink([]);
    }
  };

  const handleClickLink = () => {
    if (clickLink === lockLink[0]) { // If link was locked for viewing purposes, unlink the view
      setLockLink([clickLink, id]);
    }
    linkChoiceToBlock(clickLink, id);
    setClickLink(null);
  };

  const clickLinkConditon = clickLink && type !== 1; // Block initial can't be linked from behind

  return (
    <div className="story-block">
      <div className={storyBlockClass}>
        <div className="story-block-title-container">
          <div className={titleInfosContainerClassBack}>
            {blockBackConnections.length
              ? (
                <div>
                  {blockBackConnections.length}
                  <Icon name="linkify" />
                </div>
              )

              : <Icon name="unlinkify" />}
          </div>
          <h4 className="story-block-title-container-text">{title}</h4>
          <div className={titleInfosContainerClassFront}>
            {choicesQuantity ? <div>{choicesConnected}/{choicesQuantity}{choicesConnected !== choicesQuantity ? <Icon name="unlinkify" /> : <Icon name="linkify" disabled />}</div> : <Icon name="unlinkify" />}
          </div>
        </div>
      </div>
      <div className="story-block-buttons-container">
        <Button
          disabled={Boolean(!choices.length)}
          compact
          icon
          onClick={() => setAccordeon(!accordeon)}
        >
          <Icon name="dropdown" className={classNameButton} />
        </Button>
        {clickLinkConditon && <Button className="link-here-button" onClick={handleClickLink} icon size="tiny" labelPosition="right" color="green"><Icon name="linkify" />Lier ici</Button>}
        <div className="story-block-title-container-buttons">
          <CreateBlockModal
            open={open}
            setOpen={setOpen}
            handleClick={handleEditClick}
            status={status}
            setStatus={setStatus}
            button="edit"
          />
          {type !== 1 && (
            <Button basic onClick={handleDeleteClick} size="tiny" color="red" icon>
              <Icon name="trash alternate" />
            </Button> // Initial block of the story shall not be deleted
          )}
        </div>
      </div>
      <div className={classNameChoices}>
        { choices.length > 0
          ? choices.map((choice) => (
            <BlockChoiceContainer
              key={choice.id}
              {...choice}
              open={open}
              setOpen={setOpen}
              status={status}
              setStatus={setStatus}
              setClickLink={setClickLink}
              clickLink={clickLink}
              hoverLink={hoverLink}
              setHoverLink={setHoverLink}
              setLockLink={setLockLink}
              lockLink={lockLink}
            />
          ))
          : null}
      </div>
    </div>
  );
};

StoryBlock.defaultProps = {
  clickLink: null,
  hoverLink: null,
};

StoryBlock.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  allChoices: PropTypes.array.isRequired,
  type: PropTypes.number.isRequired,
  editBlock: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  linkChoiceToBlock: PropTypes.func.isRequired,
  clickLink: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  hoverLink: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setClickLink: PropTypes.func.isRequired,
  showAllBlocks: PropTypes.bool.isRequired,
  setHoverLink: PropTypes.func.isRequired,
  setLockLink: PropTypes.func.isRequired,
  lockLink: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default StoryBlock;
