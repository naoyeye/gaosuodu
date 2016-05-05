/* 
* @Author: Jiyun
* @Date:   2015-12-11 17:22:17
* @Last Modified by:   Jiyun
* @Last Modified time: 2016-05-05 14:34:00
*/

module.exports = function (req, res, next) {
  res.render('index', {
    currentPage: 1,
  });
};
