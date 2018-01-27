// 奖项编辑
$('.pri_edit').click(function(){
	console.log(this);
	let pri_id=$(this).data("pri_id");
	layer.open({
	  type: 1, 
	  title :'编辑奖项',
	  content: ' \
	  <div class="layui-col-md10">\
	   <form class="layui-form" id="editPrize" style="margin:20px" method="post" enctype="multipart/form-data">\
	    <div class="layui-form-item">\
	      <label class="layui-form-label">年份</label>\
	      <div class="layui-input-block">\
	        <input class="layui-input" id="pri_year" name="year" type="text" placeholder="year" value="'+$(this).data("year")+'"/>\
	      </div>\
	    </div>\
	    <div class="layui-form-item">\
	      <label class="layui-form-label">奖项</label>\
	      <div class="layui-input-block">\
	        <input class="layui-input" id="pri_prize" name="desc_a" type="text" placeholder="prize" value="'+$(this).data("desc_a")+'"/>\
	      </div>\
	    </div>\
	    <div class="layui-form-item">\
	      <label class="layui-form-label">奖项等级</label>\
	      <div class="layui-input-block">\
	        <input class="layui-input" id="pri_level" name="desc_b" type="text" placeholder="level" value="'+$(this).data("desc_b")+'"/>\
	      </div>\
	    </div>\
	  </form>\
	</div>', //这里content是一个普通的String
     btn: ['更改', '取消']
	  ,yes: function(index, layero){
	    let formData=new FormData(document.getElementById("editPrize"));
    	formData.append("pri_id", pri_id);
 		// ajax异步发送表单
	    let ajax=new XMLHttpRequest();

	    ajax.open("post",location.origin+"/manage/editPrize");// 设置路由
	    ajax.send(formData);// 发送

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                //解析返回数据
                let resData = JSON.parse(ajax.responseText);
                console.log(resData);
                //显示提示信息
                let mes = ''
                if (resData.state === 1) {
                    mes = "编辑成功！";
                     setTimeout("location.reload()",2000);
                } else {
                    mes = "编辑失败！";
                }
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(mes);
                });
            }
        }


	  }
	  ,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});

