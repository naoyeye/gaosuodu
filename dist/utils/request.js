var _ = require('lodash');
var request = require('request');
var debug = require('debug')('RippleWeb:request');

var requestAsync = function (url, options) {
  var promise = new Promise(function (resolve, reject) {
    var startTime = new Date().getTime();

    var defaultOpt = {
      method: 'GET',
      url: url,
      gzip: true,
      forever: true,
      pool: {
        maxSockets: Infinity
      },
      timeout: 5000
    };

    if (!options) {
      options = defaultOpt;
    } else {
      options = _.extend(defaultOpt, options);
    }

    request(options, function (err, response, body) {
      debug(url + ' ' + (new Date().getTime() - startTime) + 'ms');
      if (!err && response.statusCode === 200) {
        resolve({
          err: err,
          response: response,
          body: body
        });
      } else {
        if (!err) {
          if (response.statusCode === 404) {
            err = new Error('Original API provider 404! ');
          } else {
            err = new Error('Original API provider exception! Original status: ' + response.statusCode);
          }
        }

        reject(err);
      }
    });
  });

  return promise;
};

module.exports = {
  async: requestAsync
};
