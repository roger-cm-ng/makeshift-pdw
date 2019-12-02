import _ from 'lodash';
import {
  GIRL_CAT_ENABLED,
  GIRL_CAT_BTN_DISABLED,
  ENV_CHOSEN
} from './girl-cat-actions';
import jsonQa from './girl-cat-qa.json';
import jsonLive from './girl-cat-live.json';

const initialState = jsonQa;

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

    case ENV_CHOSEN: {
      let data;
      if (action.env === 'Live') {
        data = jsonLive;
      } else {
        data = jsonQa;
      }
      return data;
    }

    default:
      return state;
  }
};
