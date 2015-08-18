var path = require('path');
var http = require('http');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');
var writer = require('./htmlwriter');
var urlParse = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  writer.addUrl('example8.com');

  if (req.method === 'GET'){
    var parts = urlParse.parse(req.url);
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
      //Make sure to check that we aren't just waiting for archive.
      res.writeHead(404, exports.headers);
      res.end();
    }
  }

  if(req.method === 'POST'){
    var url;
    httpHelp.collectData(req, function(urlData){
      url = urlData.split('=')[1];
      //Is it in sites?
      if (fetcher.checkUrl(url)){
      //if so, check if archived.
        archive.isUrlArchived(url, function(archived){
          if (archived){
          //if it is, display it.
          //Still need helper function (downloadURLs)
          } else {
          //Otherwise, display loading.
            httpHelp.sendResponse(res, '/loading.html');
          }
        });
      } else {
        //If not in sites, put it in sites
        writer.addUrl(url);
        httpHelp.sendResponse(res, '/loading.html');
        archive.downloadUrls(url);
      }
    });
  }

};
