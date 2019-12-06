import axios from 'axios';

export const SET_DETAILS_ENDPOINT = 'setDetails';
export const GET_DETAILS_ENDPOINT = 'assignmentDetails';
export const SERVER_DETAILS_SET = 'SERVER_DETAILS_SET';
export const LOCAL_DETAILS_SET = 'LOCAL_DETAILS_SET';
export const IS_LOCAL_DETAILS_VALID_SET = 'IS_LOCAL_DETAILS_VALID_SET';

export const SET_QUESTION_ENDPOINT = 'setQuestion';
export const GET_QUESTION_ENDPOINT = 'getQuestion';
export const SERVER_QUESTION_SET = 'SERVER_QUESTION_SET';
export const LOCAL_QUESTION_SET = 'LOCAL_QUESTION_SET';
export const IS_LOCAL_QUESTION_VALID_SET = 'IS_LOCAL_QUESTION_VALID_SET';

export const MEMBERS_ENDPOINT = 'members';
export const MEMBERS_ACQUIRED = 'MEMBERS_ACQUIRED';

export const COMPONENT_ENABLED_SPINNER = 'COMPONENT_ENABLED_SPINNER';
export const COMPONENT_DISABLED_SPINNER = 'COMPONENT_DISABLED_SPINNER';
export const GIRL_CAT_INJECTED = 'GIRL_CAT_INJECTED';

const API_BASE_URL = 'https://rog-api-mock.herokuapp.com/api';
// const API_BASE_URL = 'http://localhost:2000/api';

export const processServerData = ({
  endPoint,
  body,
  type,
  method = 'post'
}) => async (dispatch) => {
  dispatch({
    type: COMPONENT_ENABLED_SPINNER,
    item: endPoint
  });
  try {
    const res = await axios({
      method,
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

export const setLocalDetails = data => ({
  type: LOCAL_DETAILS_SET,
  data
});

export const setIsLocalDetailsValid = isValid => ({
  type: IS_LOCAL_DETAILS_VALID_SET,
  isValid
});

export const setLocalQuestion = data => ({
  type: LOCAL_QUESTION_SET,
  data
});

export const setIsLocalQuestionValid = isValid => ({
  type: IS_LOCAL_QUESTION_VALID_SET,
  isValid
});

export const injectGirlCat = girlCat => ({
  type: GIRL_CAT_INJECTED,
  girlCat
});
