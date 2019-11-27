import React from 'react';
import PropTypes from 'prop-types';
import css from './spinner.scss';

const Spinner = ({ show }) => {
  const ticks = [];
  for (let i = 0; i < 12; i += 1) {
    ticks.push(<div className={css['spinner-tick']} key={`tick-${i}`} />);
  }
  return (
    <React.Fragment>
      {
        show && (
          <div className={css['spinner-overlay']}>
            <div className={css.spinner}>
              {ticks}
            </div>
          </div>
        )
      }
    </React.Fragment>
  );
};

Spinner.propTypes = {
  show: PropTypes.bool
};

export default Spinner;
