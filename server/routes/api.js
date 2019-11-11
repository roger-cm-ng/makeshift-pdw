import express from 'express';
import cors from 'cors';
import activity from './activity.json';
import assignmentDetails from './assignment-details.json';

const Api = express.Router();

Api.use(cors());

Api.get('/modules/:module/resources/:girlId', (req, res) => {
  let data = [];
  console.log(req.params.girlId);
  if (req.params.girlId === 'GIRL123') {
    data = activity;
  }
  res.json(data);
});

Api.get('/error/:code', (req, res) => {
  res.status(parseInt(req.params.code)).json({ foo: 'bar' });
});

Api.post('/assignmentDetails', (req, res) => {
  res.status(200).json(assignmentDetails);
});

export default Api;
