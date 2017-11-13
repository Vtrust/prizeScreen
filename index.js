//引入程序包
var express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    db = require('./dbhelper/db');
var flash = require('connect-flash');
var routes = require('./routes'); //路由

var init = {
    id:'111',
    name:'张xx',
    gender:'男',
    department: '未设',
    pic:'rblue.jpg' ,
}

//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

// 所有屏幕信息
var screenArr = {};

//设置日志级别
io.set('log level', 1);

io.on('connection', function(socket) {

    // 对message事件的监听
    socket.on('message', function(key) {

        screenArr[key] = {
            id: '111',
            name: '张xx',
            gender: '男',
            department: '未设',
            pic:"<img src='/image/rblue.jpg' width='1000px' height='750px'>",
            picname:'rblue.jpg',
            screenNum: key
        };
        /*
                screenArr[key]['send'] = function () {
                    var key = this.screenNum;
                    screenArr[key]['text'] = '222';
                    socket.emit('system', socreenArr[key]);
                };//需要改写的部分
        */
        /*        screenArr[key]['send'] = function(type,data){
                    var key = this.screenNum;
                    if(type=='pic')
                    {
                        screenArr[key]['text'] = "<img src = '/image/"+data+".jpg'/>";
                        screenArr[key]['type'] = "图片";
                    }
                    if(type=='text')
                    {
                        screenArr[key]['text'] = "<h1>"+data+"</h1>";
                        screenArr[key]['type'] = "文字";
                    }
                    console.log(screenArr[key]['text']);
                    socket.emit('system',screenArr[key]);
                }
        */
        screenArr[key]['send'] = function(arr) {
            var key = this.screenNum;
            screenArr[key]['id'] = arr.id;
            screenArr[key]['name'] = arr.name;
            screenArr[key]['gender'] = arr.gender;
            screenArr[key]['department'] = arr.department;
            screenArr[key]['pic'] = "<img width='1000px' height='750px' src='/image/headers/"+arr.pic+"'/>";
            screenArr[key]['picname'] = "arr.pic";
            socket.emit('system', screenArr[key]);
        };

        socket.emit('system', screenArr[key]);

        //监听出退事件
        socket.on('disconnect', function() {

            console.log('Disconnect');
        });

    });

    // 客户 socket
    socket.emit('open'); //通知客户端已连接

});

//express基本配置
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public'))); //静态文件全放在这里
//设置表单上传

// 路由
routes(app);



app.get('/new',function(req,res){
    res.render('new',{
        success:0
    });
});

app.post('/new',function(req,res){
    var body = req.fields;
    var img  = req.files.img.path.split(path.sep).pop();
    try{
        if(!req.files.img.name){
            throw new Error("选择封面文件");
        }
    }catch(e){
        fs.unlink(req.files.img.path);
        res.render('new',{
            success:2
        });
    };
    res.render('new',{
        success:1
    });
    var arr = new Array();
    arr[0] = body.id;
    arr[1] = body.name;
    arr[2] = body.gender;
    arr[3] = body.department;
    arr[4] = img;
    db.InsertPerson(arr);
})

app.get('/newp',function(req,res){

    res.render('newp',{
        success:0
    });

});
app.post('/newp',function(req,res){

    var body = req.fields;
    console.log(body);
    var arr =  new Array();
    console.log(arr);
    arr[0]=body.year;
    arr[1]=body.item;
    arr[2]=body.detail;
    db.InsertPrize(arr);
    res.render('newp',{
        success:1
    });

});

app.get('/manage', function(req, res) {
    res.render('manage');
});

// 控制器
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.get('/check', function(req, res) {
    var result;
    db.FindAll(function(dat) {
        result = dat;
        console.log(result);
        var htmlhead = "<html><head><title>详细</title></head><body><table><tr><th>名称</th><th>类型</th><th>内容</th></tr>";
        var htmltail = "</table></body></html>";
        for (var i = 0; i < result.length; i++) {
            if (result[i].type == 'text')
                var temp = "<tr><td>" + result[i].name + "</td><td>" + result[i].type + "</td><td>" + result[i].content + "</td></tr>";
            else if (result[i].type == 'pic')
                var temp = "<tr><td>" + result[i].name + "</td><td>" + result[i].type + "</td><td><img src='/image/" + result[i].content + ".jpg'></td></tr>";
            htmlhead += temp;
        }
        var html = htmlhead + htmltail;
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.write(html);
        res.end();

    });


});

