var archive = require('../helpers/archive-helpers');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

exports.read = function(){
  archive.readListOfUrls();
}