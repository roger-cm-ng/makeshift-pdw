import _ from 'lodash';
import {
  SERVER_QUESTION_SET,
  LOCAL_QUESTION_SET,
  IS_LOCAL_QUESTION_VALID_SET,
  GIRL_CAT_INJECTED
} from './upf-data-actions';

const initialState = {
  local: {},
  server: null,
  isLocalValid: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVER_QUESTION_SET: {
      const cloned = _.clone(state);
      cloned.server = action.data;
      return cloned;
    }

    case LOCAL_QUESTION_SET: {
      const cloned = _.clone(state);
      cloned.local = action.data;
      return cloned;
    }

    case IS_LOCAL_QUESTION_VALID_SET: {
      const cloned = _.clone(state);
      cloned.isLocalValid = action.isValid;
      return cloned;
    }

    case GIRL_CAT_INJECTED: {
      const cloned = _.clone(state);
      const local = _.clone(state.local);
      let nextQuestion;
      if (_.has(local, 'nextQuestion.id') && _.has(local, 'nextQuestion.pageId')) {
        nextQuestion = _.clone(state.local.nextQuestion);
        nextQuestion.id = action.girlCat.girlId;
        nextQuestion.pageId = action.girlCat.catId;
        local.nextQuestion = nextQuestion;
        cloned.local = local;
      }
      return cloned;
    }

    default:
      return state;
  }
};