app.get('/year', function(req, res) {
    var result;
    db.FindYear(function(dat) {
        result = dat;
        console.log(result);
        res.render('year', {
            year: result
        });
    });
});
app.get('/item', function(req, res) {
    var year = req.query.year;
    var result;
    db.FindItem(year, function(dat) {
        result = dat;
        console.log(result);
        res.render('item', {
            item: result,
            year: year
        });
    });
});
app.get('/prize', function(req, res) {
    var year = req.query.year;
    var item = req.query.item;
    db.FindPrize(year, item, function(dat) {
        result = dat;
        console.log(result);
        res.render('prize', {
            year: year,
            item: item,
            prize: result
        });
    });
});
function LessTen(num,arr){
    if(num==1){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==5){
                    screenArr[i].send(arr[0]);
                }
                else
                    screenArr[i].send(init);
                console.log('对比'+arr[0]+'a'+init);
            }
            else
                console.log('第' + i + '屏未启动');

        }

    }
    else if(num==2){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==5){
                    screenArr[i].send(arr[0]);
                }
                else if(i==6){
                    screenArr[i].send(arr[1]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }

    }
    else if(num==3){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==5){
                    screenArr[i].send(arr[0]);
                }
                else if(i==6){
                    screenArr[i].send(arr[1]);
                }
                else if(i==7){
                    screenArr[i].send(arr[2]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }

    }
    else if(num==4){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==4){
                    screenArr[i].send(arr[0]);
                }
                else if(i==5){
                    screenArr[i].send(arr[1]);
                }
                else if(i==6){
                    screenArr[i].send(arr[2]);
                }
                else if(i==7){
                    screenArr[i].send(arr[3]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }
  
    }
    else if(num==5){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==4){
                    screenArr[i].send(arr[0]);
                }
                else if(i==5){
                    screenArr[i].send(arr[1]);
                }
                else if(i==6){
                    screenArr[i].send(arr[2]);
                }
                else if(i==7){
                    screenArr[i].send(arr[3]);
                }
                else if(i==8){
                    screenArr[i].send(arr[4]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        } 
    }
    else if(num==6){
                for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==3){
                    screenArr[i].send(arr[0]);
                }
                else if(i==4){
                    screenArr[i].send(arr[1]);
                }
                else if(i==5){
                    screenArr[i].send(arr[2]);
                }
                else if(i==6){
                    screenArr[i].send(arr[3]);
                }
                else if(i==7){
                    screenArr[i].send(arr[4]);
                }
                else if(i=8){
                    screenArr[i].send(arr[5]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }

    }
    else if(num==7){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==3){
                    screenArr[i].send(arr[0]);
                }
                else if(i==4){
                    screenArr[i].send(arr[1]);
                }
                else if(i==5){
                    screenArr[i].send(arr[2]);
                }
                else if(i==6){
                    screenArr[i].send(arr[3]);
                }
                else if(i==7){
                    screenArr[i].send(arr[4]);
                }
                else if(i=8){
                    screenArr[i].send(arr[5]);
                }
                else if(i==9){
                    screenArr[i].send(arr[6]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }
    }
    else if(num==8){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==2){
                    screenArr[i].send(arr[0]);
                }
                else if(i==3){
                    screenArr[i].send(arr[1]);
                }
                else if(i==4){
                    screenArr[i].send(arr[2]);
                }
                else if(i==5){
                    screenArr[i].send(arr[3]);
                }
                else if(i==6){
                    screenArr[i].send(arr[4]);
                }
                else if(i==7){
                    screenArr[i].send(arr[5]);
                }
                else if(i==8){
                    screenArr[i].send(arr[6]);
                }
                else if(i==9){
                    screenArr[i].send(arr[7]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }

    }
    else if(num==9){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==1){
                    screenArr[i].send(arr[0]);
                }
                else if(i==2){
                    screenArr[i].send(arr[1]);
                }
                else if(i==3){
                    screenArr[i].send(arr[2]);
                }
                else if(i==4){
                    screenArr[i].send(arr[3]);
                }
                else if(i==5){
                    screenArr[i].send(arr[4]);
                }
                else if(i==6){
                    screenArr[i].send(arr[5]);
                }
                else if(i==7){
                    screenArr[i].send(arr[6]);
                }
                else if(i==8){
                    screenArr[i].send(arr[7]);
                }
                else if(i==9){
                    screenArr[i].send(arr[8]);
                }
                else
                    screenArr[i].send(init);
            }
            else
                console.log('第' + i + '屏未启动');
        }
    }
    else if(num==10){
        for(var i=1;i<11;i++){
            if(screenArr[i]){
                console.log(i);
                if(i==1){
                    screenArr[i].send(arr[0]);
                }
                else if(i==2){
                    screenArr[i].send(arr[1]);
                }
                else if(i==3){
                    screenArr[i].send(arr[2]);
                }
                else if(i==4){
                    screenArr[i].send(arr[3]);
                }
                else if(i==5){
                    screenArr[i].send(arr[4]);
                }
                else if(i==6){
                    screenArr[i].send(arr[5]);
                }
                else if(i==7){
                    screenArr[i].send(arr[6]);
                }
                else if(i==8){
                    screenArr[i].send(arr[7]);
                }
                else if(i==9){
                    screenArr[i].send(arr[8]);
                }
                else if(i==10){
                    screenArr[i].send(arr[9]);
                }
            }
            else
                console.log('第' + i + '屏未启动');
        }
    }
