import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import assignmentDetails from './assignment-details.json';
import activityQuestionsSorter from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

let standingDetails = {};
let standingQuestion = {};

const processQuestion = (assignmentId) => {
  const current = /Current/.exec(assignmentId);
  let question = activityQuestionsSorter({
    assignmentId
  });

  if (current) {
    question = standingQuestion;
  }

  return question;
};

Api.post('/assignmentDetails', (req, res) => {
  const crownNum = /Crown[1-5]/.exec(req.body.assignmentId);
  const current = /Current/.exec(req.body.assignmentId);
  let details = _.clone(assignmentDetails);

  if (current) {
    details = standingDetails;
  } else if (crownNum) {
    details.stepCount = Number(crownNum[0][5]);
  }

  res.status(200).json(details);
});

Api.post('/getQuestion', (req, res) => {
  res.status(200).json(processQuestion(req.body.assignmentId));
});

Api.post('/saveQuestion', (req, res) => {
  res.status(200).json(processQuestion(req.body.assignmentId));
});

Api.post('/setDetails', (req, res) => {
  standingDetails = req.body.currentDetails;
  res.status(200).json(standingDetails);
});

Api.post('/setQuestion', (req, res) => {
  standingQuestion = req.body.currentQuestion;
  res.status(200).json(standingQuestion);
});

export default Api;
