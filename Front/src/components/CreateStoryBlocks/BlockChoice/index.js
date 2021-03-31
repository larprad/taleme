// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import components
import { Button, Icon, Input } from 'semantic-ui-react';
import CreateBlockModal from '../CreateBlockModal';

// == Import styles & images
import './block-choice.scss';

const BlockChoice = ({
  id,
  text,
  idBlocks,
  createBlock,
  setOpen,
  open,
  setStatus,
  status,
  leadsToBlockTitle,
  unLinkChoice,
  setClickLink,
  clickLink,
  setHoverLink,
  setLockLink,
  lockLink,
}) => {
  /*   const handleChoiceDelete = () => {
    deleteChoice(id);
  }; */

  const handleRemoveLink = () => {
    unLinkChoice(id);
    setClickLink(null);
    if (id === lockLink[0]) { // If link was locked for viewing purposes, unlink the view
      setLockLink([]);
    }
  };

  const setClickingIsActive = clickLink === id;

  const handleChoiceLink = () => {
    // Stop click link if clicking again on the same button
    if (setClickingIsActive) {
      setClickLink(false);
    }
    else {
      setClickLink(id);
    }
  };

  const handleCreateClick = () => {
    setStatus('new');
    createBlock(id);
    setClickLink(null);
  };

  const handleClickLink = () => {
    if (lockLink[0] === id) {
      setLockLink([]);
    }
    else {
      setLockLink([id, idBlocks.leadsToBlock]);
    }
  };

  const handleMouseEnterLink = () => {
    setHoverLink(idBlocks.leadsToBlock);
  };

  const handleMouseLeaveLink = () => {
    setHoverLink(false);
  };

  const linkButtonActiveClass = classNames({ activeLink: setClickingIsActive });

  return (
    <div className="block-choice">
      <div className="block-choice-title-container">
        <p className="block-choice-title-text">{text}</p>
        <div className="block-choice-container-buttons">
          { idBlocks.leadsToBlock // If Choice is connected
            ? (
              <Button circular basic={lockLink[0] !== id} size="tiny" color="green" onClick={handleClickLink} onMouseEnter={handleMouseEnterLink} className="block-choice-container-button-look" onMouseLeave={handleMouseLeaveLink} icon labelPosition="right">
                {lockLink[0] === id ? <Icon name="lock" /> : <Icon name="eye" />}
                Voir
              </Button>
            )
            : (
              <>
                <Button className={linkButtonActiveClass} icon basic onClick={handleChoiceLink} size="tiny" color={setClickingIsActive ? 'green' : 'olive'}>
                  <Icon name="linkify" />
                </Button>
                <CreateBlockModal
                  open={open}
                  setOpen={setOpen}
                  handleClick={handleCreateClick}
                  status={status}
                  setStatus={setStatus}
                  button="new"
                />
              </>
            )}
        </div>

      </div>
      { idBlocks.leadsToBlock // If Choice is connected
        ? (
          <div className="block-choice-connection-container">
            <Input icon="linkify" iconPosition="left" disabled value={leadsToBlockTitle} />
            <div className="block-choice-container-buttons">
              <Button className={linkButtonActiveClass} onClick={handleChoiceLink} basic size="tiny" color={setClickingIsActive ? 'green' : 'yellow'} icon>
                <Icon name="exchange" />
              </Button>
              <Button onClick={handleRemoveLink} basic size="tiny" color="orange" icon>
                <Icon name="unlinkify" />
              </Button>
            </div>
          </div>
        ) : null}
    </div>
  );
};

BlockChoice.defaultProps = {
  leadsToBlockTitle: '',
  clickLink: null,
};

BlockChoice.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  idBlocks: PropTypes.shape({
    belongToBlock: PropTypes.number.isRequired,
    leadsToBlock: PropTypes.number,
  }).isRequired,
  createBlock: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired, // set Popup opening
  open: PropTypes.bool.isRequired, // value of popup opening
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  leadsToBlockTitle: PropTypes.string,
  unLinkChoice: PropTypes.func.isRequired,
  setClickLink: PropTypes.func.isRequired,
  clickLink: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setHoverLink: PropTypes.func.isRequired,
  setLockLink: PropTypes.func.isRequired,
  lockLink: PropTypes.array.isRequired,
};

export default BlockChoice;
