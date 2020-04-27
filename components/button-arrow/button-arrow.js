import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import css from './button-arrow.scss';

const ButtonArrow = ({
  callBack,
  className,
  disabled,
  arrowDirection = 'right'
}) => (
  <button
      className={classNames(
        css['button-arrow'],
        className || ''
      )}
      type="button"
      onClick={callBack}
      disabled={disabled}
  >
    {arrowDirection === 'right' ? '→' : '←'}
  </button>
  );

ButtonArrow.propTypes = {
  callBack: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  arrowDirection: PropTypes.string
};

export default ButtonArrow;
