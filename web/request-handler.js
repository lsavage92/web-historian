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
      httpHelp.headers['Content-Type'] = 'text/html';
      res.write(data);
      res.end();
    });
  }
  if (req.method === 'GET' && req.url === '/styles.css'){
    httpHelp.serveAssets(res, archive.paths['css'], function(err, data){ // Refactor GET request to be more DRY
      httpHelp.headers['Content-Type'] = 'text/css';
      res.write(data);
      res.end();
    });
  }
  if (req.method === 'GET' && req.url === '/loading.html'){
    httpHelp.serveAssets(res, archive.paths['loading'], function(err, data){
      httpHelp.headers['Content-Type'] = 'text/html';
      res.write(data);
      res.end();
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
