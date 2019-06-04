import express from 'express';
import cors from 'cors';
import activity from './activity.json';

const Api = express.Router();

Api.use(cors());

Api.get('/activity/:id', (req, res) => {
  let data = {};
  if (req.params.id === 'GIRL123') {
    data = activity;
  }
  res.json(data);
});

export default Api;
