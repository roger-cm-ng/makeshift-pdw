import _ from 'lodash';
import {
  SERVER_SET,
  LOCAL_SET,
  IS_LOCAL_VALID_SET
} from './editor-actions';

const initialState = {
  allAssessments: {
    local: {},
    server: null,
    isLocalValid: true
  },
  classrooms: {
    local: {},
    server: null,
    isLocalValid: true
  },
  oneAssessment: {
    local: {},
    server: null,
    isLocalValid: true
  },
  getAssignments: {
    local: {},
    server: null,
    isLocalValid: true
  },
  assignAssessment: {
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
