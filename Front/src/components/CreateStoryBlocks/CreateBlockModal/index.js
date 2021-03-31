// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Button, Modal, Icon,
} from 'semantic-ui-react';
import CreateBlockContainer from '../../../containers/CreateBlock';

// == Import styles
import './create-block-modal.scss';

function CreateBlockModal({
  open, setOpen, handleClick, fromChoiceId, status, setStatus, button,
}) {
  const buttonLayout = () => {
    switch (button) {
      case 'new': {
        return (
          <Button size="tiny" color="blue" basic onClick={handleClick}>
            <b>+</b> Bloc
          </Button>
        );
      }
      case 'edit': {
        return (
          <Button size="tiny" color="blue" basic icon labelPosition="right" onClick={handleClick}>
            <Icon name="edit" />
            Editer
          </Button>
        );
      }
      case 'bigNew': {
        return (
          <Button color="blue" onClick={handleClick} icon labelPosition="left"><Icon name="plus" />Créer un bloc</Button>
        );
      }
      default: return (
        <Button size="tiny" color="red" basic>
          Erreur
        </Button>
      );
    }
  };

  return (
    <Modal
      className="create-block-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={buttonLayout()}
    >
      <CreateBlockContainer
        backAction={setOpen}
        fromChoiceId={fromChoiceId}
        setOpen={setOpen}
        status={status}
        setStatus={setStatus}
        button={button}
      />
    </Modal>
  );
}

CreateBlockModal.defaultProps = {
  fromChoiceId: null,
};

CreateBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  fromChoiceId: PropTypes.number,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  button: PropTypes.string.isRequired,
};

export default CreateBlockModal;
