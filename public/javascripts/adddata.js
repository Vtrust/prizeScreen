/**
 * Created by 14798 on 2017/9/19.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sockshow'
});

connection.connect();
//department    1
connection.query("CREATE TABLE IF NOT EXISTS department (\
        dept_id INT UNSIGNED AUTO_INCREMENT,\
        name VARCHAR(40) NOT NULL unique,\
        PRIMARY KEY( dept_id )\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
  if (error) throw error;
  console.log('create table department success!');
});
//job    2
connection.query("CREATE TABLE IF NOT EXISTS job (\
        job_id INT UNSIGNED AUTO_INCREMENT,\
        name VARCHAR(40) NOT NULL unique,\
        dept_id INT UNSIGNED,\
        PRIMARY KEY( job_id ),\
        FOREIGN KEY(dept_id) REFERENCES department(dept_id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
  if (error) throw error;
  console.log('create table job success!');
});
//person    3
connection.query("CREATE TABLE IF NOT EXISTS person (\
        per_id VARCHAR(255) unique NOT NULL,\
        name VARCHAR(40) NOT NULL,\
        gender VARCHAR(20) NOT NULL,\
        dept_id INT UNSIGNED,\
        job_id INT UNSIGNED,\
        photo VARCHAR(255)  DEFAULT 'default.png',\
        PRIMARY KEY( per_id ),\
        FOREIGN KEY(dept_id) REFERENCES department(dept_id),\
        FOREIGN KEY(job_id) REFERENCES job(job_id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
  if (error) throw error;
  console.log('create table person success!');
});
//prize    4
connection.query("CREATE TABLE IF NOT EXISTS prize (\
        pri_id INT UNSIGNED AUTO_INCREMENT unique,\
        year VARCHAR(40) NOT NULL,\
        desc_a VARCHAR(20) NOT NULL,\
        desc_b VARCHAR(20) NOT NULL,\
        PRIMARY KEY( year,desc_a,desc_b )\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
  if (error) throw error;
  console.log('create table prize success!');
});
//get_pri    5
connection.query("CREATE TABLE IF NOT EXISTS get_pri (\
        pri_id INT UNSIGNED NOT NULL,\
        per_id VARCHAR(255) NOT NULL,\
        time DATETIME,\
        PRIMARY KEY( pri_id, per_id),\
        FOREIGN KEY(pri_id) REFERENCES prize(pri_id),\
        FOREIGN KEY(per_id) REFERENCES person(per_id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
  if (error) throw error;
  console.log('create table get_pri success!');
});



adddata();
//虚拟数据
function adddata(){
    //department
    let i=10;
    for(let j=0;j<i;j++){
        connection.query("insert into department (name) values ('部门"+j+"');",function (error, results, fields) {
            if (error) throw error;
            console.log('部门'+j);
        });
    }

    //job
    i=20;
    for(let j=0;j<i;j++){
        connection.query("insert into job (name) values ('职位"+j+"');",function (error, results, fields) {
            if (error) throw error;
            console.log('职位'+j);
        });
    }

    //person
    let per_name='队员';
    let per_gender=['男','女','保密'];
    let photo=['斑马','刺猬','大象','公鸡','河马','狐狸','鲸鱼','考拉','狼'];

    i=100;
    for(let j=0;j<i;j++){
        let gender_n=Math.floor(Math.random()*3)
        let department_n=Math.floor(Math.random()*9+1)
        let job_n=Math.floor(Math.random()*19+1)
        let photo_n=Math.floor(Math.random()*9)

        // 数据库插入数据
        connection.query("insert into person (per_id,name,gender,dept_id,job_id,photo) values ('"+j+"','队员"+j+"','"+per_gender[gender_n]+"',\
            '"+department_n+"','"+job_n+"','"+photo[photo_n]+'.png'+"');",function (error, results, fields) {
            if (error) throw error;
            console.log("'队员"+j+"','"+per_gender[gender_n]+"','"+department_n+"','"+job_n+"','"+photo[photo_n]+'.png'+"'");
        });        
    }

    //prize
    i=5
    for(let j=0;j<i;j++){
        for(let j1=0;j1<2;j1++){
            for(let j2=0;j2<2;j2++){
                connection.query("insert into prize (year,desc_a,desc_b) values ('"+(2000+j)+"','专项"+j1+"','"+j2+"等奖');",function (error, results, fields) {
                    if (error) throw error;
                    console.log("'"+(2000+j)+"','专项"+j1+"','"+j2+"等奖'");
                });        
            }
        }
    }

    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //get_pri
    i=30
    for(let j=0;j<i;j++){
        let pri_id=Math.floor(Math.random()*10+1);
        let per_id=Math.floor(Math.random()*99+1);
        connection.query("insert into get_pri (pri_id,per_id) values ('"+pri_id+"','"+per_id+"');",function (error, results, fields) {
            if (error) 
                console.log("error");
            console.log("'"+per_id+"','"+per_id+"'");
        });         
    }
}

   

connection.end();

let createtable = "CREATE TABLE IF NOT EXISTS department (\
        id INT UNSIGNED AUTO_INCREMENT,\
        name VARCHAR(40) NOT NULL,\
        PRIMARY KEY( id )\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;\
    \
CREATE TABLE IF NOT EXISTS position (\
        id INT UNSIGNED AUTO_INCREMENT,\
        name VARCHAR(40) NOT NULL,\
        dept_id INT UNSIGNED,\
        PRIMARY KEY( id ),\
        FOREIGN KEY(dept_id) REFERENCES department(id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;\
    \
CREATE TABLE IF NOT EXISTS person (\
        id INT UNSIGNED AUTO_INCREMENT,\
        name VARCHAR(40) NOT NULL,\
        gender VARCHAR(20) NOT NULL,\
        dept_id INT UNSIGNED,\
        job_id INT UNSIGNED,\
        PRIMARY KEY( id ),\
        FOREIGN KEY(dept_id) REFERENCES department(id),\
        FOREIGN KEY(job_id) REFERENCES department(id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;\
    \
CREATE TABLE IF NOT EXISTS prize (\
        id INT UNSIGNED AUTO_INCREMENT,\
        year VARCHAR(40) NOT NULL,\
        desc_a VARCHAR(20) NOT NULL,\
        desc_b VARCHAR(20) NOT NULL,\
        PRIMARY KEY( id )\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;\
    \
CREATE TABLE IF NOT EXISTS get_pri (\
        id INT UNSIGNED AUTO_INCREMENT,\
        pri_id INT UNSIGNED NOT NULL,\
        per_id INT UNSIGNED NOT NULL,\
        tim DATETIME,\
        PRIMARY KEY( id ),\
        FOREIGN KEY(pri_id) REFERENCES prize(id),\
        FOREIGN KEY(per_id) REFERENCES person(id)\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;"

