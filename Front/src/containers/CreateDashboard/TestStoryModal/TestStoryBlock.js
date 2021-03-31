// == Import npm
import { connect } from 'react-redux';

// == Import utils
import { getChoicesFromIds } from '../../../utils/storyUtils';

// == Import component
import TestStoryBlock from '../../../components/CreateDashboard/TestStoryModal/TestStoryBlock';
import { changeCurrentBlock } from '../../../actions/readStory';

// == Import action creator

const mapStateToProps = (state) => {
  const { prevChoiceId } = state.readStory.currentBlock;
  let prevBlock = null;
  if (prevChoiceId) {
    const prevChoice = getChoicesFromIds([prevChoiceId], state.readStory.currentStory)[0];
    prevBlock = prevChoice.idBlocks.belongToBlock;
  }
  return ({
    storyTitle: state.readStory.currentStory.storyInformations.title,
    onGoing: state.readStory.onGoing,
    prevBlockId: prevBlock,
  });
};

const mapDispatchToProps = (dispatch) => ({
  goBack: (blockId) => dispatch(changeCurrentBlock(blockId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStoryBlock);
