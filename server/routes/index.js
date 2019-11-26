import express from 'express';
import cors from 'cors';
import path from 'path';

const Index = express.Router();

Index.all('*', cors());
Index.get(/^(?!\/(api|vmsg)).*$/, (req, res) => {
  res.render('index');
});

Index.get('/vmsg/vmsg.wasm', (req, res) => {
    res.set('Content-Type', 'application/wasm');
    res.sendFile(path.join(__dirname, '../../public', 'vmsg.wasm'));
});

export default Index;
