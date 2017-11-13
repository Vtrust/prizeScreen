/**
 * Created by 14798 on 2017/9/19.
 */
let db = require('../../dbhelper/db');

//person
let per_name='队员';
let per_gender=['男','女','保密'];
let per_department='部门';
let photo=['斑马','刺猬','大象','公鸡','河马','狐狸','鲸鱼','考拉','狼'];

let i=100;
for(let j=0;j<i;j++){
    let gender_n=Math.floor(Math.random()*3)
    let department_n=Math.floor(Math.random()*10+1)
    let photo_n=Math.floor(Math.random()*9)

    // 数据库插入数据
    let person=[j,per_name+j,per_gender[gender_n],per_department+department_n,photo[photo_n]+'.png'];
    console.log(person);
    db.insertPerson(person,function(data2){
        let message="";
        if(data2.err!=="1"){
            message={
                code:1,
                message:"上传成功"
            }
        }else{
            message={
                code:0,
                message:data2.msg
            }
        }
        console.log(j,message);
    });
}
/*
//price
let year=['2015','2016'];
let items=['专项','非专项'];
let detail=['一等功','二等功'];

console.log(items);

let i=50;
for(let j=0;j<i;j++){
    let year_n=Math.floor(Math.random()*2);
    let item_n=Math.floor(Math.random()*2);
    let detail_n=Math.floor(Math.random()*2);
    let person_n=Math.floor(Math.random()*100);

    let per_pri=[person_n,year[year_n],items[item_n],detail[detail_n]];
    console.log(per_pri);
     db.insertPerPrize(per_pri,function(data2){
            let message="";
            if(data2.err!=="1"){
                message={
                    code:1,
                    message:"上传成功"
                }
            }else{
                message={
                    code:0,
                    message:data2.msg
                }
            }
            console.log(j,message);
        });
}*/
   


