import _ from 'lodash';
import {
  GIRL_CAT_ENABLED,
  GIRL_CAT_BTN_DISABLED
} from './girl-cat-actions';
import json from './girl-cat.json';

const initialState = json;

export default (state = initialState, action) => {
  switch (action.type) {
    case GIRL_CAT_ENABLED: {
      const cloned = _.clone(state);
      cloned.map((item) => {
        item.enabled = false;
        return item;
      });
      cloned[action.index].enabled = true;
      return cloned;
    }

    case GIRL_CAT_BTN_DISABLED: {
      const cloned = _.clone(state);
      cloned.map((item) => {
        item.enabled = false;
        if (item.girlId === action.payload.girlId && item.catId === action.payload.catId) {
          item.enabled = true;
        }
        return item;
      });
      return cloned;
    }

    default:
      return state;
  }
};
