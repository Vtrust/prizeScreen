let fs = require('fs');
let path = require('path');
var multer = require('multer'); // 文件上传中间件
var multiparty = require('multiparty'); // 解析form-data
let db = require('../dbhelper/db');

exports.index = function (req, res) {
    res.render('manage/index');
    //res.render('add');
}

exports.showPerAdd = function (req, res) {
    db.FindDepartment(function (departments) {
        db.FindPosition(function (positions) {
            res.render('manage/per-add', {
                departments: departments,
                positions: positions
            });
        })
    });
}

// 中间件设置
var storage = multer.diskStorage({
    destination: function (req, file, cb) { // 设置文件存储路径
        cb(null, './public/image/headers')
    },
    filename: function (req, file, cb) { // 设置文件名字格式
        if (file) {
            cb(null, "upload_" + Date.parse(new Date()) + "_" + file.originalname);
        }
    }
});


var upload = multer({
    storage: storage // 应用设置
});

exports.uploadHeaders = upload.single('per_photo');

exports.perAdd = function (req, res) {

    let imgData = req.body.baseImg;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let filename = "image_upload_" + Date.parse(new Date()) + ".png";
    let str = "public/image/headers/" + filename;
    console.log('str', str)
    fs.writeFile(str, dataBuffer, function (err) {
        if (err) {
            console.log(err);
            //    return res.send(err);
        } else {
            console.log('success')
            //    return res.send("保存成功！");
        }
    });

    let per_id = req.body.per_id;
    let per_name = req.body.per_name;
    let per_gender = req.body.per_gender;
    let per_department = req.body.per_department;
    let per_position = req.body.per_position;



    // 数据库插入数据
    let person = [per_id, per_name, per_gender, per_department, per_position, filename];
    db.insertPerson(person, function (data2) {
        let message = "";
        if (data2.err !== 1) {
            message = "上传成功";
        } else {
            message = "上传失败";
            fs.unlink(str);
        }
        res.send(message);
    });
}

exports.info = function (req, res) {
    db.FindDepartment(function (dat1) {
        db.FindPosition(function (dat2) {
            db.findprizeall(function (dat3) {
                res.render('info', {
                    departments: dat1,
                    positions: dat2,
                    prize: dat3
                });
            })
        })

    });
}

exports.addPrize = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var prizeArray = new Array();
        prizeArray[0] = fields.year;
        prizeArray[1] = fields.prize;
        prizeArray[2] = fields.detail;
        db.insertPrize(prizeArray);
    });
}

exports.addDepartment = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var department = new Array();
        department[0] = fields.department;
        db.insertDepartment(department);
    });
}

exports.addPosition = function (req, res) {

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var position = new Array();
        position[0] = fields.position;
        db.insertPosition(position);
    });
}


exports.getPerizeAdd = function (req, res) {
    console.log('getPerizeAdd');
    //获得所有奖项年份
    db.FindeRrizeYear(function (data) {
        db.FindAllDeptment(function (data2) {
            res.render('manage/get-prize', {
                years: data,
                departments: data2
            });
        })
    });
}

exports.getYearPrize = function (req, res) {
    console.log('getYearPrize');
    let year = req.query.year;
    db.FindYearPrize(year, function (data) {
        res.send(data);
    })
}

exports.PreGetPrizePersons = function (req, res) {
    let prize = req.query.prize.split(" ");
    let prizeData = {
        year: req.query.year,
        item: prize[0],
        detail: prize[1],
        department: req.query.department
    }
    //获得当前部门的人
    db.FindDepartmentPerson(prizeData, function (data) {
        res.send(data);
    })
}

exports.prePhoto = function (req, res) {
    let name = req.query.name;
    //获得之前获得奖项的人
    db.FindOnePerson(name, function (data) {
        if (!data.err) {
            data.forEach(function (dat) {
                dat.pic = 'http://' + req.headers.host + '/image/headers/' + dat.pic;
            });
        }
        res.send(data);
    })
}

exports.addPersonsPrize = function (req, res) {
    console.log('do addPersonsPrize');
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        let persons = fields.choosePerson[0].split(',');
        let errData = [];
        let sucData = [];

        for (let i = 0; i < persons.length; i++) {
            let per_id = persons[i];
            let insertData = (per_id + " " + fields.prize).split(' ');

            // 数据库插入数据
            db.insertPerPrize(insertData, function (data2) {
                let message = "";
                if (data2.err !== 1) {
                    message = {
                        code: 1,
                        message: "上传成功"
                    }
                    sucData.push(per_id)
                } else {
                    message = {
                        code: 0,
                        message: data2.msg
                    }
                    errData.push(per_id);
                }
                //console.log(i,message);
                if (i === persons.length - 1) {
                    console.log(i, 'sucData', sucData, 'errData', errData);
                    let resData = {
                        'sucData': sucData,
                        'errData': errData
                    }
                    return res.send(resData);
                }
            });
        }
    });
}

exports.search = function (req, res) {
    let data = req.query.data;
    let department = req.query.department;
    db.FindPersonByNameOrId(req.query, function (data) {
        res.send(data);
    })
}