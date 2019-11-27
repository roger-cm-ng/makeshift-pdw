import _ from 'lodash';
import {
  COMPONENT_ENABLED_SPINNER,
  COMPONENT_DISABLED_SPINNER
} from './upf-data-actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_ENABLED_SPINNER: {
      const cloned = _.clone(state);
      if (!cloned.find(i => i === action.item)) {
        cloned.push(action.item);
      }
      return cloned;
    }

    case COMPONENT_DISABLED_SPINNER: {
      const cloned = _.clone(state);
      const index = _.findIndex(cloned, i => i === action.item);
      cloned.splice(index, 1);
      return cloned;
    }

    default:
      return state;
  }
};
