import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'semantic-ui-react';

import './test-story-modal.scss';

import TestStoryBlock from '../../../containers/CreateDashboard/TestStoryModal/TestStoryBlock';

const TestStoryModal = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={children}
      centered
      closeIcon
    >
      <Modal.Header style={{ textAlign: 'center', backgroundColor: '#F5F5F5' }}>Test de votre histoire</Modal.Header>
      <Modal.Content image>
        <TestStoryBlock setOpen={setOpen} />
      </Modal.Content>
    </Modal>
  );
};

TestStoryModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestStoryModal;
