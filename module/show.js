const db = require('../dbhelper/db');//引入数据库


let reSetScreen = function () {
    //让所有屏幕复位
    for (let i = 0; i < global.keys.length; i++) { //数据发送
        setTimeout(function () {
            let key = global.keys[i];
            if (global.screen[key]) {
                global.screen[key].send("");
            }
        }, 100);
    }
    //停止轮播
    clearInterval(global.autoplay);
}

exports.index = function (req, res) {
    var years;
    reSetScreen();

    db.FindYear(function (data) {
        years = data;
        res.render('show/show-index', {
            years: years
        });
    });
}

exports.showYears = function (req, res) {
    var result;

    db.FindYear(function (data) {
        result = dat;
        console.log(result);
        res.render('show/show-year', {
            year: result
        });
    });
}

exports.showDesc_a = function (req, res) {
    var year = req.query.year;
    db.FindDesc_aByYear(year, function (data) {
        console.log(data);
        res.render('show/show-desc_a', {
            desc_a: data,
            year: year
        });
    });
}

exports.showDesc_b = function (req, res) {
    var year = req.query.year;
    var desc_a = req.query.desc_a;
    console.log(year,desc_a)
    db.FindDesc_bByYearDesc_a(year, desc_a, function (data) {
        console.log(data);
        res.render('show/show-desc_b', {
            year: year,
            desc_a: desc_a,
            desc_b: data
        });
    });
}

exports.showPersons = function (req, res) {
    let year = req.query.year;
    let desc_a = req.query.desc_a;
    let desc_b = req.query.desc_b;

    let time; //需要轮转的次数
    let residual; //除10以后剩余的次数
    let msg = 0;

    // db.CountNum(year, desc_a, desc_b, function (data) {
    //     console.log('6666666666', data);
    //     let num = data[0].num;
    //     console.log("ssss", num);

        // if (num != 0) {
            db.FindPriPersonByPrize(year, desc_a, desc_b, function (data) {
                console.log(data);
/*                data=[  { per_id: 1, name: '队员0' },
   { per_id: 2, name: '队员1' },
   { per_id: 3, name: '队员2' },
   { per_id: 7, name: '队员6' },
   { per_id: 8, name: '队员7' },
   { per_id: 9, name: '队员8' } ]*/

                if(data.flag&&data.flag == -1){
                    console.log('FindPriPersonByPrize失败',data);
                    //TODO错误返回
                }else if(data.length==0){
                    res.render('show/show-persons', {
                        year: year,
                        desc_a: desc_a,
                        desc_b: desc_b,
                        persons: data
                    });
                }else{
                    res.render('show/show-persons', {
                        year: year,
                        desc_a: desc_a,
                        desc_b: desc_b,
                        persons: data
                    });

                    let persons = data;
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
                        //先清理
                        clearInterval(global.autoplay);
                        //再执行
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
                        console.log("无在线屏幕！不发送数据");
                    }
            }
    });
}

exports.showPerson = function (req, res) {
    var year = req.query.year;
    var desc_a = req.query.desc_a;
    var desc_b = req.query.desc_b;
    var per_id = req.query.per_id;
    db.FindPersonById(per_id, function (data1) {
        console.log(data1);
        db.FindPerPrizeById(per_id, function(data2){
            console.log(data2);
            res.render('show/show-person', {
                year: year,
                desc_a: desc_a,
                desc_b: desc_b,
                person: data1[0],
                prizes:data2
            });
        });
    });
}

