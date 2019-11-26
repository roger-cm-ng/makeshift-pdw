import { combineReducers } from 'redux';
import detailsReducer from '../upf-data/details-reducer';
import questionReducer from '../upf-data/question-reducer';

const ReloadCombinedReducers = combineReducers({
  detailsReducer,
  questionReducer
});

export default ReloadCombinedReducers;
