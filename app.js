//引入程序包
var express = require('express'),
path = require('path'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
db = require('./dbhelper/db');
var flash = require('connect-flash');
var routes = require('./routes'); //路由
var fs = require('fs'), 
multer=require('multer');// 文件上传中间件
var multiparty = require('multiparty');

var flag1,flag2;

//设置日志级别
let playTime=4000;

// 所有屏幕信息
let screen=[];
let keys=[];
let screenNum=0;

//设置日志级别
io.set('log level', 1);

io.on('connection', function(socket) {//新的客户端连接
var newScreen={
    socket:socket,
    key:null,
}

// 对message事件的监听
socket.on('message', function(key) {
    for(let i=0;i<keys.length;i++){
        if(key===keys[i]){
            socket.emit('err','该序号屏幕已经开启,请更改为别的序号！');
            return console.log('err','该序号屏幕已经开启！');
        }
         
    }
    keys[screenNum]=key;
    screenNum++;

    //冒泡排序        
    for(let i=0;i<screenNum;i++){
        for(let j=1;j<screenNum-i;j++){
            if(keys[j]<keys[j-1]){
                let t=keys[j];
                keys[j]=keys[j-1];
                keys[j-1]=t;
            }
        }
    }

    if(newScreen.key===null){
        newScreen.key=key;
        screen[key]=newScreen;
    }
    console.log(keys);
    //显示数据发布函数
    screen[key]['send'] = function(arr) {
        socket.emit('system', arr);
    };
    screen[key]['back'] = function(){
        socket.emit('back');
        console.log('执行了');
    }
    //滚屏命令发送函数
    screen[key]['playNext'] = function() {
        socket.emit('playNext',true);
    };       
    //console.log(screen);

    //监听出退事件
    socket.on('disconnect', function() {
        screen.splice(newScreen.key,1);//删除对象
        for(let i=0;i<keys.length;i++){
            if(key===keys[i]){
              keys.splice(i,1);
              screenNum--;
            }
             
        } 
        console.log(keys);
        //console.log(screen);  
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
app.get('/people',function(req,res){
var year = req.query.year;
var item = req.query.item;
var prize = req.query.prize;
var id = req.query.id;
db.FindPersonPrize(id,function(dat){
    result = dat;
    console.log(result);
    res.render('people',{
        year:year,
        item:item,
        prize:prize,
        people:result
    });
});
});

app.get('/persons',function(req,res){
var year = req.query.year;
var item = req.query.item;
var detail = req.query.prize;
db.FindPerson(year,item,detail,function(dat){
    result = dat;
    res.render('person',{
        year:year,
        item:item,
        detail:detail,
        person:result
    });
});
});
app.get('/person', function(req, res) {
let year = req.query.year;
let item = req.query.item;
let detail = req.query.prize;
let time; //需要轮转的次数
let residual; //除10以后剩余的次数
db.FindPerson(year, item, detail, function(data) {
    let persons = data;
    if(data.err&&data.err===1){
        //错误返回
    }else{
        res.render('person', {
            year:year,
            item:item,
            detail:detail,
            person:data
        });
        //屏幕分配算法
        let n=screenNum;//屏幕个数
        let screenData=new Array(n);//保存人物信息
        let numData=[n];//保存个数信息
        let screenSet=[n];//数据屏幕分配标志集
        let zeroNum=0;
        for(let i=0;i<n;i++){//初始化数组
            screenData[i]=[];
            numData[i]=0;
            screenSet[i]=i;
        }
        for(let i=0;i<persons.length;i++){
            if(n!=0)
            {
            let j=i%n;//获得数据存储下标
            console.log(screenData[j],j,i,n);
            screenData[j].push(persons[i]);
            numData[j]++;
            }
        }
        if(n>persons.length){//使有数据的趋于中间
            zeroNum=n-persons.length;
            let leftMove=zeroNum/2;
            for(let i=0;i<leftMove;i++){
                let temp=screenSet[screenSet.length-1];
                for(let j=screenSet.length-1;j>0;j--){
                    screenSet[j]=screenSet[j-1];
                }
                screenSet[0]=temp;
            }
        }

        for(let i=0;i<keys.length;i++){
            let key=keys[i];
            screen[key].send(screenData[screenSet[i]])
        }          
        console.log(numData);
        console.log(screenSet);           
        //console.log(screenData);
        //开始发送数据
    }                      
});
});

//固定时间发生翻页
flag1 = setInterval(function(){
for(let i=0;i<keys.length;i++){
    if(screen[keys[i]])
        screen[keys[i]].playNext();
}
},playTime)


app.get('/back',function(req,res){

    var result;
db.FindYear(function(dat) {
    result = dat;
    console.log(result);
    res.render('year', {
        year: result
    });
});

for(var i=0;i<keys.length;i++)
{   
    if(screen[keys[i]])
        screen[keys[i]].back();
}
});
console.log(playTime);
app.get('/index',function(req,res){

    var n = req.query.n;
    console.log(n);
    if(n!=undefined){
    playTime = n*1000;
    if(flag1!=undefined)
    clearInterval(flag1);
    if(flag2!=undefined)
    clearInterval(flag2);
    flag2 = setInterval(function(){
        for(let i=0;i<keys.length;i++){
            if(screen[keys[i]])
                screen[keys[i]].playNext();
    }
    },playTime);  
    console.log("playTime",playTime);}
    res.render('index');

});
//目前能够找到对应的某个立功人员 策略还没有写完
//测试是否连接上数据库
//db.select('example');

server.listen(80, function() {
console.log("Express server listening on port 80");
});
