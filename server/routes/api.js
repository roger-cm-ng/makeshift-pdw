import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import assignmentDetails from './assignment-details.json';
import activityQuestionsSorter from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

let standingDetails = {
  courseId: 1,
  courseVersionId: 1,
  standardId: 1,
  learningJourneyId: 2,
  description: 'Learning journey',
  standardDescription: 'Standard',
  strandCode: 'NA',
  stepCount: 1,
  subStrandCode: 'FRA',
  stepsCompleted: 2,
  user: {
    firstName: 'John',
    lastName: 'Dough'
  }
};
let standingQuestion = {
  streakAchieved: false,
  streak: [],
  totalPoints: 0,
  needAttention: false,
  stepsCompleted: 0,
  nextQuestion: {
    id: 'GiRL018220',
    pageId: 10158,
    layoutVersion: 1,
    contentVersion: 1,
    locale: 'en-AU'
  }
};

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
  standingDetails = req.body;
  res.status(200).json(standingDetails);
});

Api.post('/setQuestion', (req, res) => {
  standingQuestion = req.body;
  res.status(200).json(standingQuestion);
});

export default Api;
