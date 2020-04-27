import { handleData } from '../../helpers/resources';
import {
  enableSpinner,
  disableSpinner
} from '../main/main-actions';

export const SERVER_SET = 'SERVER_SET';
export const LOCAL_SET = 'LOCAL_SET';
export const IS_LOCAL_VALID_SET = 'IS_LOCAL_VALID_SET';

export const setLocal = ({ endPointKey, data }) => ({
  type: LOCAL_SET,
  payload: {
    endPointKey,
    data
  }
});

export const setIsLocalValid = ({ endPointKey, isValid }) => ({
  type: IS_LOCAL_VALID_SET,
  payload: {
    isValid,
    endPointKey
  }
});

export const callServer = ({
  endPoint,
  body,
  endPointKey
}) => (dispatch) => {
  dispatch(enableSpinner(endPointKey));
  handleData({
    endPoint,
    body,
    success: (data) => {
      dispatch({
        type: SERVER_SET,
        payload: {
          endPointKey,
          data
        }
      });
      dispatch(disableSpinner(endPointKey));
    }
  });
};
