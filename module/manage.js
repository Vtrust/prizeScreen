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
    db.FindAllDepartment(function (departments) {
        db.FindAllJob(function (jobs) {
            res.render('manage/per-add', {
                departments: departments,
                jobs: jobs
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

exports.DelePrize = function (req,res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.per_id;
        data[1] = fields.pri_id;
        db.delePerPri(data, function(flag){
            sendState(flag,res);
        });
    }); 
}


exports.AddPerPri = function (req,res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.per_id;
        data[1] = fields.pri_id;
        db.addPerPri(data, function(flag){
            sendState(flag,res);
        });
    }); 
}

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
    let name = req.body.name;
    let gender = req.body.gender;
    let department = req.body.department;
    let job = req.body.job;
    let photo = filename;



    // 数据库插入数据
    let person = [per_id, name, gender, department, job, photo];
    console.log('person person person',person)
    db.insertPerson(person, function (flag) {
        if (flag === 1) {
            res.send({state:1});
        } else {
            fs.unlink(str);
            res.send({state:-1});
        }
        
    });
}

exports.ShowPerEdit = function (req, res) {
    db.findAllPerson(function(data){
        res.render('manage/per-edit',{
            persons:data
        });
    });

}

exports.SearchPer = function (req, res) {
    console.log('SearchPer',req.query);
    db.findPersonByIdOrName(req.query.data,function(data){
        res.send(data);
    })
}

exports.EidtOnePer = function (req, res) {
    db.FindPersonById(req.query.per_id,function(data1){
        db.FindAllDepartment(function(data2){
            db.FindAllJob(function(data3){
                console.log('EidtOnePer',data1,data2,data3)
                res.render('manage/one_per_edit',{
                    person:data1[0],
                    departments:data2,
                    jobs:data3
                })
            })
        })
    })
}

exports.DoEidtOnePer = function (req, res) {
    console.log(req.body);
    let photo = ''
    let per_id = req.body.per_id;
    let name = req.body.name;
    let gender = req.body.gender;
    let department = req.body.department;
    let job = req.body.job;


    let person=[per_id, name, gender, department, job, per_id];

    if(req.body.baseImg){
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

        photo = filename;    
        person =  [per_id, name, gender, department, job, photo, per_id];  
    }
    // 数据库更新数据
    console.log('person person person',person)
    db.updatePersonById(person, function (flag) {
        sendState(flag,res);
    });    
}

exports.DelePerson = function (req,res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.per_id[0];
        db.delePriByPerId(data, function(flag1){
            db.delePerById(data, function(flag2){
                sendState(flag2,res);
            });
        });
    });
}

exports.GetAllDeptJob = function (req, res) {

    db.FindAllDepartment(function(data1){
        db.FindAllJob(function(data2){
                console.log('GetAllDeptJob',data1,data2)
            res.send({
                departments:data1,
                jobs:data2
            })
        })
    })
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
exports.showAddDepartment = function (req, res){
 db.FindAllDepartment(function (dat1) {
    db.FindAllJob(function (dat2) {
        res.render('manage/dept-add', {
            departments: dat1,
            jobs: dat2,
        });
    })
});
}

exports.showAddprize = function (req, res){
    db.FindAllPrize(function (data) {
        res.render('manage/pri-add', {
            prizes: data
        });
    })

}

exports.addPrize = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        var prize = new Array();
        prize[0] = fields.year;
        prize[1] = fields.desc_a;
        prize[2] = fields.desc_b;
        db.insertPrize(prize,function(flag){
            sendState(flag,res);
        });
    });
}

exports.editPrize = function (req,res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var prize = new Array();
        prize[0] = fields.year;
        prize[1] = fields.desc_a;
        prize[2] = fields.desc_b;
        prize[3] = fields.pri_id;
        db.updatePrizeById(prize,function(flag){
            if(flag===1){
                res.send({state:1});
            }else{
                res.send({state:-1});
            }
        });
    });
}

exports.delePrize = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.pri_id[0];
        db.deleGetPriByPriId(data, function(flag1){
            db.delePrizeById(data, function(flag2){
                if(flag2===1){
                    res.send({state:1});
                }else{
                    res.send({state:-1});
                }
            });
        });
    });
}

function sendState(flag,res){
    if(flag===1){
        res.send({state:1})
    }else{
        res.send({state:-1})
    }
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
        db.insertDepartment(department,function(flag){
            sendState(flag,res);
        });
    });
}

exports.addJob = function (req, res) {

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var job = new Array();
        job[0] = fields.job;
        db.insertJob(job, function(flag){
            sendState(flag,res);
        });
    });
}


exports.getPerizeAdd = function (req, res) {
    console.log('getPerizeAdd');
    db.FindAllYear(function (data1) {
        db.FindAllDepartment(function (data2) {
            res.render('manage/get-prize', {
                years: data1,
                departments: data2
            });
        })
    });
}

exports.editDepartment = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var prize = new Array();
        prize[0] = fields.name;
        prize[1] = fields.dept_id;
        db.updateDeptById(prize,function(flag){
            sendState(flag,res);
        });
    });
}

exports.deleDepartment = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.dept_id[0];
        db.updatePerDeptByDeptId(data, function(flag1){
            db.deleDeptById(data, function(flag2){
                 sendState(flag2,res);
            });
        });
    });    
}

exports.editJob = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        var data = new Array();
        data[0] = fields.name;
        data[1] = fields.job_id;
        console.log('updateJobById',data);
        db.updateJobById(data,function(flag){
            sendState(flag,res);
        });
    });
}

exports.deleJob = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        if (err) {
            console.log('错误');
            return;
        }
        var data = new Array();
        data[0] = fields.job_id[0];
        db.updatePerJobByJobId(data, function(flag1){
            db.deleJobById(data, function(flag2){
                 sendState(flag2,res);
            });
        });
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

    let pri_id = req.query.pri_id;
    let dept_id = req.query.dept_id;
    if(dept_id){
        //获得奖项信息
        db.FindPriById(pri_id, function (data) {
            //console.log(data);
            let data1 = {
                pri_id:pri_id,
                desc_a:data[0].desc_a,
                desc_b:data[0].desc_b,
                dept_id:dept_id
            }

            console.log(data1);
            db.FindDeptPreGetPriPer(data1,function(data2){
                console.log(data2);
                res.send(data2);
            })
        })
    }else{
        db.getPerByPriId(pri_id,function(data){
            console.log(data);
            res.send(data);
        })
    }
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
            console.log('fields',fields);
            let pri_id = fields.pri_id;

            // 数据库插入数据
            db.insertPerPrize([per_id,pri_id], function (flag) {
                let message = "";
                if (flag !== -1) {
                    sucData.push(per_id)
                } else {
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
    db.FindPersonByNameOrId(req.query, function (data) {
        res.send(data);
    })
}

exports.showScreenSet = function (req, res){
    res.render('manage/screenSet');
}

exports.setAutoplaySpeed = function (req, res){
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('错误');
            return;
        }
        console.log(fields);
        global.autoplaySpeed = fields.autoplaySpeed*1000;
        clearInterval(global.autoplay);
        global.autoplay = setInterval(function () {
            for (let i = 0; i < global.keys.length; i++) {
                setTimeout(function () {
                    if (global.screen[global.keys[i]])
                        global.screen[global.keys[i]].playNext();
                }, 100);
            }
            console.log("翻页信号发送成功！" + new Date());
        }, global.autoplaySpeed);
        res.send({
            code:1
        })
    });
}