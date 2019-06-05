import express from 'express';
import cors from 'cors';
import activity from './activity.json';

const Api = express.Router();

Api.use(cors());

Api.post('/request-data', (req, res) => {
  let data = {};
  if (req.body.girlId === 'GIRL123') {
    data = activity;
  }
  res.json(data);
});

export default Api;
