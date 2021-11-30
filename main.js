/**
 * 作者：粥蛋
 * 日期：2021-11-27
 * 版本：1.2
 */

import "./style.css";

console.log("粥蛋出品 必属牛逼");

let sun = document.getElementById("sun");
let sun_text = document.getElementById("text-sun");
let window_width = window.innerWidth;
let last_x = 0;
let start_x = 0;

/**
 * 触摸开始前记录触摸开始位置
 */
window.ontouchstart = (e) => {
  start_x = e.changedTouches[0].clientX;
};

/**
 * 计算变化值并赋值到clip-path
 */
window.addEventListener(
  "touchmove",
  (e) => {
    setClipPx(last_x + start_x - e.changedTouches[0].clientX);
    e.preventDefault();
  },
  { passive: false }
);

/**
 * 触摸结束记录结束的位置
 * 注意浏览器默认的简写css
 */
window.ontouchend = (_) => setLastX();

/**
 * 赋值到clip-path
 */
function setClipPx(percent) {
  if (percent < 0) {
    percent = 0;
  } else if (percent > window_width) {
    percent = window_width;
  }
  let css = `inset(0px ${percent}px 0px 0px)`;
  sun.style.clipPath = css;
  sun_text.style.clipPath = css;
}

/**
 * 屏幕窗口变化及时调整窗口宽度
 */
window.onresize = (_) => (window_width = window.innerWidth);

/**
 * PC端 鼠标指针移动事件
 */
window.onmousemove = (e) => setClipPx(window_width - e.x);

window.onmouseup = (_) => setLastX();

function setLastX() {
  let clip_path = sun.style.clipPath;
  if (!clip_path || clip_path.split(" ").length != 4) {
    last_x = 0;
  } else {
    last_x = parseFloat(clip_path.split(" ")[1].replace("px", ""));
  }
}
