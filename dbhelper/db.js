var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'19970420',
    database:'medal'
});
connection.connect();

function hasName(result){
    if(result.length==0){
        return{
            err:1,
            msg:"内容不存在"
        };
    }
    else{
        return result;
    }
}

function error(){
    return{
        err:1,
        msg:"出错"
    };
}
//查全部
exports.select = function(table){

    var sql ="select * from "+table+";";
    connection.query(sql,function(err,result){
        if(err){
            console.log('[Insert error] - ',err.message);
            return;
        }
        console.log("----------------select----------");
        console.log(result);
        console.log("--------------------------------\n\n");
    });
};
//认为每一个名字都唯一
exports.GetName = function(name,callback){

    var sql = "select * from example where name = '"+name+"';";
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
exports.FindAll = function(callback){
    var sql = "select * from example;";
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
exports.FindYear = function(callback){
    var sql = "select distinct year from prize;";
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
exports.FindItem = function(year,callback){
    var sql = "select distinct item from prize where year='"+year+"';";
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
exports.FindPrize = function(year,item,callback){
    var sql = "select distinct detail from prize where year='"+year+"'and item = '"+item+"';";
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
exports.FindPerson = function(year,item,detail,callback){
    var sql = "select person.id,person.name,person.gender,person.department,person.pic from person join per_pri on person.id = per_pri.id where per_pri.year='"+year+"' and per_pri.item='"+item+"'and per_pri.detail='"+detail+"';";
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
exports.CountNum = function(year,item,detail,callback){
    var sql = "select count(*) as num from person join per_pri on person.id = per_pri.id where per_pri.year='"+year+"' and per_pri.item='"+item+"'and per_pri.detail='"+detail+"';";
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
exports.FindAllPrize = function(year,callback){
    var sql = "select * from prize where year='"+year+"';";
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
exports.FindDepartmentPerson = function(data,callback){
    var sql = "select person.id,person.name,pic,'1' prize \
    from person left join per_pri on person.id = per_pri.id \
    where year < '"+data.year+"' and item='"+data.item+"' and detail ='"+data.detail+"'and department ='"+data.department+"' \
    union \
    select * \
    from (select person.id,person.name,pic,'0' prize \
            from person left join per_pri on person.id = per_pri.id \
            where (item!='"+data.item+"' or detail !='"+data.detail+"' or item is null or detail is null) and department ='"+data.department+"') t \
        where id not in (select person.id \
        from person left join per_pri on person.id = per_pri.id \
        where year <= '"+data.year+"' and item='"+data.item+"' and detail ='"+data.detail+"'and department ='"+data.department+"') \
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
exports.FindeRrizeYear=function(callback){
    var sql = "select distinct year from prize ;";
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
exports.FindYearPrize=function(year,callback){
    var sql = "select distinct item,detail from prize where year='"+year +"' ;";
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

exports.FindAllDeptment=function(callback){
    var sql = "select distinct department,lpad(department,4,'0') as num from person order by lpad(department,4,'0');";
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




exports.insertPerPrize=function(prize,callback){
    var sql = "insert into per_pri (id,year,item,detail) value('"+prize[0]+"','"+prize[1]+"','"+prize[2]+"','"+prize[3]+"');"
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

exports.insertPerPrizes=function(prizes,callback){
    var sql = "insert into per_pri (id,year,item,detail) value('"+prizes+"');"
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

exports.insertPerson=function(person,callback){
    var sql = "insert into person (id,name,gender,department,position,pic) value('"+person[0]+"','"+person[1]+"','"+person[2]+"','"+person[3]+"','"+person[4]+"','"+person[5]+"');"
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
}

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

exports.FindPersonPrize = function(id,callback){

    var sql = "select * from person left join per_pri on person.id = per_pri.id where person.id = '"+id+"';";
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
    var sql = "select * from position";
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

exports.insertPrize=function(Prize,callback){
    var sql = "insert into prize (year,item,detail) value(?,?,?);"
    connection.query(sql,Prize,function(err,result){
        if(err){
            console.log('[Insert error] - ',err.message);
            return;
        }
        console.log("----------------insert----------");
        console.log("insert id:",result);
        console.log("--------------------------------\n\n");
    });
}

exports.insertDepartment=function(department,callback){
    var sql = "insert into department (post) value(?);"
    connection.query(sql,department,function(err,result){
        if(err){
            console.log('[Insert error] - ',err.message);
            return;
        }
        console.log("----------------insert----------");
        console.log("insert id:",result);
        console.log("--------------------------------\n\n");
    });
}

exports.insertPosition=function(position,callback){
    var sql = "insert into position (job) value('"+position+"');"
    connection.query(sql,position,function(err,result){
    if(err){
        console.log('[Insert error] - ',err.message);
        return;
    }
    console.log("----------------insert----------");
    console.log("insert id:",result);
    console.log("--------------------------------\n\n");
    });
}
exports.findprizeall = function(callback){
    var sql = "select * from prize";
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