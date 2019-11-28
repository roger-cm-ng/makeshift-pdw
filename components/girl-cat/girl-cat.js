import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './girl-cat.scss';
import { enableGirlCat } from './girl-cat-actions';
import { injectGirlCat } from '../upf-data/upf-data-actions';

const GirlCat = () => {
  const { girlCatReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  const btnClickHandler = (index) => {
    dispatch(enableGirlCat(index));
    dispatch(injectGirlCat(girlCatReducer[index]));
  };

  return (
    <div className={css['girl-cat']}>
      {
        girlCatReducer.map((item, index) => (
          <button
            className={css.btn}
            onClick={() => btnClickHandler(index)}
            type="button"
            key={item.girlId}
            disabled={item.enabled}
          >
            {`${item.girlId}   <|>   ${item.catId}`}
          </button>
        ))
      }
    </div>
  );
};

export default GirlCat;
