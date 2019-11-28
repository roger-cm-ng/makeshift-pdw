import _ from 'lodash';
import {
  SERVER_DETAILS_SET,
  LOCAL_DETAILS_SET,
  IS_LOCAL_DETAILS_VALID_SET
} from './upf-data-actions';

const initialState = {
  local: {},
  server: null,
  isLocalValid: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVER_DETAILS_SET: {
      const cloned = _.clone(state);
      cloned.server = action.data;
      return cloned;
    }

    case LOCAL_DETAILS_SET: {
      const cloned = _.clone(state);
      cloned.local = action.data;
      return cloned;
    }

    case IS_LOCAL_DETAILS_VALID_SET: {
      const cloned = _.clone(state);
      cloned.isLocalValid = action.isValid;
      return cloned;
    }

    default:
      return state;
  }
};
