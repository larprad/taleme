import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'semantic-ui-react';

const DeleteModal = ({
  open, setOpen, loading, notification, handleDeleteClick, setCreationLoader, children,
}) => (
  <Modal
    className="login-modal"
    onOpen={() => {
      setOpen(true);
      setCreationLoader(false);
    }}
    onClose={() => setOpen(false)}
    open={open}
    trigger={children}
  >
    {notification === '' ? (
      <>
        <Modal.Header>Cette action est définitive</Modal.Header>
        <Modal.Content>
          <p>Êtes-vous sûr de vouloir supprimer votre histoire ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={() => setOpen(false)}>
            Non, surtout pas !
          </Button>
          <Button negative onClick={handleDeleteClick} loading={loading}>
            Oui, aucun regret.
          </Button>
        </Modal.Actions>
      </>
    )
      : (
        <Modal.Content>
          <Icon circular name="bell outline" />
          {notification}
        </Modal.Content>
      )}

  </Modal>
);

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notification: PropTypes.string.isRequired,
  setCreationLoader: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DeleteModal;
