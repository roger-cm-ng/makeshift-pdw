import express from 'express';
import cors from 'cors';
import path from 'path';
import queryString from 'querystring';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '..', 'db', 'db.json'));
const db = low(adapter);

const Api = express.Router();

Api.use(cors());

const members = ['er', 'gt', 'ra', 'ie', 'rn', 'sb'];

const getValueFromReferer = (refererUrl, key) => {
  const queryParams = refererUrl;
  const query = queryParams.replace('?', '&');
  const params = queryString.parse(query);
  return params[key];
};

Api.get('/members', (req, res) => {
  res.status(200).json(members);
});

Api.post('/get-items', (req, res) => {
  const { member, endPointKey } = req.body;

  res.status(200).json(db.get('members').get(member).get(endPointKey).value());
});

Api.post('/set-items', (req, res) => {
  const { member, endPointKey, data } = req.body;
  const memberKey = db.get('members').get(member);
  memberKey.set(endPointKey, data).write();

  res.status(200).json(memberKey.get(endPointKey).value());
});

Api.post('/set-default', (req, res) => {
  const { member, endPointKey } = req.body;
  const memberKey = db.get('members').get(member);
  const defaultValue = db.get('default').get(endPointKey).value();
  memberKey.set(endPointKey, defaultValue).write();

  res.status(200).json(memberKey.get(endPointKey).value());
});

Api.get('/learningTime/productId/:productId/studentId/:studentId', (req, res) => {
  const member = getValueFromReferer(req.headers.referrerparams, 'nobushi') || 'rn';

  res.status(200).json(db.get('members').get(member).get('learningTime').value());
});

Api.get('/loginGoals/productId/:productId/studentId/:studentId', (req, res) => {
  const member = getValueFromReferer(req.headers.referrerparams, 'nobushi') || 'rn';

  res.status(200).json(db.get('members').get(member).get('loginGoals').value());
});

Api.get('/studentGoals/productId/:productId/studentId/:studentId/currentWeek/:currentWeek', (req, res) => {
  const member = getValueFromReferer(req.headers.referrerparams, 'nobushi') || 'rn';

  res.status(200).json(db.get('members').get(member).get('studentGoals').value());
});

export default Api;
