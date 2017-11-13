 $(function () {
//改过js 原本没有info数组 加上info数组的想法是要输出所有从manage传过来的指令（包括历史）
//若要将显示改成划屏形式则可以采用这种
    var info = new Array();       
    // 字符串
    console.log(location.search);
    var n = location.search.slice(1).split('=')[1];

    var pic = $('#pic');
    var text = $('#text');
    //建立websocket连接
    socket = io.connect('http://192.168.31.226:3001');//把这个从localhost改成相应的ip号即可

    //收到server的连接确认
    socket.on('open',function(){
        //监听system事件，判断welcome或者disconnect，打印系统消息信息
        socket.on('system',function(res){
            console.log(res);
            console.log("res长度"+res.length);            
            info.push(res);
            console.log("数字"+info.length);
//            info.push(res);
//            for(var i=0;i<info.length;i++)
//            content.html(''+info[i].pic);
            if(res.picname=='rblue.jpg'){
                pic.html("<div id='nothave'>"+res.pic+"</div>");
            }else{
                text.html(res.name+"<br/>"+res.department+"<br/>");
                pic.html(res.pic);
            }
            
        });

        socket.send(n);
    });

});