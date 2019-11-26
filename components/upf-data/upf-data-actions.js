import axios from 'axios';

export const DETAILS_SET = 'DETAILS_SET';
export const QUESTION_SET = 'QUESTION_SET';
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
  } catch (error) {
    throw new Error(error);
  }
};
