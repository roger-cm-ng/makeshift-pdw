import express from 'express';
import cors from 'cors';
import activity from './activity.json';

const Api = express.Router();

Api.use(cors());

Api.get('/activity', (req, res) => {
  res.json(activity);
});

export default Api;
