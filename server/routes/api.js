import express from 'express';
import cors from 'cors';
import assignmentDetails from './assignment-details.json';
import activityQuestions from './activity-questions.json';
import { activityQuestionsSorter } from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

Api.post('/assignmentDetails', (req, res) => {
  res.status(200).json(assignmentDetails);
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