// 奖项删除
$('.pri_dele').click(function(){
	console.log(this);
	let pri_id=$(this).data("pri_id");
	layer.open({
	  	type: 0, 
	  	title :'删除确认',
	  	content: '即将删除奖项和获奖信息。删除操作不可恢复，确认删除？', //这里content是一个普通的String
     	btn: ['确认', '取消'],
	  	yes: function(index, layero){
		    let formData=new FormData();
	    	formData.append("pri_id", pri_id);

	 		// ajax异步发送表单
		    let ajax=new XMLHttpRequest();
		    ajax.open("post",location.origin+"/manage/delePrize");// 设置路由
		    ajax.send(formData);// 发送
	        ajax.onreadystatechange = function () {
	            if (ajax.readyState === 4 && ajax.status === 200) {
	                //解析返回数据
	                let resData = JSON.parse(ajax.responseText);
	                console.log(resData);
	                //显示提示信息
	                let mes = ''
	                if (resData.state === 1) {
	                    mes = "删除成功！";
	                     setTimeout("location.reload()",2000);
	                } else {
	                    mes = "删除失败！";
	                }
	                layui.use('layer', function () {
	                    var layer = layui.layer;
	                    layer.msg(mes);
	                });
	            }
	        }
		}
	  	,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});

// 新增部门
$('#dept_submit').click(function(){// 事件监听
	let formData=new FormData(document.getElementById("newdepartment"));
	console.log('formData2');
    // ajax异步发送表单
    let ajax=new XMLHttpRequest();

    ajax.open("post",location.origin+"/manage/addDeparment");// 设置路由
    ajax.send(formData);// 发送
    ajax.onreadystatechange = function () {
    	if (ajax.readyState === 4 && ajax.status === 200) {
            //解析返回数据
            let resData = JSON.parse(ajax.responseText);
            console.log(resData);
            //显示提示信息
            let mes = ''
            if (resData.state === 1) {
            	mes = "新增成功！";
            	setTimeout("location.reload()",1000);
            } else {
            	mes = "新增失败！可能存在同名部门";
            }
            layui.use('layer', function () {
            	var layer = layui.layer;
            	layer.msg(mes);
            });
        }
    }
});

//新增职位
$('#job_submit').click(function(){// 事件监听
    let formData=new FormData(document.getElementById("newposition"));
    console.log('formData2');
    // ajax异步发送表单
    let ajax=new XMLHttpRequest();

      ajax.open("post",location.origin+"/manage/addJob");// 设置路由
      ajax.send(formData);// 发送

      ajax.onreadystatechange = function () {
      	if (ajax.readyState === 4 && ajax.status === 200) {
            //解析返回数据
            let resData = JSON.parse(ajax.responseText);
            console.log(resData);
            //显示提示信息
            let mes = ''
            if (resData.state === 1) {
            	mes = "新增成功！";
            	setTimeout("location.reload()",1000);
            } else {
            	mes = "新增失败！可能存在同名职位";
            }
            layui.use('layer', function () {
            	var layer = layui.layer;
            	layer.msg(mes);
            });
        }
    }
});

// 部门编辑
$('.dept_edit').click(function(){
	console.log(this);
	let dept_id=$(this).data("dept_id");
	layer.open({
	  type: 1, 
	  title :'编辑部门',
	  content: ' \
	  <form class="layui-form" id="editDepartment" style="margin:20px" method="post" enctype="multipart/form-data">\
	    <div class="layui-form-item">\
	      <label class="layui-form-label">部门</label>\
	      <div class="layui-input-block">\
	        <input class="layui-input" id="department" name="name" type="text" placeholder="department" value="'+$(this).data("name")+'"/>\
	      </div>\
	    </div>\
	  </form>', //这里content是一个普通的String
     btn: ['更改', '取消']
	  ,yes: function(index, layero){
	    let formData=new FormData(document.getElementById("editDepartment"));
    	formData.append("dept_id", dept_id);
 		// ajax异步发送表单
	    let ajax=new XMLHttpRequest();

	    ajax.open("post",location.origin+"/manage/editDepartment");// 设置路由
	    ajax.send(formData);// 发送

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                //解析返回数据
                let resData = JSON.parse(ajax.responseText);
                console.log(resData);
                //显示提示信息
                let mes = ''
                if (resData.state === 1) {
                    mes = "编辑成功！";
                     setTimeout("location.reload()",1000);
                } else {
                    mes = "编辑失败！";
                }
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(mes);
                });
            }
        }


	  }
	  ,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});
// 部门删除
$('.dept_dele').click(function(){
	let dept_id=$(this).data("dept_id");
	layer.open({
	  	type: 0, 
	  	title :'删除确认',
	  	content: '即将删除部门及变更该部门下人员信息。删除操作不可恢复，确认删除？', //这里content是一个普通的String
     	btn: ['确认', '取消'],
	  	yes: function(index, layero){
		    let formData=new FormData();
	    	formData.append("dept_id", dept_id);

	 		// ajax异步发送表单
		    let ajax=new XMLHttpRequest();
		    ajax.open("post",location.origin+"/manage/deleDepartment");// 设置路由
		    ajax.send(formData);// 发送
	        ajax.onreadystatechange = function () {
	            if (ajax.readyState === 4 && ajax.status === 200) {
	                //解析返回数据
	                let resData = JSON.parse(ajax.responseText);
	                console.log(resData);
	                //显示提示信息
	                let mes = ''
	                if (resData.state === 1) {
	                    mes = "删除成功！";
	                     setTimeout("location.reload()",1000);
	                } else {
	                    mes = "删除失败！";
	                }
	                layui.use('layer', function () {
	                    var layer = layui.layer;
	                    layer.msg(mes);
	                });
	            }
	        }
		}
	  	,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});

// 职位编辑
$('.job_edit').click(function(){
	console.log(this);
	let job_id=$(this).data("job_id");
	layer.open({
	  type: 1, 
	  title :'编辑部门',
	  content: ' \
	  <form class="layui-form" id="editJob" style="margin:20px" method="post" enctype="multipart/form-data">\
	    <div class="layui-form-item">\
	      <label class="layui-form-label">职位</label>\
	      <div class="layui-input-block">\
	        <input class="layui-input" id="position" name="name" type="text" placeholder="job" value="'+$(this).data("name")+'"/>\
	      </div>\
	    </div>\
	  </form>', //这里content是一个普通的String
     btn: ['更改', '取消']
	  ,yes: function(index, layero){
	    let formData=new FormData(document.getElementById("editJob"));
    	formData.append("job_id", job_id);
 		// ajax异步发送表单
	    let ajax=new XMLHttpRequest();

	    ajax.open("post",location.origin+"/manage/editJob");// 设置路由
	    ajax.send(formData);// 发送

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                //解析返回数据
                let resData = JSON.parse(ajax.responseText);
                console.log(resData);
                //显示提示信息
                let mes = ''
                if (resData.state === 1) {
                    mes = "编辑成功！";
                     setTimeout("location.reload()",1000);
                } else {
                    mes = "编辑失败！";
                }
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(mes);
                });
            }
        }


	  }
	  ,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});

