let express = require('express');
let router = express.Router();
let Manage = require('../module/manage');

//管理主页
router.get('/', Manage.index);

// 添加新人
router.get('/personAdd', Manage.showPerAdd);

// 添加新人
router.post('/personAdd', Manage.uploadHeaders, Manage.perAdd);

//
router.get('/info', Manage.info);

// 添加奖项
router.post('/addprize', Manage.addPrize);

// 添加部门
router.post('/adddeparment', Manage.addDepartment);

// 添加职位
router.post('/addposition',Manage.addPosition);

// 添加得奖页面
router.get('/getPerizeAdd', Manage.getPerizeAdd);

//获得当前年份的所有奖项
router.get('/getPerizeAdd/year', Manage.getYearPrize);

//获得之前获得奖项的人
router.get('/getPerizeAdd/person', Manage.PreGetPrizePersons);

//获得照片预览
router.get('/getPerizeAdd/name', Manage.prePhoto);

//批量加人
router.post('/getPerizeAdd', Manage.addPersonsPrize);

//查找
router.get('/getPerizeAdd/search', Manage.search);


module.exports = router;