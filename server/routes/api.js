import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import assignmentDetailsCrown from './assignment-details-crown.json';
import { activityQuestionsSorter } from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

Api.post('/assignmentDetails', (req, res) => {
  const crownNum = /Crown[1-5]/.exec(req.body.assignmentId);
  const gemNum = /Gem[1-5]/.exec(req.body.assignmentId);
  const details = _.clone(assignmentDetailsCrown);

  if (crownNum) {    
    details.stepCount = Number(crownNum[0][5]);
  } 
  if (gemNum) {
    details.stepsCompleted = Number(gemNum[0][3]);
  }
  res.status(200).json(details);
});

Api.post('/getQuestion', (req,res) => {
  res.status(200).json(activityQuestionsSorter({
    assignmentId: req.body.assignmentId
  }));
});

Api.post('/saveQuestion', (req,res) => {
  res.status(200).json(activityQuestionsSorter({
    assignmentId: req.body.assignmentId
  }));
});

export default Api;
