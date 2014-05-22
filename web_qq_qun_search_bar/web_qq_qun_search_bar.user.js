// ==UserScript==
// @name        Web QQ Qun Search Bar
// @namespace   https://github.com/tiansh
// @description Web QQ群的右侧加个搜索框
// @include     http://web*.qq.com/webqq.html
// @include     https://web*.qq.com/webqq.html
// @version     1.3
// @grant       GM_addStyle
// @updateURL   https://tiansh.github.io/us-webqq/web_qq_qun_search_bar/web_qq_qun_search_bar.meta.js
// @downloadURL https://tiansh.github.io/us-webqq/web_qq_qun_search_bar/web_qq_qun_search_bar.user.js
// ==/UserScript==


GM_addStyle([
  '.chatBox_groupMember_mainArea { top: 40px !important; }',
  '.chatBox_groupMember_searchBar ',
  '{ border: 0 none; height: 18px; padding: 1px 0; width: 100%; ',
  'background: #E8F6FB; }'
].join(''));

var addSearchBar = function () {
  var PLACEHOLDER = '搜索成员……';
  var rl = document.querySelectorAll('.chatBox_groupMember'), i;
  var subStrI = function (s, t) {
    return s.toUpperCase().indexOf(t.toUpperCase()) !== -1;
  }
  for (i = 0; i < rl.length; i++) 
   if (!rl[i].querySelector('.chatBox_groupMember_searchBar'))
   ((function (id) {
     var s = document.createElement('div');
     var l = document.querySelector('#chatBox_groupMember_' + id);
     s.innerHTML = [
       '<input class="chatBox_groupMember_searchBar" ',
         'id="chatBox_groupMember_searchBar_', id, '" ',
         'placeholder="', PLACEHOLDER, '"',
       '/>',
     ].join('');
     s = s.firstChild;
     var f = function () {
       var text = document
         .querySelector('#chatBox_groupMember_searchBar_' + id).value;
       var list = document
         .querySelectorAll('#chatBox_groupMember_mainArea_' + id +
           ' div[uin]');
       var name, nick;
       for (i = 0; i < list.length; i++) {
         name = list[i].querySelector('.chatBox_groupMember_nameArea').title;
         nick = list[i].querySelector('.chatBox_groupMember_nick').innerHTML;
         list[i].style.display = subStrI(name, text) || subStrI(nick, text) ? 'block': 'none';
       }
     };
     s.addEventListener('change', f);
     s.addEventListener('keyup', f);
     s.addEventListener('keypress', f);
     s.addEventListener('keydown', f);
     l.insertBefore(s, l.querySelector('.chatBox_groupMember_mainArea'));
   })(Number(rl[i].id.replace(/[^0-9]*/g, ''))));
}

setInterval(addSearchBar, 10);


