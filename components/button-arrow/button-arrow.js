import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import css from './button-arrow.scss';

const ButtonArrow = ({
  callBack,
  className,
  disabled
}) => (
  <button
      className={classNames(
        css['button-arrow'],
        className
      )}
      type="button"
      onClick={callBack}
      disabled={disabled}
  >
      =&gt;
  </button>
  );

ButtonArrow.propTypes = {
  callBack: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default ButtonArrow;
