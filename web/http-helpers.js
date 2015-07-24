var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(asset, 'utf8', callback);
};

exports.serveArchive = function(){};

exports.serveCb = function(err, data, res, type){
  //httpHelp.serveAssets(res, archive.paths['index'], function(err, data){
    exports.headers['Content-Type'] = type;
    res.writeHead(200, exports.headers);
    res.write(data);
    res.end();
  //});
};

exports.sendResponse = function(res, loc, status){
  status = status || 302;
  res.writeHead(status, {Location: loc});
  res.end();
};

exports.collectData = function(req, callback){
  var data = '';
  req.on('data', function(frame){
    data += frame;
  });
  req.on('end', function(){
    callback(data);
  });
}
// As you progress, keep thinking about what helper functions you can put here!
