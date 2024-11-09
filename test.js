
if(typeof IIROSE_WPM_MES_FINISH === 'undefined'){
	eval(`
var IIROSEAPI={
	//域名-window的对应字典
	domin_window_dic:{},
	send_room_message:(msg)=>{
		let msg_json = {
			"m": msg.toString(),
			"mc": inputcolorhex,
			"i": Math.random().toString().slice(2, 14)
		};
		socket.send(JSON.stringify(msg_json))
	},
	send_bullet_message:(msg)=>{
		//~{"t":"(消息内容)","c":"(消息颜色)","v":0}
		let msg_json = {
			"t": msg.toString(),
			"c": inputcolorhex,
			"v": 0
		};
		socket.send("~"+JSON.stringify(msg_json))
	},
	send_private_message:(msg,uid)=>{
		//{"g":"(接受者用户唯一标识)","m":"(消息内容)","mc":"(消息颜色)","i":"(随机数)"}
		let msg_json = {
			"g": uid.toString,
			"m": msg.toString(),
			"mc": inputcolorhex,
			"i": Math.random().toString().slice(2, 14)
		};
		socket.send(JSON.stringify(msg_json))
		
	},
	send_origin_message:(msg)=>{
		socket.send(msg);	
	},
	//添加win监听
	add_new_plugin:(domin_name,win)=>{
		IIROSEAPI.domin_window_dic[domin_name]=win
	},
}
function proxyFunction (targetFunction, callback) {
	return ((...param) => {
		if (callback(param, targetFunction) !== true)
			return targetFunction(...param)
	});
}

window.addEventListener('message', (event)=>{
		var data_string=event.data;
		if(data_string.substr(0, 4) == "send"){  
   	 		var msg=data_string.substr(4,data_string.length);
			IIROSEAPI.send_origin_message(msg);
		}
});
function message_get(p){
	for (const [key, value] of Object.entries(IIROSEAPI.domin_window_dic)) {
		var domin=key;
		var win=value;
		win.postMessage(p.toString(),domin);
	}
}

socket._onmessage = proxyFunction(socket._onmessage.bind(socket), async (p) => {message_get(p)});

//脚本装载完成标志
var IIROSE_WPM_MES_FINISH=true
//IIROSEAPI.send_bullet_message("test");
`)
}

async function start(){
  while(typeof IIROSE_WPM_MES_FINISH === 'undefined'){
	console.log("阻塞中")
 }
  var domin_name="http://js.tsubaki.fun"
  var floatingWindow = document.createElement('div');
  floatingWindow.style.position = 'absolute';
  floatingWindow.style.zIndex = 999999;
  floatingWindow.style.width = '1152px';
  floatingWindow.style.height = '748px';
  floatingWindow.style.border = '1px solid #000'; // 可选，添加边框以便于看到悬浮窗
  floatingWindow.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 可选，设置背景颜色


   //创建iframe
  var el = document.createElement('iframe');
  el.src = domin_name;
  el.width = "100%";
  el.height = "90%";
  el.top="10%";
  el.style.border = 'none'; // 移除iframe的边框
  el.style.position = 'absolute'; // 设置iframe为绝对定位
  el.allowfullscreen="true";

  var dragBar = document.createElement('div');
  dragBar.style.width = '100%';
  dragBar.style.height = '10%'; 
  dragBar.style.backgroundColor = '#333'; // 可以根据需要调整颜色
  dragBar.style.cursor = 'move'; // 设置鼠标样式为可移动
  dragBar.style.zIndex=100;
  // 使拖动条可拖动
  dragBar.addEventListener('mousedown', function(e) {
	var offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
	var offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
	const mouseMoveHandler=(e)=>{
		
	  floatingWindow.style.left = (e.clientX - offsetX) + 'px';
	  floatingWindow.style.top = (e.clientY - offsetY) + 'px'; 
	}
  
	const mouseUpHandler=()=>{
		
	  document.removeEventListener('mousemove', mouseMoveHandler, { passive: false });
	  document.removeEventListener('mouseup', mouseUpHandler, { passive: false });

	}
  
	document.addEventListener('mousemove', mouseMoveHandler, { passive: false });
	document.addEventListener('mouseup', mouseUpHandler, { passive: false });
  ;
  });
  
  // 将拖动条添加到悬浮窗容器中
  floatingWindow.appendChild(dragBar);
  dragBar.setAttribute('draggable', 'false');


  
  // 将iframe添加到悬浮窗容器中
  floatingWindow.appendChild(el);
  floatingWindow.setAttribute('draggable', 'false');

  // 将悬浮窗容器添加到文档body中
  document.body.appendChild(floatingWindow);
  //添加监听
  
  IIROSEAPI.add_new_plugin(domin_name,el.contentWindow);

}

start()
