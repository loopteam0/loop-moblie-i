var tor = require('torrent-search-api');
tor.enableProvider('1337x');
// tslint:disable-next-line:no-unused-expression
var torrents = tor.search('1080', 'Movies', 20).then(function (res) { return console.log(res); });
console.log(torrents);
