/* 
* @Author: Jiyun
* @Date:   2016-05-05 16:32:13
* @Last Modified by:   Jiyun
* @Last Modified time: 2016-05-05 17:05:07
*/

'use strict';

$(document).ready(function() {
  $('#wall').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    // other options
    gallery: {
      enabled: true
    },
    image: {
      titleSrc: function(item) {
        var arr = item.el.attr('title').split('|');
        var obj = {
          'title': arr[0],
          'material': arr[1],
          'size': arr[2],
          'date': arr[3],
        }
        return '<ul><li class="work-title">' + obj.title + '</li><li>' + obj.material + '</li><li>' + obj.size + '</li><li>' + obj.date + '</li></ul>';
      }
    }
  });
});