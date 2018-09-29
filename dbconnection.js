/*
* @Author: hanjiyun
* @Date:   2018-07-21 19:16:08
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-09-06 21:22:06
*/

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'xxxx',
  user     : 'user',
  password : 'password',
  database : 'database'
});

connection.connect();

module.exports = connection;