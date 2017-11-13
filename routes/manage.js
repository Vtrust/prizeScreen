/**
 * Created by 14798 on 2017/9/19.
 */
let fs = require('fs');
let express = require('express');
let path = require('path');
let router = express.Router();
let multer=require('multer');// 文件上传中间件
let db = require('../dbhelper/db');



router.post('/', function(req, res) {
    var body = req.body;
    var num = body.num;
    var con = body.content;
    db.GetName(con, function(dat) {
        var instant = dat;
        if (instant.err) {
            console.log('未找到此项');
        } else {
            if (num == 'all') {
                for (var i = 1; i < 11; i++) {
                    if (screenArr[i]) {
                        console.log(i);
                        screenArr[i].send(instant.type, instant.content);
                    } else
                        console.log('第' + i + '屏未启动');
                }
            } else if (screenArr[num])
                screenArr[num].send(instant.type, instant.content);
            else
                console.log('该屏未启动');
        }
    });
});

router.post('/change', function(req, res) {

    var body = req.body;
    var n = body.n;
    console.log('点击' + n);
    screenArr[n].send();
    console.log(screenArr);
    res.send({
        err: 0,
        msg: 'ok'
    });
});

router.post('/sub', function(req, res) {

    var body = req.body;

    console.log(body);
    var arr = new Array();
    arr[0] = body.event;
    arr[1] = body.type;
    arr[2] = body.content;
    //    console.log(arr);

    //    console.log(arr);
    db.insert('person', arr);
    res.send({
        err: 0,
        msg: 'ok'
    });
});

module.exports = router;