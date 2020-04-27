import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import css from './main.scss';
import Spinner from '../spinner/spinner';
import Members from '../members/members';
import Editor from '../editor/editor';

const Main = () => {
  const {
    spinnerReducer,
    membersReducer
  } = useSelector(state => state);

  const endPointDetails = [
    {
      title: 'GET /assessments',
      endPointKey: 'allAssessments'
    },
    {
      title: 'GET /classrooms',
      endPointKey: 'classrooms'
    },
    {
      title: 'GET /assessments/{id}/version/{version}',
      endPointKey: 'oneAssessment'
    },
    {
      title: 'POST /getAssignments',
      endPointKey: 'getAssignments'
    },
    {
      title: 'POST /assignAssessment',
      endPointKey: 'assignAssessment'
    }
  ];

  return (
    <div className={css.main}>
      <Spinner
        show={spinnerReducer.length > 0 || false}
      />
      <h1>Insert Assessments data</h1>
      <Members />
      {
        membersReducer.member && (
          <Fragment>
            {
              endPointDetails.map(item => (
                <Editor
                  key={item.endPointKey}
                  title={item.title}
                  endPointKey={item.endPointKey}
                />
              ))
            }
          </Fragment>
        )
      }
    </div>
  );
};

export default Main;
