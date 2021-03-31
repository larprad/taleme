// == Import npm
import { connect } from 'react-redux';

// == Import component
import DashboardStats from '../../components/CreateDashboard/DashboardStats';

import {
  countEndBlocks, countLinkedChoices, countUnlinkedChoices,
} from '../../utils/storyUtils';

const mapStateToProps = (state) => ({
  nbBlocks: (state.createStory.currentCreatedStory.blocks).length,
  nbChoices: (state.createStory.currentCreatedStory.choices).length,
  nbEndBlock: countEndBlocks(state.createStory.currentCreatedStory.blocks),
  nbLinkedChoices: countLinkedChoices(state.createStory.currentCreatedStory.choices),
  nbUnlinkedChoices: countUnlinkedChoices(state.createStory.currentCreatedStory.choices),
  storyStatus: state.createStory.currentCreatedStory.storyInformations.status,
});

export default connect(mapStateToProps)(DashboardStats);
