/**
 * Created by 14798 on 2017/9/19.
 */
module.exports = function (app) {
	// 屏幕
	app.get('/', function(req, res) {
    	 res.render('screen');
    	 //res.render('index');
	});
/*	app.get('/index',function(req,res){
		res.render('index');
	});*/
    // 奖项相关
    app.use('/add', require('./add'));

    // 管理相关
    app.use('/manage', require('./manage'));
};