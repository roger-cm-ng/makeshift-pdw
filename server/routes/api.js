import express from 'express';
import cors from 'cors';
import assignmentDetailsCrown1 from './assignment-details-crown1.json';
import assignmentDetailsCrown2 from './assignment-details-crown2.json';
import assignmentDetailsCrown3 from './assignment-details-crown3.json';
import assignmentDetailsCrown4 from './assignment-details-crown4.json';
import assignmentDetailsCrown5 from './assignment-details-crown5.json';
import { activityQuestionsSorter } from './activity-questions-sorter';

const Api = express.Router();

Api.use(cors());

const assignmentDetailsCrowns = {
  assignmentDetailsCrown1, 
  assignmentDetailsCrown2, 
  assignmentDetailsCrown3, 
  assignmentDetailsCrown4, 
  assignmentDetailsCrown5
}

Api.post('/assignmentDetails', (req, res) => {
  const crownNum = /Crown[1-5]/.exec(req.body.assignmentId);

  if (crownNum) {
    res.status(200).json(assignmentDetailsCrowns[`assignmentDetails${crownNum[0]}`]);
  } else {
    res.status(200).json(assignmentDetailsCrown5);
  }  
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
