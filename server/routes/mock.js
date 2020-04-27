import express from 'express';
import cors from 'cors';
import queryString from 'querystring';
import path from 'path';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '..', 'db', 'db.json'));
const db = low(adapter);

const Mock = express.Router();

Mock.use(cors());

export const getValueFromReferer = (refererUrl, key) => {
  const queryParams = refererUrl;
  const query = queryParams.replace('?', '&');
  const params = queryString.parse(query);
  return params[key];
};

Mock.get('/assessments', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('allAssessments').value());
});

Mock.get('/classrooms', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('classrooms').value());
});

Mock.get('/assessments/:id/versions/:version', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('oneAssessment').value());
});

Mock.post('/getAssignments', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('getAssignments').value());
});

Mock.post('/assignAssessment', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('assignAssessment').value());
});

export default Mock;
