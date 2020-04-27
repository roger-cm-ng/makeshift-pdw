import { members } from '../../helpers/resources';
import {
  enableSpinner,
  disableSpinner
} from '../main/main-actions';

export const MEMBER_CHOSEN = 'MEMBER_CHOSEN';
export const MEMBERS_ACQUIRED = 'MEMBERS_ACQUIRED';

export const acquireMembers = () => (dispatch) => {
  dispatch(enableSpinner('members'));
  members({
    success: (payload) => {
      dispatch({
        type: MEMBERS_ACQUIRED,
        payload
      });
      dispatch(disableSpinner('members'));
    }
  });
};

export const chooseMember = index => ({
  type: MEMBER_CHOSEN,
  index
});
