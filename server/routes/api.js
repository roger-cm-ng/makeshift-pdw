import express from 'express';
import cors from 'cors';
import assignmentDetails from './assignment-details.json';
import activityQuestions from './activity-questions.json';
import { activityQuestionsSorter } from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

Api.post('/assignmentDetails', (req, res) => {
  if (req.body.assignmentId === 'abc123') {
    res.status(200).json(assignmentDetails);
  } else {
    res.status(404).json({
      error: 'no assignment found'
    });
  }  
});

Api.post('/getQuestion', (req,res) => {
  if (req.body.assignmentId === 'abc123' && req.body.locale === 'en-AU') {
    res.status(200).json(activityQuestions.nonDistractor[0]);
  } else {
    res.status(404).json({
      error: 'no assignment found'
    });
  } 
});

Api.post('/saveQuestion', (req,res) => {
  if (req.body.assignmentId === 'abc123' && req.body.locale === 'en-AU') {
    res.status(200).json(activityQuestionsSorter({
      isCorrect: req.body.isCorrect
    }));
  } else {
    res.status(404).json({
      error: 'no assignment found'
    });
  } 
});

export default Api;
