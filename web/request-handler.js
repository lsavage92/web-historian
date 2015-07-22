var path = require('path');
var http = require('http');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fetcher.checkUrl('example8.com'); // TODO: delete this test function
  if(req.method === 'GET'){
    res.writeHead(200, httpHelp.headers);
  }
  //is it archived already?
    //Give the page
  //else
    //archive it
    //serve page
  console.log(archive.paths.list);
  res.end(archive.paths.list);
};
