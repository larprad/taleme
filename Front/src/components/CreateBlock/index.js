/* eslint-disable react/destructuring-assignment */
// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import component
import {
  Header, Segment, Form, Button, TextArea, Input, Message, List,
} from 'semantic-ui-react';
import SearchImageModal from '../../containers/SearchImageModal';
import Choice from './Choice';

// == Import styles
import './create-block.scss';

const CreateBlock = ({
  title,
  text,
  id,
  updateBlockInfos,
  choices,
  updateChoicesInfos,
  deleteLocalChoice,
  deleteDatabaseChoice,
  addChoice,
  backAction,
  patchBlock,
  postBlock,
  loading,
  setOpen,
  status,
  fromChoiceText,
  connectedChoices,
  image,
  manageImageBlock,
}) => {
  // Building an array of choices that will need to be deleted in
  // the database if the user validate its action
  const [choicesToDelete, setChoicesToDelete] = useState([]);

  const handleFieldChange = (event) => {
    updateBlockInfos(event.target.value, event.target.name);
  };
  const handleClick = () => {
    addChoice(id);
  };

  const checkChoicesText = (blockChoices) => blockChoices.every((choice) => choice.text !== '');

  // Handking error messages if fields are not correctly filled
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmitClick = () => {
    if (!checkChoicesText(choices) || title === '') {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
      return;
    }
    // On submit a lot of things happen:
    if (status === 'edit') {
      // When editing
      // - Block is patched to backend, then
      // - New choices are created, then
      // - Updated choices are patched, then,
      // - The whole story is get from the back and put back on state
      // for data consitency
      patchBlock();
      // After patching block, deleteting selected choices from database
      choicesToDelete.forEach((choiceId) => deleteDatabaseChoice(choiceId));
    }
    else {
      // When posting
      // - Block is posted to backend, then
      // - New choices are created, then
      // - Choice from where the block have been created is updated
      // for data consitency
      postBlock();
    }
    setOpen(false); // closing popup
  };

  const handleImageBlock = (webformatURL) => {
    manageImageBlock(webformatURL);
  };

  const statusToDisplay = () => {
    if (status === 'new' && fromChoiceText) {
      return <p className="create-block-subheader">Une fois créé, ce bloc sera connecté à : <b>{fromChoiceText}</b> </p>;
    } if (status === 'new' && !fromChoiceText) {
      return <p className="create-block-subheader">Une fois créé, ce bloc ne sera connecté à aucun choix </p>;
    } if (status === 'edit' && connectedChoices.length > 0) {
      return (
        <Message>
          <Message.Header><List.Icon name="linkify" />Choix menant à ce bloc</Message.Header>
          <Message.List>{connectedChoices.map((choice) => (
            <Message.Item key={choice.id}>{choice.text}</Message.Item>
          ))}
          </Message.List>
        </Message>
      );
    }
    return (
      <Message>
        <Message.Header><List.Icon name="unlinkify" />Aucun Choix ne mène à ce bloc</Message.Header>
      </Message>
    );
  };

  return (
    <div className="create-block">
      <Header as="h1" className="create-block-title">{status === 'edit' ? 'Edition de Bloc' : 'Création de Bloc'}</Header>
      {statusToDisplay()}
      <Segment className="create-block-segment">
        <Form className="create-block-container">
          <div className="create-block-sub-container">
            <SearchImageModal className="create-block-image" image={image} handleUpdateImage={handleImageBlock} />
            <Input className="create-block-title" placeholder="Titre du block" value={title} name="title" onChange={handleFieldChange} />
            <TextArea className="create-block-textarea" placeholder="Que se passe t-il dans ce bloc" value={text || ''} name="text" onChange={handleFieldChange} />
          </div>
          <div className="create-block-sub-container create-choices">
            <div className="create-choices-sub-container">
              <Header className="create-choices-sub-container-title" as="h4">Choix du bloc</Header>
              { choices.length
                ? choices.map((choice) => (
                  <Choice
                    key={choice.id}
                    {...choice}
                    updateChoiceInfos={updateChoicesInfos}
                    choicesToDelete={choicesToDelete}
                    setChoicesToDelete={setChoicesToDelete}
                    deleteLocalChoice={deleteLocalChoice}
                  />
                ))
                : <Message style={{ marginTop: '0' }} color="violet" size="tiny">Ce bloc ne contient aucun choix, il est donc considéré comme une <b>fin de l'histoire</b>.</Message>}
              <Button className="create-choices-button" color="green" circular icon="add" onClick={handleClick} />
              {errorMessage
                ? <div className="create-choices-sub-container-warning"><p>Le texte du <b>titre</b> et <b>des choix</b> ne peut pas être vide.</p></div>
                : null }
            </div>
            <div className="button-sub-container">
              <Button basic disabled={loading} type="button" onClick={() => backAction(false)}>Annuler</Button>
              <Button
                primary
                type="button"
                disabled={loading}
                loading={loading}
                onClick={handleSubmitClick}
              >Enregistrer
              </Button>
            </div>
          </div>
        </Form>
      </Segment>
    </div>
  );
};

CreateBlock.defaultProps = {
  choices: [],
  text: '',
  id: null,
  fromChoiceText: null,
  connectedChoices: [],
  image: null,
};

CreateBlock.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  updateBlockInfos: PropTypes.func.isRequired,
  updateChoicesInfos: PropTypes.func.isRequired,
  patchBlock: PropTypes.func.isRequired,
  deleteLocalChoice: PropTypes.func.isRequired,
  deleteDatabaseChoice: PropTypes.func.isRequired,
  addChoice: PropTypes.func.isRequired,
  choices: PropTypes.array,
  backAction: PropTypes.func.isRequired,
  id: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  postBlock: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  fromChoiceText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  connectedChoices: PropTypes.array,
  image: PropTypes.string,
  manageImageBlock: PropTypes.func.isRequired,
};

export default CreateBlock;
