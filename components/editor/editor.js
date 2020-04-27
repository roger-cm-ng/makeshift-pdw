import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import PropTypes from 'prop-types';
import ButtonArrow from '../button-arrow/button-arrow';
import css from './editor.scss';
import {
  setIsLocalValid,
  setLocal,
  callServer
} from './editor-actions';

const Editor = ({
  title,
  endPointKey
}) => {
  const { membersReducer, editorReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (membersReducer.member) {
      dispatch(callServer({
        endPoint: 'get-items',
        body: {
          member: membersReducer.member,
          endPointKey
        },
        endPointKey
      }));

      dispatch(setLocal({ endPointKey, data: {} }));
    }
  }, [membersReducer.member]);

  const handleLocalValue = (value) => {
    if (value.error) {
      dispatch(setIsLocalValid({ endPointKey, isValid: false }));
    } else {
      dispatch(setIsLocalValid({ endPointKey, isValid: true }));
      dispatch(setLocal({ endPointKey, data: JSON.parse(value.json) }));
    }
  };

  const handleDefaultValue = () => {
    dispatch(callServer({
      endPoint: 'set-default',
      body: {
        member: membersReducer.member,
        endPointKey
      },
      endPointKey
    }));

    dispatch(setLocal({ endPointKey, data: {} }));
  };

  return (
    <div className={css.editor}>
      <div className={css['sub-head']}>
        <h2>{title}</h2>
        <button
          className={css['btn-default']}
          type="button"
          onClick={handleDefaultValue}
        >
          Default data
        </button>
      </div>
      <div className={css.panel}>
        <div className={css['editor-panel']}>
          <p>Local</p>
          <JSONInput
            id={`${endPointKey}-editor`}
            placeholder={editorReducer[endPointKey].local}
            onChange={value => handleLocalValue(value)}
            locale={locale}
            height="500px"
            width="450px"
            onendPointKeyPressUpdate={false}
          />
        </div>
        <div>
          <ButtonArrow
            callBack={() => dispatch(callServer({
              endPoint: 'set-items',
              body: {
                member: membersReducer.member,
                endPointKey,
                data: editorReducer[endPointKey].local
              },
              endPointKey
            }))}
            disabled={!editorReducer[endPointKey].isLocalValid}
            arrowDirection="right"
            className={css['top-arrow-btn']}
          />
          <ButtonArrow
            callBack={() => dispatch(setLocal({ endPointKey, data: editorReducer[endPointKey].server }))}
            arrowDirection="left"
          />
        </div>
        <div className={css['editor-panel']}>
          <p>Server</p>
          <JSONInput
            id={`${endPointKey}-view`}
            placeholder={editorReducer[endPointKey].server}
            locale={locale}
            height="500px"
            width="450px"
            viewOnly
            onClick
          />
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  title: PropTypes.string,
  endPointKey: PropTypes.string
};

export default Editor;
