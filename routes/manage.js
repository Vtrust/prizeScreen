let express = require('express');
let router = express.Router();
let Manage = require('../module/manage');

//管理主页
router.get('/', Manage.index);

//============================================================================
// 奖项管理
// 显示添加奖项
router.get('/addprize', Manage.showAddprize);

// 添加奖项
router.post('/addPrize', Manage.addPrize);

// 添加得奖页面
router.get('/getPerizeAdd', Manage.getPerizeAdd);

// 获得当前年份的所有奖项
router.get('/getPerizeAdd/year', Manage.getYearPrize);

// 获得之前获得奖项的人
router.get('/getPerizeAdd/person', Manage.PreGetPrizePersons);

// 批量加人
router.post('/getPerizeAdd', Manage.addPersonsPrize);

// 获得照片预览
router.get('/getPerizeAdd/name', Manage.prePhoto);

//============================================================================
// 部门管理
// 显示添加部门
router.get('/addDepartment', Manage.showAddDepartment);

// 添加部门
router.post('/adddeparment', Manage.addDepartment);

// 添加职位
router.post('/addposition',Manage.addPosition);

//============================================================================
// TODO:添加数据库管理
// 人员管理
// 添加新人
router.get('/personAdd', Manage.showPerAdd);

// 添加新人
router.post('/personAdd', Manage.uploadHeaders, Manage.perAdd);

// 删改页面
router.get('/personEidt', Manage.uploadHeaders, Manage.ShowPerEdit);

//============================================================================
// 屏幕管理
router.get('/screenSet', Manage.showScreenSet);

// 设置图片切换速度
router.post('/setAutoplaySpeed', Manage.setAutoplaySpeed);



//============================================================================
// 旧的接口
// 显示新增部门和奖项
router.get('/info', Manage.info);













//查找
router.get('/getPerizeAdd/search', Manage.search);


module.exports = router;