import axios from 'axios';

export const DETAILS_SET = 'DETAILS_SET';
export const QUESTION_SET = 'QUESTION_SET';
export const COMPONENT_ENABLED_SPINNER = 'COMPONENT_ENABLED_SPINNER';
export const COMPONENT_DISABLED_SPINNER = 'COMPONENT_DISABLED_SPINNER';
export const SET_DETAILS_ENDPOINT = 'setDetails';
export const SET_QUESTION_ENDPOINT = 'setQuestion';
export const GET_DETAILS_ENDPOINT = 'assignmentDetails';
export const GET_QUESTION_ENDPOINT = 'getQuestion';


const API_BASE_URL = 'https://rog-api-mock.herokuapp.com/api';

export const processServerData = ({
  endPoint,
  body,
  type
}) => async (dispatch) => {
  dispatch({
    type: COMPONENT_ENABLED_SPINNER,
    item: endPoint
  });
  try {
    const res = await axios({
      method: 'post',
      url: `${API_BASE_URL}/${endPoint}`,
      data: body
    });

    const { status, data } = res;

    if (status === 200 || status === 204) {
      dispatch({
        type,
        data
      });
    } else {
      throw new Error('Server error');
    }

    dispatch({
      type: COMPONENT_DISABLED_SPINNER,
      item: endPoint
    });
  } catch (error) {
    dispatch({
      type: COMPONENT_DISABLED_SPINNER,
      item: endPoint
    });
    throw new Error(error);
  }
};

export const enableSpinner = item => ({
  type: COMPONENT_ENABLED_SPINNER,
  item
});

export const disableSpinner = item => ({
  type: COMPONENT_DISABLED_SPINNER,
  item
});