// 职位删除
$('.job_dele').click(function(){
	let job_id=$(this).data("job_id");
	layer.open({
	  	type: 0, 
	  	title :'删除确认',
	  	content: '即将删除职位及变更该职位下人员信息。删除操作不可恢复，确认删除？', //这里content是一个普通的String
     	btn: ['确认', '取消'],
	  	yes: function(index, layero){
		    let formData=new FormData();
	    	formData.append("job_id", job_id);

	 		// ajax异步发送表单
		    let ajax=new XMLHttpRequest();
		    ajax.open("post",location.origin+"/manage/deleJob");// 设置路由
		    ajax.send(formData);// 发送
	        ajax.onreadystatechange = function () {
	            if (ajax.readyState === 4 && ajax.status === 200) {
	                //解析返回数据
	                let resData = JSON.parse(ajax.responseText);
	                console.log(resData);
	                //显示提示信息
	                let mes = ''
	                if (resData.state === 1) {
	                    mes = "删除成功！";
	                     setTimeout("location.reload()",1000);
	                } else {
	                    mes = "删除失败！";
	                }
	                layui.use('layer', function () {
	                    var layer = layui.layer;
	                    layer.msg(mes);
	                });
	            }
	        }
		}
	  	,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});

// 找人
$('.search_per_bu').click(function(){
	console.log($('.search_per_val').val());
	if($('.search_per_val').val()===''){

		return layui.use('layer', function () {
	        var layer = layui.layer;
	        layer.msg('请填写输入框！');
	    });
	}
	// ajax异步发送表单
	let ajax=new XMLHttpRequest();
	ajax.open("get",location.origin+"/manage/searchPer?data="+$('.search_per_val').val());// 设置路由
	ajax.send();// 发送
	ajax.onreadystatechange = function () {
		if (ajax.readyState === 4 && ajax.status === 200) {
	        //解析返回数据
	        let resData = JSON.parse(ajax.responseText);
	        console.log(resData);

	        $('.search_per_data').empty();
	        $('.search_per_data').append('<blockquote class="layui-elem-quote">查找结果</blockquote>');
	        if(resData.length&&resData.length>0){
	        	let inserData = '\
	        		<table class="layui-table">\
				      <colgroup>\
				        <col width="100">\
				        <col width="100">\
				        <col width="100">\
				        <col width="100">\
				        <col width="100">\
				        <col >\
				        <col width="200">\
				      </colgroup>\
				      <thead>\
				        <tr>\
				          <th>id</th>\
				          <th>姓名</th>\
				          <th>性别</th>\
				          <th>部门</th>\
				          <th>职位</th>\
				          <th>照片</th>\
				          <th>操作</th>\
				        </tr>\
				      </thead>\
	        		';
	        	for(let i=0;i<resData.length;i++){
					inserData += '\
						 <tbody>\
				            <tr>\
				              <th>'+resData[i].per_id+'</th>\
				              <th>'+resData[i].name+'</th>\
				              <th>'+resData[i].gender+'</th>\
				              <th>'+resData[i].department+'</th>\
				              <th>'+resData[i].job+'</th>\
				              <th class="per_photo" data-photo="'+resData[i].photo+'">'+resData[i].photo+'</th>\
				              <th>\
				              	<button class="layui-btn per_edit" data-per_id="'+resData[i].per_id+'">编辑</button>\
                				<button class="layui-btn layui-btn-danger per_dele" data-per_id="'+resData[i].per_id+'">删除</button>\
				              </th>\
				            </tr> \
				          </tbody>\
						';
	        	}
	        	inserData += ' </table>';
	        	$('.search_per_data').append(inserData)
	        }else{
	        	$('.search_per_data').append('<div>无结果</div>')
	        }
	    }
	}	
});

//图片预览
$("body").undelegate();
$("body").delegate(".per_photo", "click", function(){
	console.log($(this).data("photo"));
	layer.closeAll('page');
	layer.open({
	  type: 1, 
	  title:'图片预览',
	  shade: 0,
	  content: '<img src="/image/headers/'+$(this).data("photo")+'">'//这里content是一个普通的String
	});
});

//人员编辑
$("body").delegate(".per_edit", "click", function() {
	console.log(this);
	let per_id=$(this).data("per_id");

	// ajax异步发送表单
	let ajax=new XMLHttpRequest();
	ajax.open("get",location.origin+"/manage/getAllDeptJob");// 设置路由
	ajax.send();// 发送
	ajax.onreadystatechange = function () {
	    if (ajax.readyState === 4 && ajax.status === 200) {
            //解析返回数据
            let resData = JSON.parse(ajax.responseText);
            console.log(resData);

            let departments='';
            let jobs='';

            for(let i=0;i<resData.departments.length;i++){
            	departments+='<option value="'+resData.departments[i].dept_id+'">'+resData.departments[i].dept_id+'</option>'
            }

            for(let i=0;i<resData.jobs.length;i++){
            	jobs+='<option value="'+resData.jobs[i].dept_id+'">'+resData.jobs[i].dept_id+'</option>'
            }
			layer.open({
			  	type: 2, 
			  	title :'编辑人员信息',
			  	area: ['800px', '600px'],
			  	content: '/manage/eidtOnePer?per_id='+per_id, //这里content是一个普通的String
			  	end:function(){
			  		 setTimeout("location.reload()",1);
			  	}
			});     


        }
    }
})

// 人员删除
$("body").delegate(".per_dele","click",function(){
	console.log(this);
	let per_id=$(this).data("per_id");
	layer.open({
	  	type: 0, 
	  	title :'删除确认',
	  	content: '即将删除人员和获奖信息。删除操作不可恢复，确认删除？', //这里content是一个普通的String
     	btn: ['确认', '取消'],
	  	yes: function(index, layero){
		    let formData=new FormData();
	    	formData.append("per_id", per_id);

	 		// ajax异步发送表单
		    let ajax=new XMLHttpRequest();
		    ajax.open("post",location.origin+"/manage/delePerson");// 设置路由
		    ajax.send(formData);// 发送
	        ajax.onreadystatechange = function () {
	            if (ajax.readyState === 4 && ajax.status === 200) {
	                //解析返回数据
	                let resData = JSON.parse(ajax.responseText);
	                console.log(resData);
	                //显示提示信息
	                let mes = ''
	                if (resData.state === 1) {
	                    mes = "删除成功！";
	                     setTimeout("location.reload()",2000);
	                } else {
	                    mes = "删除失败！";
	                }
	                layui.use('layer', function () {
	                    var layer = layui.layer;
	                    layer.msg(mes);
	                });
	            }
	        }
		}
	  	,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
});