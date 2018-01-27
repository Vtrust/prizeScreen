let express = require('express');
let router = express.Router();
let Show=require('../module/show');

//主页
router.get('/', Show.index);

//选择奖项年份
router.get('/year', Show.showYears);

//选择描述
router.get('/desc_a', Show.showDesc_a);

//选择奖项等级
router.get('/desc_b',Show.showDesc_b);

//展示获奖人
router.get('/persons', Show.showPersons);

//选择获奖的一个人
router.get('/person',Show.showPerson);

module.exports = router;