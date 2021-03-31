// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Button, Modal,
} from 'semantic-ui-react';
import LoginFormContainer from '../../../containers/LoginForm';
import SubscribeFormContainer from '../../../containers/SubscribeForm';

// == Import styles
import './login-modal.scss';

function CreateBlockModal({
  open, setOpen,
}) {
  const [needSubscribe, setNeedSubscribe] = useState(false);
  return (
    <Modal
      className="login-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button circular size="tiny" compact color="grey">
          Connexion
        </Button>
      )}
    >
      {!needSubscribe
        ? <LoginFormContainer setPopup={setOpen} setNeedSubscribe={setNeedSubscribe} />
        : <SubscribeFormContainer setPopup={setOpen} setNeedSubscribe={setNeedSubscribe} />}
    </Modal>
  );
}

CreateBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateBlockModal;
