import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import css from './button-arrow.scss';

const ButtonArrow = ({
  callBack,
  className
}) => (
  <div
      className={classNames(
        css['button-arrow'],
        className
      )}
      onClick={callBack}
  >
      =&gt;
  </div>
  );

ButtonArrow.propTypes = {
  callBack: PropTypes.func,
  className: PropTypes.string
};

export default ButtonArrow;
