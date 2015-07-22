var path = require('path');
var http = require('http');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fetcher.read(); // TODO: delete this test function
  if(req.method === 'GET'){
    res.writeHead(200, httpHelp.headers);
    console.log("Got it!");
  }
  //is it archived already?
    //Give the page
  //else
    //archive it
    //serve page
  console.log(archive.paths.list);
  res.end(archive.paths.list);
};
