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

const members = ['er', 'sm', 'gt', 'ra', 'ie', 'rn', 'va', 'sb'];

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

Api.get('/assessments', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('allAssessments').value());
});

Api.get('/classrooms', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('classrooms').value());
});

Api.get('/assessments/:id/versions/:version', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('oneAssessment').value());
});

Api.post('/getAssignments', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('getAssignments').value());
});

Api.post('/assignAssessment', (req, res) => {
  const member = getValueFromReferer(req.headers.referer, 'nobushi');

  res.status(200).json(db.get('members').get(member).get('assignAssessment').value());
});

export default Api;
