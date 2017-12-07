//引入程序包
var express = require('express');
var path = require('path');
var routes = require('./routes'); //路由

var app = express();
var debug = require('debug')('screenshow:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//express基本配置
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public'))); //静态文件全放在这里

// 路由
routes(app);

// 所有屏幕信息,定义为全局变量
screen = []; //存储socket
keys = []; //存储屏幕序号
screenNum = 0; //在线屏幕个数

//设置日志级别
io.set('log level', 1);

//websockt
io.on('connection', function (socket) { //新的客户端连接
    var newScreen = {
        socket: socket,
        key: null,
    }

    socket.on('message', function (key) {
        console.log(key + "号屏幕连接! 当前屏幕个数：" + (screenNum + 1) + " " + new Date());

        for (let i = 0; i < keys.length; i++) {
            if (key === keys[i]) {
                socket.emit('err', '该序号屏幕已经开启,请更改为别的序号！');
                return console.log('错误提示：', '该序号屏幕已经开启！');
            }
        }

        keys[screenNum] = key;
        screenNum++;

        //冒泡排序屏幕序列       
        for (let i = 0; i < screenNum; i++) {
            for (let j = 1; j < screenNum - i; j++) {
                if (parseInt(keys[j]) < parseInt(keys[j - 1])) {
                    let t = keys[j];
                    keys[j] = keys[j - 1];
                    keys[j - 1] = t;
                }
            }
        }

        newScreen.key = key;
        screen[key] = newScreen;
        console.log("当前在线屏幕序列：", keys);

        //数据发送函数
        screen[key]['send'] = function (arr) {
            socket.emit('system', arr);
        };

        //滚屏命令发送函数
        screen[key]['playNext'] = function () {
            socket.emit('playNext', true);
        };

        //监听出退事件
        socket.on('disconnect', function () {
            screen[newScreen.key] = ""; //删除对象
            for (let i = 0; i < keys.length; i++) {
                if (key === keys[i]) {
                    keys.splice(i, 1);
                    screenNum--;
                }

            }
            console.log(key + "号屏幕断开连接！" + new Date())
            console.log("当前在线屏幕", keys);
        });

    });

    // 客户 socket
    socket.emit('open'); //通知客户端已连接

});

server.listen(port,function(){
    console.log("Express server listening on port "+port);
});


//debug相关
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}














// 控制器
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/check', function(req, res) {
//     var result;
//     db.FindAll(function(dat) {
//         result = dat;
//         console.log(result);
//         var htmlhead = "<html><head><title>详细</title></head><body><table><tr><th>名称</th><th>类型</th><th>内容</th></tr>";
//         var htmltail = "</table></body></html>";
//         for (var i = 0; i < result.length; i++) {
//             if (result[i].type == 'text')
//                 var temp = "<tr><td>" + result[i].name + "</td><td>" + result[i].type + "</td><td>" + result[i].content + "</td></tr>";
//             else if (result[i].type == 'pic')
//                 var temp = "<tr><td>" + result[i].name + "</td><td>" + result[i].type + "</td><td><img src='/image/" + result[i].content + ".jpg'></td></tr>";
//             htmlhead += temp;
//         }
//         var html = htmlhead + htmltail;
//         res.writeHead(200, {
//             'Content-Type': 'text/html;charset=utf-8'
//         });
//         res.write(html);
//         res.end();

//     });


// });


// app.get('/back', function (req, res) {

//     var result;
//     db.FindYear(function (dat) {
//         result = dat;
//         console.log(result);
//         res.render('year', {
//             year: result
//         });
//     });

//     for (var i = 0; i < keys.length; i++) {
//         if (screen[keys[i]]) //离开名单页面时屏幕清空
//             screen[keys[i]].send("");
//     }
// });