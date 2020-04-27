import { combineReducers } from 'redux';
import spinnerReducer from '../main/spinner-reducer';
import membersReducer from '../members/members-reducer';
import editorReducer from '../editor/editor-reducer';

const ReloadCombinedReducers = combineReducers({
  spinnerReducer,
  membersReducer,
  editorReducer
});

export default ReloadCombinedReducers;
