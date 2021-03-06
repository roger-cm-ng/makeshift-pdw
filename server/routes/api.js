import express from 'express';
import cors from 'cors';
import path from 'path';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '..', 'db', 'db.json'));
const db = low(adapter);

const Api = express.Router();

Api.use(cors());

const members = ['er', 'gt', 'ra', 'ie', 'rn', 'sb', 'ez'];

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
  const member = req.params.studentId;
  res.status(200).json(db.get('members').get(member).get('learningTime').value());
});

Api.get('/loginGoals/productId/:productId/studentId/:studentId', (req, res) => {
  const member = req.params.studentId;
  res.status(200).json(db.get('members').get(member).get('loginGoals').value());
});

Api.get('/studentGoals/:timeFrame/productId/:productId/studentId/:studentId', (req, res) => {
  const { studentId, timeFrame } = req.params;
  const { currentWeek } = req.query;
  const timeFrameTitleCase = timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1);
  console.log(timeFrameTitleCase, currentWeek);
  res.status(200).json(db.get('members').get(studentId).get(`studentGoals${timeFrameTitleCase}`).value());
});

Api.post('/studentGoals/:timeFrame/productId/:productId/studentId/:studentId', (req, res) => {
  const { studentId, timeFrame } = req.params;
  const { currentWeek } = req.query;
  const timeFrameTitleCase = timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1);
  console.log(timeFrameTitleCase, currentWeek, req.body);
  res.status(200).json(db.get('members').get(studentId).get(`studentGoals${timeFrameTitleCase}`).value());
});

export default Api;
