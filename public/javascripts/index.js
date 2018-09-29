/*
* @Author: Jiyun
* @Date:   2016-05-04 18:07:59
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-09-29 14:13:45
*/

console.log('hello world!');

$(function () {

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
    preloadImages: false,
    lazy: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: '.swiper-scrollbar',
  })
})
