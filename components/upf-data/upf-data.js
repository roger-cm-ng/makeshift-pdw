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
import Spinner from '../spinner/spinner';

const UpfData = () => {
  const { detailsReducer, questionReducer, spinnerReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const [localDetails, setLocalDetails] = useState({});
  const [localQuestion, setLocalQuestion] = useState({});
  const [isLocalDetailsValid, setIsLocalDetailsValid] = useState(true);
  const [isLocalQuestionValid, setIsLocalQuestionValid] = useState(true);

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

  const handleLocalDetailsValue = (value) => {
    if (value.error) {
      setIsLocalDetailsValid(false);
    } else {
      setIsLocalDetailsValid(true);
      setLocalDetails(JSON.parse(value.json));
    }
  };

  const handleLocalQuestionValue = (value) => {
    if (value.error) {
      setIsLocalQuestionValid(false);
    } else {
      setIsLocalQuestionValid(true);
      setLocalQuestion(JSON.parse(value.json));
    }
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
            placeholder={localDetails}
            onChange={value => handleLocalDetailsValue(value)}
            locale={locale}
            height="400px"
            width="300px"
            onKeyPressUpdate={false}
          />
        </div>
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_DETAILS_ENDPOINT,
            type: DETAILS_SET,
            body: localDetails
          }))}
          disabled={!isLocalDetailsValid}
        />
        <div className={css['editor-panel']}>
          <div
            className={css['invisible-btn']}
            onClick={() => setLocalDetails(detailsReducer)}
          />
          <p>Server</p>
          <JSONInput
            id="details-view"
            placeholder={detailsReducer}
            locale={locale}
            height="400px"
            width="300px"
            viewOnly
          />
        </div>
      </div>

      <h2>Question data</h2>
      <p>Available GiRL|CAT IDs on QA env - GiRL018220 | 10158, GiRL018216 | 10154, GiRL018221 | 10159, GiRL018218 | 10156, GiRL018222 | 10160, GiRL018219 | 10157, GiRL018269 | 10203, GiRL018270 | 10204, GiRL018271 | 10205, GiRL018272 | 10206</p>
      <div className={css.question}>
        <div className={css['editor-panel']}>
          <p>Local</p>
          <JSONInput
            id="question-edit"
            placeholder={localQuestion}
            onChange={value => handleLocalQuestionValue(value)}
            locale={locale}
            height="400px"
            width="300px"
            onKeyPressUpdate={false}
          />
        </div>
        <ButtonArrow
          callBack={() => dispatch(processServerData({
            endPoint: SET_QUESTION_ENDPOINT,
            type: QUESTION_SET,
            body: localQuestion
          }))}
          disabled={!isLocalQuestionValid}
        />
        <div className={css['editor-panel']}>
          <div
            className={css['invisible-btn']}
            onClick={() => setLocalQuestion(questionReducer)}
          />
          <p>Server</p>
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
    </div>
  );
};

export default UpfData;
