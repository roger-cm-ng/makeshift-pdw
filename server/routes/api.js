import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import assignmentDetails from './assignment-details.json';
import activityQuestionsSorter from './activity-questions-sorter';
import activityQuestions from './activity-questions.json';

const Api = express.Router();

Api.use(cors());

const session = {};

const members = ['er', 'sm', 'gt', 'ra', 'ie', 'rn', 'va', 'js', 'ro', 'dh', 'nc'];

members.forEach((member) => {
  session[member] = {
    currentDetails: assignmentDetails,
    currentQuestion: activityQuestions[0]
  };
});

const memberRegexStr = `-${members.join('-|-')}-`;

const processQuestion = (assignmentId) => {
  const current = new RegExp(memberRegexStr).exec(assignmentId);
  let member;
  let question = activityQuestionsSorter({
    assignmentId
  });

  if (current) {
    member = current[0].replace(/-/ig, '');
    question = session[member].currentQuestion;
  }

  return question;
};

Api.post('/assignmentDetails', (req, res) => {
  const crownNum = /Crown[1-5]/.exec(req.body.assignmentId);
  const current = new RegExp(memberRegexStr).exec(req.body.assignmentId);
  let member;
  let details = _.clone(assignmentDetails);

  if (current) {
    member = current[0].replace(/-/ig, '');
    details = session[member].currentDetails;
  } else if (crownNum) {
    details.stepCount = Number(crownNum[0][5]);
  }

  res.status(200).json(details);
});

Api.post('/getQuestion', (req, res) => {
  res.status(200).json(processQuestion(req.body.assignmentId));
});

Api.post('/saveQuestionResult', (req, res) => {
  res.status(200).json(processQuestion(req.body.assignmentId));
});

Api.get('/members', (req, res) => {
  res.status(200).json(members);
});

Api.post('/setDetails', (req, res) => {
  session[req.body.member].currentDetails = req.body.data;
  res.status(200).json(session[req.body.member].currentDetails);
});

Api.post('/setQuestion', (req, res) => {
  session[req.body.member].currentQuestion = req.body.data;
  res.status(200).json(session[req.body.member].currentQuestion);
});

Api.post('/error/:code', (req, res) => {
  res.status(Number(req.params.code)).json({ err: Number(req.params.code) });
});

export default Api;
