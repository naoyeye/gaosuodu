/* 
* @Author: Jiyun
* @Date:   2016-05-04 18:07:59
* @Last Modified by:   Jiyun
* @Last Modified time: 2016-05-05 14:04:25
*/

console.log('hello world!');

$(function () {

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
    preloadImages: false,
    lazyLoading: true,
    keyboardControl: true,
    
    // If we need pagination
    pagination: '.swiper-pagination',
    
    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // And if we need scrollbar
    // scrollbar: '.swiper-scrollbar',
  })
})