/* global window */

const baseUrl = '#BASE_URL#/api';

const ajax = ({
  endPoint,
  body,
  success,
  fail,
  method
}) => {
  let statusCode;
  window.fetch(`${baseUrl}/${endPoint}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
     }
  })
  .then((res) => {
    const { status } = res;
    statusCode = status;
    return res.json();
  })
  .then((payload) => {
    if (statusCode === 200) {
      success(payload);
    } else {
      fail(payload);
    }
  })
  .catch((err) => { throw new Error(err); });
};

export const members = ({ success }) => {
  ajax({
    endPoint: 'members',
    method: 'GET',
    success
  });
};

export const handleData = ({ endPoint, body, success }) => {
  ajax({
    endPoint,
    method: 'POST',
    body,
    success
  });
};
