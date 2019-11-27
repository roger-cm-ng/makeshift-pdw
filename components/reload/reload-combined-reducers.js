import { combineReducers } from 'redux';
import detailsReducer from '../upf-data/details-reducer';
import questionReducer from '../upf-data/question-reducer';
import spinnerReducer from '../upf-data/spinner-reducer';

const ReloadCombinedReducers = combineReducers({
  detailsReducer,
  questionReducer,
  spinnerReducer
});

export default ReloadCombinedReducers;
