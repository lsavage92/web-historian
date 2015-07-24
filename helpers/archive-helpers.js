var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'index' : path.join(__dirname, '../web/public/index.html'),
  'css' : path.join(__dirname, '../web/public/styles.css'),
  'loading' : path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//Figure out how to rescope
//No no touchy ;)
var _list = {'/www.google.com': true};
exports.readListOfUrls = function(){
  fs.readFile(exports.paths['list'], 'utf8', function(err, data){
    if(err){
      console.log(err);
    }
    var tempArray = data.split("\n");
    _.each(tempArray, function(item){
      _list[item] = false;
    });
  });
};

exports.isUrlInList = function(url){
  var isTrue = false;
  for (var key in _list){
    if (key === url){
      isTrue = true;
    }
  }
  return isTrue;
};

exports.addUrlToList = function(url){

  if (!_list){
    exports.readListOfUrls();
  }
  if(!exports.isUrlInList(url)){
    url = "\n" + url;
    fs.appendFile(exports.paths['list'], url, 'utf8', function(err){
      if(err){
        console.log(err);
      }
      exports.readListOfUrls();
    });
  }

};

//Web app cares about this.
exports.isUrlArchived = function(url, callback){
  fs.exists(exports.paths['archivedSites'] + url, function(exists){
    console.log(exports.paths['archivedSites'] + url);
    callback(exists);
  });
};
//Worker app cares about this.
exports.downloadUrls = function(){
};
