const db = require('../dbhelper/db');//引入数据库

exports.index = function (req, res) {
    var years;
    db.FindYear(function (data) {
        years = data;
        console.log(years[1].year);
        res.render('show/show-index', {
            years: years
        });
    });
}

exports.showYears = function (req, res) {
    var result;
    db.FindYear(function (dat) {
        result = dat;
        console.log(result);
        res.render('show/show-year', {
            year: result
        });
    });
}

exports.showItem = function (req, res) {
    var year = req.query.year;
    var result;
    db.FindItem(year, function (dat) {
        result = dat;
        console.log(result);
        res.render('show/show-item', {
            item: result,
            year: year
        });
    });
}

exports.showPrize = function (req, res) {
    var year = req.query.year;
    var item = req.query.item;
    console.log(year,item,'sdsds')
    db.FindPrize(year, item, function (dat) {
        result = dat;
        console.log(result);
        res.render('show/show-prize', {
            year: year,
            item: item,
            prize: result,
            msg: 1
        });
    });
}

exports.showPerson = function (req, res) {
    var year = req.query.year;
    var item = req.query.item;
    var prize = req.query.prize;
    var id = req.query.id;
    db.FindPersonPrize(id, function (dat) {
        result = dat;
        console.log(result);
        res.render('show/show-person', {
            year: year,
            item: item,
            prize: prize,
            people: result
        });
    });
}

exports.showPersons = function (req, res) {
    let year = req.query.year;
    let item = req.query.item;
    let detail = req.query.prize;
    let time; //需要轮转的次数
    let residual; //除10以后剩余的次数
    let msg = 0;
    db.CountNum(year, item, detail, function (dat) {
        console.log('6666666666', dat);
        let num = dat[0].num;
        console.log("ssss", num);
        if (num != 0) {
            db.FindPerson(year, item, detail, function (data) {
                let persons = data;
                if (data.err && data.err === 1) {
                    //错误返回
                } else {
                    res.render('show/show-persons', {
                        year: year,
                        item: item,
                        detail: detail,
                        person: data
                    });
                    //屏幕分配算法
                    if(global.keys.length>0){
                        let n = global.screenNum; //屏幕个数
                    let screenData = new Array(n); //保存人物信息
                    let numData = [n]; //保存个数信息
                    let screenSet = [n]; //数据屏幕分配标志集
                    let zeroNum = 0;
                    for (let i = 0; i < n; i++) { //初始化数组
                        screenData[i] = [];
                        numData[i] = 0;
                        screenSet[i] = i;
                    }
                    for (let i = 0; i < persons.length; i++) {
                        if (n != 0) {
                            let j = i % n; //获得数据存储下标
                            //console.log(screenData[j],j,i,n);
                            screenData[j].push(persons[i]);
                            numData[j]++;
                        }
                    }
                    if (n > persons.length) { //使有数据的趋于中间
                        zeroNum = n - persons.length;
                        let leftMove = zeroNum / 2;
                        for (let i = 0; i < leftMove; i++) {
                            let temp = screenSet[screenSet.length - 1];
                            for (let j = screenSet.length - 1; j > 0; j--) {
                                screenSet[j] = screenSet[j - 1];
                            }
                            screenSet[0] = temp;
                        }
                    }

                    for (let i = 0; i < global.keys.length; i++) { //数据发送
                        setTimeout(function () {
                            let key = global.keys[i];
                            if (global.screen[key]) {
                                global.screen[key].send(screenData[screenSet[i]]);
                            }
                        }, 100);
                    }

                    global.autoplay = setInterval(function () {
                        for (let i = 0; i < global.keys.length; i++) {
                            setTimeout(function () {
                                if (global.screen[global.keys[i]])
                                    global.screen[global.keys[i]].playNext();
                            }, 100);
                        }
                        console.log("翻页信号发送成功！" + new Date());
                    }, global.autoplaySpeed);

                    console.log(numData, "--每个屏幕人员分配");
                    console.log(screenSet, "--屏幕发送序列号");
                    console.log("照片信息数据发送成功！");
                }else{
                    console.log("无在线屏幕！");
                }

            }
        });
        } else {
            res.render('show/show-prize', {
                year: year,
                item: item,
                prize: detail,
                msg: msg
            })
        }
    });
}