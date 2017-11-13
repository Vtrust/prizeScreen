/**
 * Created by 14798 on 2017/9/19.
 */
let fs = require('fs');
let express = require('express');
let path = require('path');
let router = express.Router();
var multer=require('multer');// 文件上传中间件
var multiparty = require('multiparty');// 解析form-data
let db = require('../dbhelper/db');


// 中间件设置
var storage = multer.diskStorage({
    destination: function (req, file, cb){// 设置文件存储路径
        cb(null, './public/image/headers')
    },
    filename: function (req, file, cb){// 设置文件名字格式
        if(file){
            cb(null,"upload_"+Date.parse(new Date())+"_"+file.originalname);
        }   
    }
});

var upload = multer({
    storage: storage// 应用设置
});

router.get('/',function(req,res){
    res.render('add');

});

// 添加新人路由
router.get('/person',function(req,res){
    db.FindDepartment(function(dat1){
        db.FindPosition(function(dat2){
            res.render('addPerson',{
                departments:dat1,
                positions:dat2
            });
        })

    });
});

router.post('/person',upload.single('per_photo'),function(req,res){
    
    let imgData=req.body.baseImg;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let filename="image_upload_"+ Date.parse(new Date())+".png";
    let str="public/image/headers/"+filename;
    console.log('str',str)
    fs.writeFile(str, dataBuffer, function(err) {
        if(err){
            console.log(err);
        //    return res.send(err);
        }else{
            console.log('success')
        //    return res.send("保存成功！");
        }
    });

    let per_id=req.body.per_id;
    let per_name=req.body.per_name;
    let per_gender=req.body.per_gender;
    let per_department=req.body.per_department;
    let per_position = req.body.per_position;

    

    // 数据库插入数据
    let person=[per_id,per_name,per_gender,per_department,per_position,filename];
    db.insertPerson(person,function(data2){
        let message="";
        if(data2.err!==1){
            message="上传成功";
        }else{
            message="上传失败";
            fs.unlink(str);
        }
        res.send(message);
    });
});


router.get('/info',function(req,res){
    db.FindDepartment(function(dat1){
        db.FindPosition(function(dat2){
            db.findprizeall(function(dat3){
            res.render('info',{
                departments:dat1,
                positions:dat2,
                prize:dat3
            });
            })
        })

    });
});

router.post('/addprize',function(req,res){

    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
        if(err){
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
});

router.post('/adddeparment',function(req,res){

    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
        if(err){
            console.log('错误');
            return;
        }
        console.log(fields);
        var department = new Array();
        department[0] = fields.department;
        db.insertDepartment(department);
    });
});

router.post('/addposition',function(req,res){

    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
        if(err){
            console.log('错误');
            return;
        }
        console.log(fields);
        var position = new Array();
        position[0] = fields.position;
        db.insertPosition(position);
    });
});



// 添加奖项路由
router.get('/prize',function(req,res){
    //获得所有奖项年份
    db.FindeRrizeYear(function(data){
        db.FindAllDeptment(function(data2){
            res.render('addPrize',{
                years:data,
                departments:data2
            });   
        })
    });

});

//获得当前年份的所有奖项
router.get('/prize/year',function(req,res){
    let year=req.query.year;
    db.FindYearPrize(year,function(data){
        res.send(data);
    })
});

//获得之前获得奖项的人
router.get('/prize/person',function(req,res){
    let prize=req.query.prize.split(" ");
    let prizeData={
        year:req.query.year,
        item:prize[0],
        detail:prize[1],
        department:req.query.department
    }
    //获得当前部门的人
    db.FindDepartmentPerson(prizeData,function(data){
        res.send(data);
    })
});

//获得照片预览
router.get('/prize/name',function(req,res){
    let name=req.query.name;
    //获得之前获得奖项的人
    db.FindOnePerson(name,function(data){
        if(!data.err){
            data.forEach(function (dat) {
                dat.pic='http://' + req.headers.host + '/image/headers/' +dat.pic;
            });
        }
        res.send(data);
    })
});


router.post('/prize',function(req,res){
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        let persons=fields.choosePerson[0].split(',');
        let errData=[];
        let sucData=[];

        for(let i=0;i<persons.length;i++){
            let per_id=persons[i];
            let insertData=(per_id+" "+fields.prize).split(' ');
   
            // 数据库插入数据
            db.insertPerPrize(insertData,function(data2){
                let message="";
                if(data2.err!==1){
                    message={
                        code:1,
                        message:"上传成功"
                    }
                    sucData.push(per_id)
                }else{
                    message={
                        code:0,
                        message:data2.msg
                    }
                    errData.push(per_id);
                }
                //console.log(i,message);
                if(i===persons.length-1){
                    console.log(i,'sucData',sucData,'errData',errData);
                    let resData={
                        'sucData':sucData,
                        'errData':errData
                    }
                    return res.send(resData);
                }
            });         
        }
       

    });

});

router.get('/prize/search',function(req,res){
    let data=req.query.data;
    let department=req.query.department;
    db.FindPersonByNameOrId(req.query,function(data){
        res.send(data);
    })
});


module.exports = router;
