var path = require('path');
var http = require('http');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');
var writer = require('./htmlwriter');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  writer.addUrl('example8.com');

  if (req.method === 'GET'){
    var parts = url.parse(req.url);
    var urlName = parts.pathname === '/' ? '/index.html' : parts.pathname;
    var moddedUrl = urlName.slice(1);
    //Once we have pathname
    //if one of the static, go to public
    if (urlName === '/index.html' || urlName === '/loading.html' || urlName === '/styles.css'){
      urlName = archive.paths['siteAssets'] + urlName;
      httpHelp.serveAssets(res, urlName, function(err, data){
        httpHelp.serveCb(err, data, res, 'text/html');
      });
    }
    else if (fetcher.checkUrl(moddedUrl)) {
      urlName = archive.paths['archivedSites'] + urlName;
      httpHelp.serveAssets(res, urlName, function(err, data){
        httpHelp.serveCb(err, data, res, 'text/html');
      });
    } else {
      res.writeHead(404, exports.headers);
      res.end();
    }
  }

  if(req.method === 'POST'){

  }

};
