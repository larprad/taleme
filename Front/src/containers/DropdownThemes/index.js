import { connect } from 'react-redux';
import dropdownthemes from '../../components/DropdownThemes';

// import { saveThemesSelected } from '../../actions/createStory';

const mapStateToProps = (state) => ({
  themes: state.readStory.themesList,
});

// const mapDispatchToProps = (dispatch) => ({
//   handleThemesSelected: (themes) => {
//     dispatch(saveThemesSelected(themes));
//   },
// });

export default connect(mapStateToProps)(dropdownthemes);
