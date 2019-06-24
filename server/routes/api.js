import express from 'express';
import cors from 'cors';
import activity from './activity.json';

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

export default Api;
