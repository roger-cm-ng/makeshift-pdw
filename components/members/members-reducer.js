import _ from 'lodash';
import randomColor from 'randomcolor';
import { MEMBER_CHOSEN } from './members-actions';
import { MEMBERS_ACQUIRED } from '../upf-data/upf-data-actions';

const initialState = {
  members: [],
  member: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_ACQUIRED: {
      const cloned = _.clone(state);
      const members = [];

      action.data.forEach((member) => {
        const obj = {};
        obj.member = member;
        obj.enabled = false;
        obj.color = randomColor({
          luminosity: 'dark'
        });
        members.push(obj);
      });

      cloned.members = members;
      return cloned;
    }

    case MEMBER_CHOSEN: {
      const cloned = _.clone(state);

      cloned.members.map((item) => {
        item.enabled = false;
        return item;
      });

      cloned.members[action.index].enabled = true;

      cloned.member = cloned.members[action.index].member;

      return cloned;
    }

    default:
      return state;
  }
};
