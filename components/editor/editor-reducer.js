import _ from 'lodash';
import {
  SERVER_SET,
  LOCAL_SET,
  IS_LOCAL_VALID_SET
} from './editor-actions';

const initialState = {
  learningTime: {
    local: {},
    server: null,
    isLocalValid: true
  },
  loginGoals: {
    local: {},
    server: null,
    isLocalValid: true
  },
  studentGoalsWeekly: {
    local: {},
    server: null,
    isLocalValid: true
  },
  studentGoalsMonthly: {
    local: {},
    server: null,
    isLocalValid: true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVER_SET: {
      const cloned = _.clone(state);
      cloned[action.payload.endPointKey].server = action.payload.data;
      return cloned;
    }

    case LOCAL_SET: {
      const cloned = _.clone(state);
      cloned[action.payload.endPointKey].local = action.payload.data;
      return cloned;
    }

    case IS_LOCAL_VALID_SET: {
      const cloned = _.clone(state);
      cloned[action.payload.endPointKey].isLocalValid = action.payload.isValid;
      return cloned;
    }

    default:
      return state;
  }
};
