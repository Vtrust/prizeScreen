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

// 编辑奖项
router.post('/editPrize', Manage.editPrize);

// 删除奖项
router.post('/delePrize', Manage.delePrize);

// 添加得奖页面
router.get('/getPerizeAdd', Manage.getPerizeAdd);

// 获得当前年份的所有奖项
router.get('/getPerizeAdd/year', Manage.getYearPrize);

// 获得之前获得奖项的人
router.get('/getPerizeAdd/persons', Manage.PreGetPrizePersons);

// 批量加人
router.post('/getPerizeAdd', Manage.addPersonsPrize);

// 删除得奖人
router.post('/delePerPri', Manage.DelePrize);

// 新增得奖人
router.post('/addPerPri', Manage.AddPerPri);

// 获得照片预览
router.get('/getPerizeAdd/name', Manage.prePhoto);

//============================================================================
// 部门管理
// 显示添加部门
router.get('/addDepartment', Manage.showAddDepartment);

// 添加部门
router.post('/addDeparment', Manage.addDepartment);

// 编辑部门
router.post('/editDepartment', Manage.editDepartment);

// 删除部门
router.post('/deleDepartment', Manage.deleDepartment);

// 添加职位
router.post('/addJob',Manage.addJob);

// 编辑职位
router.post('/editJob', Manage.editJob);

// 删除职位
router.post('/deleJob', Manage.deleJob);

//============================================================================
// TODO:添加数据库管理
// 人员管理
// 显示添加新人
router.get('/personAdd', Manage.showPerAdd);

// 添加新人
router.post('/personAdd', Manage.uploadHeaders, Manage.perAdd);

// 删改页面
router.get('/personEidt', Manage.uploadHeaders, Manage.ShowPerEdit);

// 按名字和Id查找人员
router.get('/searchPer', Manage.SearchPer);

// 编辑人员
router.get('/eidtOnePer', Manage.EidtOnePer);

// 编辑人员
router.post('/eidtOnePer', Manage.uploadHeaders, Manage.DoEidtOnePer);

// 删除人员
router.post('/delePerson', Manage.DelePerson);

// 获得所有的部门和职位信息
router.get('/getAllDeptJob', Manage.GetAllDeptJob);

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