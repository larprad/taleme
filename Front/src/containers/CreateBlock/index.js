// == Import npm
import { connect } from 'react-redux';

// == Import utils
import { getChoiceTextFromId, getBlockBackConnections } from '../../utils/storyUtils';

// == Import component
import CreateBlock from '../../components/CreateBlock';

// == Import action creator
import {
  updateBlockInfos,
  updateChoicesInfos,
  deleteChoiceInfos,
  addNewChoiceInfos,
  patchBlockInfos,
  postChoicesInfos,
  deleteChoice,
  postBlockInfos,
  saveImageBlock,
} from '../../actions/createStory';

const mapStateToProps = (state) => ({
  title: state.createStory.currentCreatedBlock.title,
  text: state.createStory.currentCreatedBlock.text,
  choices: state.createStory.currentCreatedChoices,
  id: state.createStory.currentCreatedBlock.id,
  loading: state.createStory.loading,
  fromChoiceText: getChoiceTextFromId(
    state.createStory.currentCreatedBlock.fromChoiceId,
    state.createStory.currentCreatedStory,
  ),
  connectedChoices: getBlockBackConnections(
    state.createStory.currentCreatedStory.choices,
    state.createStory.currentCreatedBlock.id,
  ),
  image: state.createStory.currentCreatedBlock.image,
});

const mapDispatchToProps = (dispatch) => ({
  updateBlockInfos: (name, value) => dispatch(updateBlockInfos(value, name)),
  updateChoicesInfos: (id, value) => dispatch(updateChoicesInfos(id, value)),
  deleteLocalChoice: (id) => dispatch(deleteChoiceInfos(id)),
  deleteDatabaseChoice: (id) => dispatch(deleteChoice(id)),
  addChoice: (blockId) => dispatch(addNewChoiceInfos(blockId)),
  patchBlock: () => dispatch(patchBlockInfos()),
  postBlock: () => dispatch(postBlockInfos()),
  postNewChoices: () => dispatch(postChoicesInfos()),
  manageImageBlock: (webformatURL) => dispatch(saveImageBlock(webformatURL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlock);
