import express from 'express';
import cors from 'cors';

const Index = express.Router();

Index.all('*', cors());
Index.get(/^(?!\/(api)).*$/, (req, res) => {
  res.render('index');
});

export default Index;
