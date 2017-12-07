module.exports = function (app) {
	// 屏幕
	app.get('/', function (req, res) {
		res.render('screen');
	});

	// 管理相关
	app.use('/manage', require('./manage'));

	// 展示相关
	app.use('/show', require('./show'));
};