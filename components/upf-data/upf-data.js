import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import _ from 'lodash';
import css from './upf-data.scss';
import {
  processServerData,
  setLocalDetails,
  setIsLocalDetailsValid,
  setLocalQuestion,
  setIsLocalQuestionValid,
  SERVER_DETAILS_SET,
  GET_DETAILS_ENDPOINT,
  SET_DETAILS_ENDPOINT,
  SERVER_QUESTION_SET,
  GET_QUESTION_ENDPOINT,
  SET_QUESTION_ENDPOINT
} from './upf-data-actions';
import ButtonArrow from '../button-arrow/button-arrow';
import Spinner from '../spinner/spinner';
import GirlCat from '../girl-cat/girl-cat';
import { disableGirlCatBtn } from '../girl-cat/girl-cat-actions';

const UpfData = () => {
  const { detailsReducer, questionReducer, spinnerReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(processServerData({
      endPoint: GET_DETAILS_ENDPOINT,
      type: SERVER_DETAILS_SET,
      body: { assignmentId: 'Current' }
    }));

    dispatch(processServerData({
      endPoint: GET_QUESTION_ENDPOINT,
      type: SERVER_QUESTION_SET,
      body: { assignmentId: 'Current' }
    }));
  }, []);

  const handleLocalDetailsValue = (value) => {
    if (value.error) {
      dispatch(setIsLocalDetailsValid(false));
    } else {
      dispatch(setIsLocalDetailsValid(true));
      dispatch(setLocalDetails(JSON.parse(value.json)));
    }
  };

  const handleLocalQuestionValue = (value) => {
    if (value.error) {
      dispatch(setIsLocalQuestionValid(false));
    } else {
      dispatch(setIsLocalQuestionValid(true));
      dispatch(setLocalQuestion(JSON.parse(value.json)));
    }
  };

  const handleServerToLocal = () => {
    dispatch(setLocalQuestion(questionReducer.server));
    dispatch(disableGirlCatBtn(
      _.get(questionReducer.server, 'nextQuestion.id'),
      _.get(questionReducer.server, 'nextQuestion.pageId')
    ));
  };

  return (
    <div className={css['upf-data']}>
      <Spinner
        show={spinnerReducer.length > 0 || false}
      />
      <h1>Insert UPF data</h1>
      <h2>Landing data</h2>
      <div className={css.details}>
        <div className={css['editor-panel']}>
          <p>Local</p>
          <JSONInput
            id="details-edit"
            placeholder={detailsReducer.local}
            onChange={value => handleLocalDetailsValue(value)}
            locale={locale}
            height="500px"
            width="450px"
            onKeyPressUpdate={false}
          />
        </div>
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_DETAILS_ENDPOINT,
            type: SERVER_DETAILS_SET,
            body: detailsReducer.local
          }))}
          disabled={!detailsReducer.isLocalValid}
        />
        <div className={css['editor-panel']}>
          <div
            className={css['invisible-btn']}
            onClick={() => dispatch(setLocalDetails(detailsReducer.server))}
          />
          <p>Server</p>
          <JSONInput
            id="details-view"
            placeholder={detailsReducer.server}
            locale={locale}
            height="500px"
            width="450px"
            viewOnly
          />
        </div>
      </div>

      <h2>Question data</h2>
      <p>Available GiRL|CAT IDs on QA env</p>
      <GirlCat />
      <div className={css.question}>
        <div className={css['editor-panel']}>
          <p>Local</p>
          <JSONInput
            id="question-edit"
            placeholder={questionReducer.local}
            onChange={value => handleLocalQuestionValue(value)}
            locale={locale}
            height="500px"
            width="450px"
            onKeyPressUpdate={false}
          />
        </div>
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_QUESTION_ENDPOINT,
            type: SERVER_QUESTION_SET,
            body: questionReducer.local
          }))}
          disabled={!questionReducer.isLocalValid}
        />
        <div className={css['editor-panel']}>
          <div
            className={css['invisible-btn']}
            onClick={handleServerToLocal}
          />
          <p>Server</p>
          <JSONInput
            id="question-view"
            placeholder={questionReducer.server}
            locale={locale}
            height="500px"
            width="450px"
            viewOnly
          />
        </div>
      </div>
    </div>
  );
};

export default UpfData;
