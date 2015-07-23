var path = require('path');
var http = require('http');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');
var writer = require('./htmlwriter');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //writer.addUrl('example8.com'); // TODO: delete this test function
  //console.log(fetcher.checkUrl('example8.com'));
  if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, httpHelp.headers);
    httpHelp.serveAssets(res, archive.paths['index'], function(err, data){
      res.end(data);
    });
  }
  //is it archived already?
    //Give the page
  //else
    //archive it
    //serve page
  //console.log(archive.paths.list);
  //res.end(archive.paths.list);
};
