
var floatingWindow = document.createElement('div');
floatingWindow.style.position = 'absolute';
floatingWindow.style.zIndex = 999999;
floatingWindow.style.width = '1152px';
floatingWindow.style.height = '648px';
floatingWindow.style.border = '1px solid #000'; // 可选，添加边框以便于看到悬浮窗
floatingWindow.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 可选，设置背景颜色

var dragBar = document.createElement('div');
dragBar.style.width = '100%';
dragBar.style.height = '30px'; 
dragBar.style.backgroundColor = '#333'; // 可以根据需要调整颜色
dragBar.style.cursor = 'move'; // 设置鼠标样式为可移动

// 使拖动条可拖动
dragBar.addEventListener('mousedown', function(e) {
  var offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
  var offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
  
  function mouseMoveHandler(e) {
    floatingWindow.style.left = (e.clientX - offsetX) + 'px';
    floatingWindow.style.top = (e.clientY - offsetY) + 'px';
  }
  
  function mouseUpHandler() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }
  
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

// 将拖动条添加到悬浮窗容器中
floatingWindow.appendChild(dragBar);

// 创建iframe
var el = document.createElement('iframe');
el.src = "https://like.tsubaki.fun";
el.width = "1152px";
el.height = "648px";
el.style.border = 'none'; // 移除iframe的边框
el.style.position = 'absolute'; // 设置iframe为绝对定位
el.style.top = '30px'; // 将iframe下移，避免覆盖拖动条

// 将iframe添加到悬浮窗容器中
floatingWindow.appendChild(el);

// 将悬浮窗容器添加到文档body中
document.body.appendChild(floatingWindow);

