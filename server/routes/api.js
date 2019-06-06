import express from 'express';
import cors from 'cors';
import activity from './activity.json';

const Api = express.Router();

Api.use(cors());

Api.post('/request-data', (req, res) => {
  let data = [];
  if (req.body.girlId === 'GIRL123') {
    data = activity;
  }
  res.json(data);
});

Api.post('/activity-data', (req, res) => {
  console.log(req.body);
  res.json({ foo: 'bar' });
});

export default Api;
