var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
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
var _list;
exports.readListOfUrls = function(){
  fs.readFile(exports.paths['list'], 'utf8', function(err, data){
    if(err){
      console.log(err);
    }
    _list = data.split("\n");
    console.log(_list);
  });
};

exports.isUrlInList = function(url){
  return _.contains(_list, url);
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

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
