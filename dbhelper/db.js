var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sockshow'
    //database:'medal'
});

connection.connect();



//打印信息
function showResult(result,type){
    if(type===-1){
        console.log("----------------error----------");
        console.log(result);
        console.log("--------------------------------\n\n");  
    }else if(type===0){
        console.log("----------------select----------");
        console.log(result);
        console.log("--------------------------------\n\n");        
    }else if(type===1){
        console.log("----------------insert----------");
        console.log(result);
        console.log("--------------------------------\n\n");      
    }
}

//打包错误信息
function error(message){
    let msg = "未知错误"
    if(message)
        msg = message;

    return{
        err: -1,
        msg: msg
    };
}
//has
function hasName(result){
    if(result.length==0){
        return{
            err:-1,
            msg:"内容不存在"
        };
    }
    else{
        return result;
    }
}

//查全部
// exports.select = function(table){
//     var sql ="select * from "+table+";";
//     connection.query(sql,function(err,result){
//         if(err){
//             showResult(err.message,-1);
//             return;
//         }
//          showResult(result,0);
//     });
// };

//查询函数
function Search(sql,callback){
    console.log(sql+'\n\n\n');
    connection.query(sql,function(err,result){
        Delresult(err,result,callback);
    });
}

//结果处理函数
function Delresult(err,result,callback){
    let res = {
        flag:-1,
        msg:'未知错误'
    }

    if(err){
        res.flag=-1;
        res.msg=err.message;

        if(callback)
            callback(res);
        return;
    }else if(!result){
        res.flag=-1;
        res.msg='查询未返回结果';

        if(callback)
            callback(res);
        return;
    }else{
        callback(result);
        return;
    }
}

// 操作函数
function Options(sql,data,callback){
    connection.query(sql,data,function(err,result){
        if(err){
            console.log(err.message);
            if(callback)
                return callback(-1);
            return;
        }
        console.log(result);
        if(callback)
            return callback(1);
        return;
    });
}

//============================================================================
//show
//查找年份
exports.FindYear = function(callback){
    var sql = "select distinct year from prize;";
    Search(sql,callback);
};

//通过年份查dsec_a
exports.FindDesc_aByYear = function(year,callback){
    var sql = "select distinct desc_a from prize where year='"+year+"';";
    Search(sql,callback);
};

//通过year,desc_a查desc_b
exports.FindDesc_bByYearDesc_a = function(year,desc_a ,callback){
    var sql = "select distinct desc_b from prize where year='"+year+"'and desc_a = '"+desc_a+"';";
    Search(sql,callback);
};

exports.CountNum = function(year,desc_a,desc_b,callback){
    var sql = "select count(*) as num \
    from person join get_pri on person.per_id = get_pri.per_id \
    join prize on get_pri.pri_id = prize.pri_id \
    where prize.year='"+year+"' and prize.desc_a='"+desc_a+"'and prize.desc_b='"+desc_b+"';";
    Search(sql,callback);
};

//通过奖项信息查找所有得奖者
exports.FindPriPersonByPrize = function(year,desc_a,desc_b,callback){
    var sql = "select a.per_id,a.name, a.photo \
    from person as a join department as b on a.dept_id=b.dept_id \
    join get_pri as c on a.per_id=c.per_id join prize as d on c.pri_id=d.pri_id \
    where d.year='"+year+"' and d.desc_a='"+desc_a+"'and d.desc_b='"+desc_b+"';";
    Search(sql,callback);
};

//通过id查找人的信息
exports.FindPersonById = function(per_id,callback){
    var sql = "select a.per_id,a.name,a.gender,a.photo,b.name as dept_name, b.dept_id, c.name as job_name, c.job_id \
    from person as a left join department as b on a.dept_id=b.dept_id \
    left join job as c on a.job_id = c.job_id\
    where a.per_id = '"+per_id+"';";
    Search(sql,callback);
};

//通过id查找该人曾今获得的奖项信息
exports.FindPerPrizeById = function(per_id,callback){
    var sql = "select year,desc_a,desc_b  from get_pri as a join prize as b on a.pri_id=b.pri_id where per_id ='"+per_id+"';";
    Search(sql,callback);
}


//============================================================================
//manage
//找到所有奖项
exports.FindAllPrize = function(callback){
    var sql = "select * from prize order by year;";
    Search(sql,callback);
};

//插入新的奖项
exports.insertPrize=function(Prize,callback){
    var sql = "insert into prize (year,desc_a,desc_b) value(?,?,?);"
    Options(sql,Prize,callback);
}

// 更新奖项
exports.updatePrizeById=function(Prize,callback){
    console.log('Prize',Prize)
    var sql = "update prize set year=?,desc_a=?,desc_b=? where pri_id = ?;"
    Options(sql,Prize,callback);
}

