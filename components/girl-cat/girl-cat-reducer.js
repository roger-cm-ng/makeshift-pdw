import _ from 'lodash';
import {
  GIRL_CAT_ENABLED,
  GIRL_CAT_BTN_DISABLED
} from './girl-cat-actions';

const initialState = [
  {
    girlId: 'GiRL018220',
    catId: 10158,
    enabled: false
  },
  {
    girlId: 'GiRL018216',
    catId: 10154,
    enabled: false
  },
  {
    girlId: 'GiRL018221',
    catId: 10159,
    enabled: false
  },
  {
    girlId: 'GiRL018218',
    catId: 10156,
    enabled: false
  },
  {
    girlId: 'GiRL018222',
    catId: 10160,
    enabled: false
  },
  {
    girlId: 'GiRL018219',
    catId: 10157,
    enabled: false
  },
  {
    girlId: 'GiRL018269',
    catId: 10203,
    enabled: false
  },
  {
    girlId: 'GiRL018270',
    catId: 10204,
    enabled: false
  },
  {
    girlId: 'GiRL018271',
    catId: 10205,
    enabled: false
  },
  {
    girlId: 'GiRL018272',
    catId: 10206,
    enabled: false
  }
];

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
