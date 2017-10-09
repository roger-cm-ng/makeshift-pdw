import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {each as _each} from 'lodash'

const Api = express.Router();
const Schema = mongoose.Schema;
const mongodbUri = 'mongodb://ffx:ffx123@ds111748.mlab.com:11748/heroku_4fv3kgzm';

Api.use(cors());

mongoose.connect(mongodbUri);

const pageSchema = new Schema({
	studentPageName: String,
	teacherPageName: String,
	author: String,
	type: String,
	typeData: Object,
	grade: String,
	topic: String,
	subTopic: String,
	created: String,
	status: String,
	modules: Array
});

const Pages = mongoose.model('pages', pageSchema);

Api.get('/pages', (req, res) => {
  Pages.find()
    .then((results) => {
      res.json(results);
    })
});

Api.get('/pages/distinct/:field',(req, res)=>{
  Pages.distinct(req.params.field)
    .then(obj=>{
      res.json(obj)
    })
})

Api.post('/pages/filter',(req, res)=>{
  const search = req.body.filter.search;
  if (search){
    // Seems like the $text does not work? Old version? 
    // Anyway it times out
    // https://docs.mongodb.com/manual/reference/operator/query/text/
    //
    // Maybe the 'String' fields are not indexed.
    const textSearch = {
      $text:{
        $search:search
      }
    };
    Pages.find(textSearch)
    // Pages.find({type:{$regex: 'Activ|Pho',$options: "i" }})
      .then(obj => {
        res.json(obj)
      })
  }else{
    /* Map the posted thing 

        {
          "filter":{
            "type": "phonics",
            "grade": 3,
            "topic": "",
            "subTopic": "",
            "status": "",
            "created": {
              "startDate": null,
              "endDate": null
            },
            "search": ""
          }
        }
       into mongoFind query.
       Some fields are text regexps
       created is a date range...

    */
    const qry = req.body.filter
    const mongoFind = {};
    _each(['type','grade','topic','subTopic'],field=>{
      if (qry[field]){
        mongoFind[field] = {
          $regex: qry[field],
          $options: 'i'
        }
      }
    })
    _each(['created'],dateRange=>{
      const {startDate,endDate } = qry[dateRange]
      if(startDate && endDate){
        mongoFind[dateRange] = {
          $gte: startDate,
          $lte: endDate
        }
      }
    })
    // res.json(mongoFind)
    Pages.find(mongoFind)
      .then(obj=>{
        res.json(obj)
      })
  }

})

Api.get('/pages/:id', (req, res) => {
	Pages.findOne({ _id: req.params.id })
		.then((obj) => {
			res.json(obj);
		})
});

Api.post('/pages', (req, res) => {
	const item = {
		studentPageName: req.body.studentPageName,
		teacherPageName: req.body.teacherPageName,
		author: req.body.author,
		type: req.body.type,
		typeData: req.body.typeData,
		grade: req.body.grade,
		topic: req.body.topic,
		subTopic: req.body.subTopic,
		created: req.body.created,
		status: req.body.status,
		modules: req.body.modules
  }

	const data = new Pages(item);

  data.save((err, pages) => {
    Pages.find()
      .then((arr) => {
				let content = {};
				const page = arr.find((i) => i.created === req.body.created);
        res.json(page);
      })
			.then()
  });
});

Api.put('/pages', (req, res) => {
	const item = {
		_id: req.body._id,
		studentPageName: req.body.studentPageName,
		teacherPageName: req.body.teacherPageName,
		author: req.body.author,
		type: req.body.type,
		typeData: req.body.typeData,
		grade: req.body.grade,
		topic: req.body.topic,
		subTopic: req.body.subTopic,
		created: req.body.created,
		status: req.body.status,
		modules: req.body.modules
  }

	const data = new Pages(item);

	Pages.findByIdAndUpdate(req.body._id, data)
		.then((arr) => {
			res.json(arr);
		})
});

Api.delete('/pages/:id', (req, res) => {
	Pages.findByIdAndRemove({ _id: req.params.id })
		.then((obj) => {
			res.json(obj);
		})
});

