import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import css from './upf-data.scss';
import {
  processServerData,
  DETAILS_SET,
  GET_DETAILS_ENDPOINT,
  SET_DETAILS_ENDPOINT,
  QUESTION_SET,
  GET_QUESTION_ENDPOINT,
  SET_QUESTION_ENDPOINT
} from './upf-data-actions';
import ButtonArrow from '../button-arrow/button-arrow';

const UpfData = () => {
  const { detailsReducer, questionReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const [localDetails, setLocalDetails] = useState({});
  const [localQuestion, setLocalQuestion] = useState({});

  useEffect(() => {
    dispatch(processServerData({
      endPoint: GET_DETAILS_ENDPOINT,
      type: DETAILS_SET,
      body: { assignmentId: 'Current' }
    }));

    dispatch(processServerData({
      endPoint: GET_QUESTION_ENDPOINT,
      type: QUESTION_SET,
      body: { assignmentId: 'Current' }
    }));
  }, []);

  return (
    <div className={css['upf-data']}>
      <h1>Insert UPF data</h1>
      <h3>Landing data</h3>
      <div className={css.details}>
        <JSONInput
          id="details-edit"
          placeholder={localDetails}
          onChange={value => setLocalDetails(JSON.parse(value.json))}
          locale={locale}
          height="400px"
          width="300px"
          onKeyPressUpdate={false}
        />
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_DETAILS_ENDPOINT,
            type: DETAILS_SET,
            body: localDetails
          }))}
        />
        <JSONInput
          id="details-view"
          placeholder={detailsReducer}
          locale={locale}
          height="400px"
          width="300px"
          viewOnly
        />
      </div>

      <h3>Question data</h3>
      <div className={css.question}>
        <JSONInput
          id="question-edit"
          placeholder={localQuestion}
          onChange={value => setLocalQuestion(JSON.parse(value.json))}
          locale={locale}
          height="400px"
          width="300px"
          onKeyPressUpdate={false}
        />
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_QUESTION_ENDPOINT,
            type: QUESTION_SET,
            body: localQuestion
          }))}
        />
        <JSONInput
          id="question-view"
          placeholder={questionReducer}
          locale={locale}
          height="400px"
          width="300px"
          viewOnly
        />
      </div>
    </div>
  );
};

export default UpfData;
