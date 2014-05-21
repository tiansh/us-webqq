// ==UserScript==
// @name        Web QQ Auto Max Window
// @namespace   https://github.com/tiansh
// @include     http://web*.qq.com/webqq.html
// @include     https://web*.qq.com/webqq.html
// @version     1.2
// @copyright   CC-BY-SA 3.0 / GNU GPL v3
// @author      田生
// @grant       none
// ==/UserScript==

setInterval(function () {
  var m = document.querySelector('.window_max:not([auto_max_done])');
  m.setAttribute('auto_max_done', 'auto_max_done');
  try { m.click(); } catch (e) {
    var event = document.createEvent("MouseEvents"); 
    event.initEvent('click', true, true); 
    m.dispatchEvent(event); 
  }
}, 20);