Api.get('/activities/:id', (req, res) => {
  res.json({
        variantId: 1,
        localeCode: 'en-AU',
        levels: {
        easy: {
            types: {
                1: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                }
            }
        },
        medium: {
            types: {
                1: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                },
                2: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                }
            }
        },
        hard: {
            types: {
                1: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                },
                2: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                },
                3: {
                    questionGuids: [
                        '0739a7772dfe9ef3fc3dd2cacbd87821',
                        '101455adbdb86ddcd9c98e2bed690e8b',
                        '109b6c2c50db554f1d9cd0b06aa08597',
                        '19b85b788d59284e576508965317bc42',
                        '1de06f0f52844552ec7b310393d3b946',
                        '2b3b8d7b076f79e4e67d1970978d051c',
                        '2e8ab8db9c87fc7fe4c1f62337b5f3d7',
                        '2ead903985c9b058b42cb56c5e864c04',
                        '30c1ed5530546ba75fb2261c09da8c1b',
                        '312bcf74e432bfbda0332ab6310acdf4',
                        '3294e490a2f2b6898541eaf3be98f77e',
                        '4a34dd2593baf35133b3710124dbd525',
                        '4bab62fa16e40cf71c4342fbfd57bf77',
                        '4c5177131c360f37fba82b80496e3332',
                        '4f23c8bae66b45099e3a4ce7730111bc',
                        '5908b02155c4902be41d772c695c2ff7',
                        '5f081f62640eab4c1f1bb77b9b53061d',
                        '63f12f26397b49f70331143804a2aae2',
                        '693dafd1dafa23bb79105f404a80b8ca',
                        '6a39aa9a2a8276e2dffd8c45a78e66c5',
                        '6e59dab9ab54f1f0e6792d25270c7204',
                        '77dcf3417cac9f134e5638748f8f17e4',
                        '7bfbde265cc86f2c11a9589e8bbeb5c8',
                        '7e1c9c0b9b49cb6c204b0092e4014279',
                        '87bdc1109a356d288f464ed66b9899ae',
                        '898d24989bb06c5fa5672a0c67fd0980',
                        '91d2cd1b7ecb5976005d041231b9158e',
                        '93ae7cab458a744394fa202d48ce9c03',
                        '94938451d47a4c0faf5f55c96ac18e14',
                        '9928a2305d6f26efc487c6ee39400735',
                        '9b1e623557267243c2a6b28e598c7cbd',
                        '9b6bbeceb88865337afb6d6d635d091e',
                        '9dabaa126471b26e01b24a1894fa87ba',
                        '9e75ed4d8185bfb72341c0b3cd4d2ec3',
                        '9f8b70bd3086dc117de0e06e9fa74d07',
                        'afd3cc4d8561a0abbc8e04574f105d5d',
                        'c08df431bbd24ef646d956b1db12b3ff',
                        'c35c5b5d328dbcde23f4ae065a0655a2',
                        'c37b1f29056bf4f7d21dc1139765aec9',
                        'c4e8c1a4d9da1b5ac806c99205bbf4ae',
                        'c65a7a2b3cc20c713817e080a623628f',
                        'c71bc668b9b56590131302f5af4292a1',
                        'cb9bc3a4989b902cda71e2faaae9bf75',
                        'cd549218f62907131924bd503035718c',
                        'cd8bbc84e2f4649acd8c07f33c675415',
                        'ce97bc62cde4bfdcdac493d30f953671',
                        'cfde00c19e65e6a524b01b9b0c0748df',
                        'd3be85923d622ff89c20d728828a98ed',
                        'd44286877fcc8efd30982a814b172364',
                        'd6c0f05ba679e613d7d04adeb2afc5ef',
                        'd842cd2e03192e869751492c3a518194',
                        'dd1a426c5436f92ca6c70860055b3f1a',
                        'dd1e80a9d348c2936fe206ed96ec2df5',
                        'e47dc3458b806ba9504135fd1229eb8c',
                        'e7fe08fe8b7c0be28d77bd99eb393f73',
                        'eee13242a7c9d04ccc09713ae90304a9',
                        'f730737fed6329a8c288eb2d9be5a3ab',
                        'f89128b346d0040261bc30ff3584caa5',
                        'fcee50122ca12e136692bf6a5ff5e43b',
                        'fe0a95cf7b8c8d4c5cdb3a78828f1b6f',
                        'fec48cf59a5cbf42bdd20aeb4faa8154'
                    ]
                }
            }
        }
    }

    });
});

Api.get('/questions', (req, res) => {
    res.json({
            'en-AU': {
                question: {
                    metadata: {
                        uniqueId: '17075b70-e253-cb8a-dad4-a97d9071084a',
                        published: '2017-07-31 05:02:12 +0000',
                        publisher: 'pppubuntu',
                        locale: 'en-AU',
                        legacyId: 100100,
                        variantId: 1,
                        spineId: 'test - numbers - counting - how many?',
                        level: 1,
                        type: 1,
                        subtype: 1,
                        questionHash: '3,fish',
                        answerHash: [
                            3
                        ],
                        select: 5
                    },
                    question: [
                        {
                            meaning: 'The question',
                            template: 'How many fish?'
                        }
                    ],
                    control: [
                        {
                            meaning: 'The type of item to display',
                            value: 5
                        },
                        {
                            meaning: 'How many to display',
                            value: 3
                        }
                    ],
                    support: {
                        hint: [
                            {
                                meaning: 'A solid explanation!',
                                template: 'There are 3 fish.'
                            }
                        ],
                        instruction: [
                            {
                                meaning: 'instruction',
                                template: 'Count the items.'
                            },
                            {
                                meaning: 'Some good advice',
                                template: 'Cross them off as you go.'
                            }
                        ]
                    }
                },
                parameters: [
                    {
                        name: 'n',
                        value: 3
                    },
                    {
                        name: 'item_index',
                        value: 5
                    }
                ]
            }
        });
})

export default Api;
