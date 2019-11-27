import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './girl-cat-list.scss';

const girlCatArr = [
  {
    girlId: 'GiRL018220', 
    catId: 10158
  },
  {
    girlId: 'GiRL018216', 
    catId: 10154
  },
  {
    girlId: 'GiRL018221', 
    catId: 10159
  },
  {
    girlId: 'GiRL018218', 
    catId: 10156
  },
  {
    girlId: 'GiRL018222', 
    catId: 10160
  },
  {
    girlId: 'GiRL018219', 
    catId: 10157
  },
  {
    girlId: 'GiRL018269', 
    catId: 10203
  },
  {
    girlId: 'GiRL018270', 
    catId: 10204
  },
  {
    girlId: 'GiRL018271', 
    catId: 10205
  },
  {
    girlId: 'GiRL018272', 
    catId: 10206
  }
];

const GirlCatList = ({
  callBack
}) => {

};

GirlCatList.propTypes = {
  callBack: PropTypes.func
};

export default GirlCatList;