//删除奖项
exports.delePrizeById=function(data,callback){
    console.log('data',data)
    var sql = "delete from prize where pri_id = ?;"
    Options(sql,data,callback);
}

// 删除获奖记录
exports.deleGetPriByPriId=function(data,callback){
    console.log('data',data);
    var sql = "delete from get_pri where pri_id = ?;"
    Options(sql,data,callback);
}


// 查找所有部门
exports.FindAllDepartment=function(callback){
    var sql = "select dept_id,name from department;";
    Search(sql,callback);
};

// 查找所有职位
exports.FindAllJob=function(callback){
    var sql = "select job_id,name from job;";
    Search(sql,callback);
};


// 新增部门
exports.insertDepartment = function (data, callback){
    var sql = "insert into department (name) value(?);";
    Options(sql,data,callback);
}

// 新增部门
exports.insertJob = function (data, callback) {
    var sql = "insert into job (name) value(?);";
    Options(sql,data,callback);
}

// 更新部门
exports.updateDeptById = function (data, callback) {
    var sql = "update department set name=? where dept_id=?;";
    Options(sql,data,callback);
}

// 通过ID删除部门
exports.deleDeptById = function (data, callback) {
    var sql = "delete from department where dept_id = ?;";
    Options(sql,data,callback);
}

// 更新该部门下的所有人的部门Id为NULL
exports.updatePerDeptByDeptId = function (data, callback) {
    var sql = "update person set dept_id = null where person.dept_id=?;";
    Options(sql,data,callback);
}

// 更新职位
exports.updateJobById = function (data, callback) {
    var sql = "update job set name=? where job_id=?;";
    Options(sql,data,callback);
}

// 通过ID删除职位
exports.deleJobById = function (data, callback) {
    var sql = "delete from job where job_id = ?;";
    Options(sql,data,callback);
}

// 更新该职位下的所有人的职位Id为NULL
exports.updatePerJobByJobId = function (data, callback) {
    var sql = "update person set job_id = null where person.job_id=?;";
    Options(sql,data,callback);
}

// 增加新人
exports.insertPerson=function(data,callback){
    var sql = "insert into person (per_id,name,gender,dept_id,job_id,photo) value(?,?,?,?,?,?);";
    Options(sql,data,callback);
}

// 找到所有的人
exports.findAllPerson = function (callback) {
    var sql = "select per_id,a.name,gender,b.dept_id,b.name as department,c.job_id,c.name as job,photo \
    from person as a left join department as b on a.dept_id = b.dept_id \
    left join job as c on a.job_id = c.job_id \
    order by per_id;"
    Search(sql,callback);
}

// 通过id和name找人
exports.findPersonByIdOrName = function (data, callback) {
    var sql = "select per_id,a.name,gender,b.dept_id,b.name as department,c.job_id,c.name as job,photo \
    from person as a join department as b on a.dept_id = b.dept_id \
    join job as c on a.job_id = c.job_id \
    where per_id = '"+data+"'\
    union \
    select per_id,a.name,gender,b.dept_id,b.name as department,c.job_id,c.name as job,photo \
    from person as a join department as b on a.dept_id = b.dept_id \
    join job as c on a.job_id = c.job_id \
    where a.name like '%"+data+"%';";
    Search(sql,callback);
}


//更新人员信息
exports.updatePersonById = function (data, callback){
    let photo=''
    if (data.length==7) {
        photo=",photo = ?"
    }
    var sql = "update person set per_id = ?, name = ?, gender = ?, dept_id = ?, job_id = ? "+photo+" where per_id=?;";
    Options(sql,data,callback);
}

//通过id删除人
exports.delePerById = function (data, callback) {
    var sql = "delete from person where per_id = ?;";
    Options(sql,data,callback);
}

//通过人id删除得奖信息
exports.delePriByPerId=function(data,callback){
    console.log('data',data);
    var sql = "delete from get_pri where per_id = ?;"
    Options(sql,data,callback);
}

//找到奖项中的所年份
exports.FindAllYear=function(callback){
    var sql = "select distinct year from prize ;";
    Search(sql,callback);
};

// 找到该年份下的所有奖项
exports.FindYearPrize=function(year,callback){
    var sql = "select distinct pri_id, desc_a, desc_b from prize where year='"+year +"' ;";
    Search(sql,callback);
};

// 通过id查找奖项
exports.FindPriById = function(id,callback){
    var sql = "select * from prize where pri_id = '"+id+"';";
    Search(sql,callback);
}