/*    var beginTime = new Date().getTime();
    while (new Date().getTime() < beginTime + 5000) {
                            //停止5秒
    };*/
}
app.get('/person', function(req, res) {
    var year = req.query.year;
    var item = req.query.item;
    var detail = req.query.prize;
    var time; //需要轮转的次数
    var residual; //除10以后剩余的次数
    db.FindPerson(year, item, detail, function(dat) {
        result = dat;
        console.log(result);
        res.render('person', {
            person: result
        });

        db.CountNum(year, item, detail, function(data) {//找到满足要求的人员
            console.log(data);
            if (data[0].num <= 10) { //人员数小于10的简单策略
                LessTen(data[0].num,result);
                }
             else { //把大于10个的分批成为，多个满配批次和一个小于10的批次（满配是指数据量为10的）
                var num = data[0].num;//数据个数，必大于10
                var arr1 = new Array();//数组1，用来放置满配批次
                var num2 = num/10;//剩下小于10个的个数
                var num3 = num-(num%10);//查看数据的十位数，（比如若有23个数据则num3为20）
                var arr3 = new Array();//数组3，用来接收小于10的批次
                var temp=0;
                for(var i=0;i<=num2;i++){//将数据分层多个批次，比如11-20个数据则分为两批，循环两次
                    for(var j=temp,k=0;j<num;){//遍历所有数据
                        if(j>=num3)
                            arr3[k]=result[j];//把不满十的批次放到arr3里
                        else
                            arr1[k]=result[j];//把满十的放到arr1里
                        if(j%10==9||j==(num-1)){
                            //把整个数组放到函数里面去。
                            console.log(j);
                            if(j==(num-1)){//如果j==num-1说明遍历完了说明是最后一个批次，肯定小于等于十，肯定是arr3
                                //故把arr3放进去放进函数
                                LessTen(num-num3,arr3);
                                console.log('arr3'+arr3);
                            }else//否则说明是满十的批次，用arr1
                            //把arr2放进去
                            { 
                                LessTen(10,arr1);
                                console.log('arr1'+arr1);

                            }
//                         var beginTime = new Date().getTime();
//                        while (new Date().getTime() < beginTime + 5000) {
                        //停止5秒
//                            };
                            break;
                        }
                        j++;
                        k++;
                        temp++;
                    }
 /*                   var beginTime = new Date().getTime();
                            while (new Date().getTime() < beginTime + 5000) {
                            //停止5秒
                            };*/
                    temp++;

                }
/*                            var beginTime = new Date().getTime();
                            while (new Date().getTime() < beginTime + 5000) {
                            //停止5秒
                            };*/
            }
        });

    });
});

//目前能够找到对应的某个立功人员 策略还没有写完
//测试是否连接上数据库
//db.select('example');

server.listen(3001, function() {
    console.log("Express server listening on port 3001");
});
