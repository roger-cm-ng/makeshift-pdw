import express from 'express';
import cors from 'cors';
const Api = express.Router();
Api.use(cors());

Api.get('/get-all', (req, res) => {
  res.json({
    status: 200,
    data: {
      result: { foo: 'bar' }
    }
  });
});

Api.get('/get-hw-rotate-banners', (req, res) => {
  res.json({
    status: 200,
    data: {
      result: [
        {
          desktop: 'http://lorempixel.com/1000/600/nature/1/',
          mobile: 'http://lorempixel.com/500/100/nature/5/',
          ctaImg: 'http://lorempixel.com/304/510/nature/1/',
          cta: 'http://google.com'
        },
        {
          desktop: 'http://lorempixel.com/1000/600/nature/2/',
          mobile: 'http://lorempixel.com/500/100/nature/6/',
          ctaImg: 'http://lorempixel.com/304/510/nature/2/',
          cta: 'http://yahoo.com'
        },
        {
          desktop: 'http://lorempixel.com/1000/600/nature/3/',
          mobile: 'http://lorempixel.com/500/100/nature/7/',
          ctaImg: 'http://lorempixel.com/304/510/nature/3/',
          cta: 'http://microsoft.com'
        }
      ]
    }
  });
});

export default Api;
