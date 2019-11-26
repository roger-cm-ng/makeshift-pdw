import {
  QUESTION_SET
} from './upf-data-actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_SET: {
      return action.data;
    }

    default:
      return state;
  }
};
