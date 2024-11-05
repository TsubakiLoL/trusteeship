var floatingWindow = document.createElement('div');
floatingWindow.style.position = 'absolute';
floatingWindow.style.zIndex = 999999;
floatingWindow.style.width = '1152px';
floatingWindow.style.height = '648px';
floatingWindow.style.border = '1px solid #000'; // 可选，添加边框以便于看到悬浮窗
floatingWindow.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 可选，设置背景颜色

floatingWindow.addEventListener('mousedown', function(e) {
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

var el = document.createElement('iframe');
el.src = "https://like.tsubaki.fun";
el.width = "1152px";
el.height = "648px";
el.style.border = 'none'; 

floatingWindow.appendChild(el);

document.body.appendChild(floatingWindow);