// 查找某个部门下之前得奖的人和未曾得奖的人
exports.FindDeptPreGetPriPer = function(data,callback){
    var sql = "select distinct a.per_id, a.name, a.gender, a.photo, 1 flag \
    from person as a  \
    where dept_id = '"+data.dept_id+"' and exists (\
    select b.pri_id from get_pri as b join prize as c on b.pri_id = c.pri_id \
    where a.per_id = b.per_id and c.desc_a = '"+data.desc_a+"' and c.desc_b = '"+data.desc_b+"') \
    and not exists (\
    select b.pri_id from get_pri as b\
    where a.per_id = b.per_id and b.pri_id = '"+data.pri_id+"')\
    union\
    select distinct a.per_id, a.name, a.gender, a.photo, 3 flag \
    from person as a join get_pri as b on a.per_id = b.per_id  \
    where dept_id = '"+data.dept_id+"' and b.pri_id = '"+data.pri_id+"'\
    union\
    select distinct a.per_id, a.name, a.gender, a.photo, 0 flag \
    from person as a left join get_pri as b on a.per_id = b.per_id  \
    where dept_id = '"+data.dept_id+"' and not exists (\
    select b.pri_id from get_pri as b join prize as c on b.pri_id = c.pri_id \
    where a.per_id = b.per_id and c.desc_a = '"+data.desc_a+"' and c.desc_b = '"+data.desc_b+"') \
    ";
    Search(sql,callback);
};

// 得奖
exports.insertPerPrize=function(data, callback){
    var sql = "insert into get_pri (per_id, pri_id) value(?,?);";
    Options(sql,data,callback);
};

// 删除得奖
exports.delePerPri = function(data, callback) {
    var sql = "delete from get_pri where per_id = ? and pri_id = ?;";
    Options(sql,data,callback);
}

// 新增得奖
exports.addPerPri = function(data, callback) {
    var sql = "insert into get_pri (per_id, pri_id) values(?,?);";
    Options(sql,data,callback);
}

//通过pri_id获得所有得奖的人
exports.getPerByPriId = function(pri_id, callback) {
    var sql = "select b.per_id, b.name, b.gender, b.photo, 3 flag \
    from get_pri as a join person as b on a.per_id = b.per_id \
    where a.pri_id = '"+pri_id+"';";
    Search(sql,callback);
}

exports.findprizeall = function(callback){
    var sql = "select * from prize";
    connection.query(sql,function(err, result){
        if(!err){
            var res = hasName(result);
            callback(res);
        }
        else{
            callback(error());
        }
    });
};

exports.FindOnePerson = function(name,callback){
    var sql = "select * from person where name ='"+name+"' ;";
    connection.query(sql,function(err,result){
        if(!err){
            var res = hasName(result);
            callback(res);
        }
        else{
            callback(error());
        }
    });

};



exports.FindPersonByNameOrId=function(data,callback){
     var sql = "select person.id,person.name,pic\
                from person\
                where id='"+data.data+"'and department ='"+data.department+"'\
                union\
                select person.id,person.name,pic\
                from person\
                where name like '%"+data.data+"%' and department ='"+data.department+"'\
                ORDER BY lpad(id,10,'0');";
                console.log(sql);
    connection.query(sql,function(err,result){
        if(!err){
            var res = hasName(result);
            callback(res);
        }
        else{
            callback(error());
        }
    });
};






exports.insertPerPrizes=function(prizes,callback){
    var sql = "insert into get_pri (id,year,desc_a,desc_b) value('"+prizes+"');"
    console.log('sql',sql)
    connection.query(sql,function(err,result){
        if(err){
            console.log('[Insert error] - ',err.message);
            return callback({err:1});
        }else{
            return callback({err:0});
        }
        console.log("----------------select----------");
        console.log(result);
        console.log("--------------------------------\n\n");
    });
};


exports.insert = function(table,param){
    var sql = "insert into "+table+"(name,type,content)values(?,?,?);";
    var addparam = param;
    console.log(addparam);
    connection.query(sql,addparam,function(err,result){
        if(err){
            console.log('[Insert error] - ',err.message);
            return;
        }
        console.log("----------------insert----------");
        console.log("insert id:",result);
        console.log("--------------------------------\n\n");
    });
};


exports.FindDepartment = function(callback){
    var sql = "select * from department order by post";
    connection.query(sql,function(err,result){
        if(!err){
            var res = hasName(result);
            callback(res);
        }
        else{
            callback(error());
        }
    });
};
exports.FindPosition = function(callback){
    var sql = "select * from job";
    connection.query(sql,function(err,result){
        if(!err){
            var res = hasName(result);
            callback(res);
        }
        else{
            callback(error());
        }
    });
};




