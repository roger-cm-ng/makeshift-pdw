import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './members.scss';
import { chooseMember, acquireMembers } from './members-actions';

const Members = () => {
  const { membersReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acquireMembers());
  }, []);

  return (
    <div className={css.members}>
      Who are you?&nbsp;
      {
        membersReducer.members.map((item, index) => (
          <button
            className={css.btn}
            style={{
              backgroundColor: item.color
            }}
            onClick={() => dispatch(chooseMember(index))}
            type="button"
            key={item.member}
            disabled={item.enabled}
          >
            {item.member}
          </button>
        ))
      }
    </div>
  );
};

export default Members;
